"use server";

import { prisma } from "@/app/libs/prisma";
import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { addCategorySchema, addCategoryActionState } from "./type";
import { errorHandler, returnHandler } from "@/app/utils/utils";
import { getCurrentUser } from "@/app/libs/auth";

export async function addCategoryAction(
  initialState: addCategoryActionState,
  formData: FormData,
) {
  const parse = addCategorySchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parse.success) {
    return { success: false, error: "Name and Slug are required" };
  }

  const { name, slug } = parse.data;

  const owner = await getCurrentUser();
  if (!owner)
    return {
      success: false,
      error: "You don’t have permission to perform this action.",
    };

  if (owner.role !== "admin")
    return {
      success: false,
      error: "You don't have permission to perform this action.",
    };

  const [, resultError] = await prisma.category
    .create({
      data: {
        name,
        slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (resultError instanceof Prisma.PrismaClientKnownRequestError) {
    const err = resultError as Prisma.PrismaClientKnownRequestError;

    if (err.code === "P2002") {
      return {
        success: false,
        error: "Category with this slug already exists",
      };
    }

    return {
      success: false,
      error: "An error occurred while creating the category",
    };
  }
  revalidatePath("/admin/products/add-category");

  return { success: true, error: "" };
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        _count: {
          select: {
            products: true,
          },
        },
        name: true,
        slug: true,
      },
    });
    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
}
