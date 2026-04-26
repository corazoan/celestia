"use server";

import { prisma } from "@/app/libs/prisma";
import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { addUnitSchema, addUnitActionState, editUnitSchema } from "./type";
import { errorHandler, returnHandler } from "@/app/utils/utils";
import { getCurrentUser } from "@/app/libs/auth";

export async function addUnitAction(
  initialState: addUnitActionState,
  formData: FormData,
) {
  if (formData.has("id")) {
    const parse = editUnitSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );
    if (!parse.success) {
      return { success: false, error: "Name and Abbreviation are required" };
    }
    const { name, abbr, id } = parse.data;

    const owner = await getCurrentUser();
    if (!owner || owner.role !== "admin")
      return {
        success: false,
        error: "You don't have permission to perform this action.",
      };

    const [, resultError] = await prisma.unit
      .update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          abbr,
        },
      })
      .then(returnHandler)
      .catch(errorHandler);

    if (resultError instanceof Prisma.PrismaClientKnownRequestError) {
      const err = resultError as Prisma.PrismaClientKnownRequestError;
      if (err.code === "P2002") {
        return {
          success: false,
          error: "Unit with this name or abbreviation already exists",
        };
      }
      return {
        success: false,
        error: "An error occurred while updating the unit",
      };
    }
  } else {
    const parse = addUnitSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );
    if (!parse.success) {
      return { success: false, error: "Name and Abbreviation are required" };
    }
    const { name, abbr } = parse.data;

    const owner = await getCurrentUser();
    if (!owner || owner.role !== "admin")
      return {
        success: false,
        error: "You don't have permission to perform this action.",
      };

    const [, resultError] = await prisma.unit
      .create({
        data: {
          name,
          abbr,
        },
      })
      .then(returnHandler)
      .catch(errorHandler);

    if (resultError instanceof Prisma.PrismaClientKnownRequestError) {
      const err = resultError as Prisma.PrismaClientKnownRequestError;
      if (err.code === "P2002") {
        return {
          success: false,
          error: "Unit with this name or abbreviation already exists",
        };
      }
      return {
        success: false,
        error: "An error occurred while creating the unit",
      };
    }

    if (resultError)
      return {
        success: false,
        error: "Something went wrong. Please try again later.",
      };
  }

  revalidatePath("/admin/products/units");
  return { success: true, error: "" };
}

export async function getUnits() {
  try {
    const units = await prisma.unit.findMany({
      select: {
        _count: {
          select: {
            products: true,
          },
        },
        name: true,
        abbr: true,
        id: true,
      },
    });
    return units;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteUnit(id: number) {
  if (!id)
    return {
      success: false,
      error: "Unit ID is required.",
    };

  const owner = await getCurrentUser();
  if (!owner || owner.role !== "admin")
    return {
      success: false,
      error: "You don't have permission to perform this action.",
    };

  const [, resultError] = await prisma.unit
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
        error: "Unit not found",
      };
    }
    return {
      success: false,
      error: "An error occurred while deleting the unit",
    };
  }

  revalidatePath("/admin/products/units");
  return { success: true, error: "" };
}
