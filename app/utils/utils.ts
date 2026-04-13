import { headers } from "next/headers";
import { env } from "../libs/env";

type Handler<T> = [T, null] | [null, Error];

export const returnHandler = <T>(result: T): Handler<T> => {
  return [result, null] as const;
};

export const errorHandler = (error: unknown): [null, Error] => {
  if (error instanceof Error) {
    console.error(error);
    return [null, error] as const;
  }

  // TODO: Get stack trace
  const e = new Error("Unknown error " + JSON.stringify(error) + " " + error);
  console.error(e);
  return [null, e] as const;
};
