"use server";

import { prisma } from "@/app/libs/prisma";
import { Prisma } from "@/prisma/generated/prisma/client";
import { revalidatePath } from "next/cache";
import {
  addCategorySchema,
  addCategoryActionState,
  editCategorySchema,
} from "./type";
import { errorHandler, returnHandler } from "@/app/utils/utils";
import { getCurrentUser } from "@/app/libs/auth";
import { prettifyError } from "zod";

export async function addCategoryAction(
  initialState: addCategoryActionState,
  formData: FormData,
) {
  if (formData.has("id")) {
    const parse = editCategorySchema.safeParse(
      Object.fromEntries(formData.entries()),
    );
    if (!parse.success) {
      return { success: false, error: "Name and Slug are required" };
    }
    const { name, slug, id, parentId } = parse.data;

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

    if (parentId) {
      const [parent, verifyParentId] = await prisma.category
        .findFirst({
          where: {
            id: parentId,
          },
          select: {
            id: true,
          },
        })
        .then(returnHandler)
        .catch(errorHandler);

      if (verifyParentId) {
        return {
          success: false,
          error: "An error occurred while verifying the parent category.",
        };
      }

      if (!parent) {
        return {
          success: false,
          error: "There is no category with the given ID.",
        };
      }
    }

    const [, resultError] = await prisma.category
      .update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
          parentId: parentId ? parentId : null,
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
  } else {
    console.dir(formData, { depth: null, color: true });
    const parse = addCategorySchema.safeParse(
      Object.fromEntries(formData.entries()),
    );
    if (!parse.success) {
      return { success: false, error: prettifyError(parse.error) };
    }
    const { name, slug, parentId } = parse.data;

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

    // check only if parentId is greater than 0 and don't have value like null
    if (parentId) {
      const [parent, verifyParentId] = await prisma.category
        .findFirst({
          where: {
            id: parentId,
          },
          select: {
            id: true,
          },
        })
        .then(returnHandler)
        .catch(errorHandler);

      if (verifyParentId) {
        return {
          success: false,
          error: "An error occurred while verifying the parent category.",
        };
      }

      if (!parent) {
        return {
          success: false,
          error: "There is no category with the given ID.",
        };
      }
    }

    const [, resultError] = await prisma.category
      .create({
        data: {
          name,
          slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
          //if parent id is "" then set it to null
          // parent Id is already verified there are only two possiblity either parentId is verfied or parentId have value NaN, undefine, null, 0
          parentId: parentId ? parentId : null,
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
  }

  revalidatePath("/admin/products/add-category");

  return { success: true, error: "" };
}

export async function getCategories() {
  const [categories, categoriesErr] = await prisma.category
    .findMany({
      where: {
        parentId: null,
      },
      select: {
        name: true,
        id: true,
        slug: true,
        children: {
          include: {
            _count: {
              select: {
                products: true,
              },
            },
          },
        },
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (categoriesErr) {
    console.error(categoriesErr);
    return [];
  }

  const formatted = categories.map((category) => ({
    ...category,
    totalProducts: category.children.reduce(
      (acc, child) => acc + child._count.products,
      0,
    ),
  }));

  return formatted;
}
export async function getSubCategories() {
  const [subCategories, subCategoriesErr] = await prisma.category
    .findMany({
      where: {
        children: {
          none: {},
        },
      },
      select: {
        id: true,
        parent: {
          select: {
            name: true,
          },
        },
        name: true,
        slug: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (subCategoriesErr) {
    console.error("Get error during fetching subcategories", subCategoriesErr);
    return [];
  }

  return subCategories;
}

export async function deleteCategory(id: number) {
  if (!id)
    return {
      success: false,
      error: "Category ID is required.",
    };

  const owner = await getCurrentUser();
  if (!owner)
    return {
      success: false,
      error: "You don't have permission to perform this action.",
    };

  if (owner.role !== "admin")
    return {
      success: false,
      error: "You don't have permission to perform this action.",
    };

  const [, resultError] = await prisma.category
    .delete({
      where: {
        id: Number(id),
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (resultError instanceof Prisma.PrismaClientKnownRequestError) {
    const err = resultError as Prisma.PrismaClientKnownRequestError;

    if (err.code === "P2025") {
      return {
        success: false,
        error: "Category not found",
      };
    }

    return {
      success: false,
      error: "An error occurred while deleting the category",
    };
  }

  revalidatePath("/admin/products/categories");

  return { success: true, error: "" };
}
