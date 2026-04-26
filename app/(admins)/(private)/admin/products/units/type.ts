import { z } from "zod";

export const addUnitSchema = z.object({
  name: z.string().min(1, "Name is required"),
  abbr: z.string().min(1, "Abbreviation is required"),
});

export const editUnitSchema = z.object({
  name: z.string().min(1, "Name is required"),
  abbr: z.string().min(1, "Abbreviation is required"),
  id: z.string().min(1, "ID is required"),
});

export type addUnitActionState = {
  error: string;
  success: boolean;
};
