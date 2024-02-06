import { EnumLike, ZodObject, z } from "zod";

export const UUIDValidation = z.string().uuid({ message: "Must be uuid!" });

type FilterParams = {
  q?: { max: number };
  page?: { min: number; default: number };
  perPage?: { min: number; max: number; default: number };
  sortOrder?: { default: "ASC" | "DESC" };
  sortBy?: { options: EnumLike; default: string };
};

export const buildGetValidation = (
  {
    q,
    page = { min: 1, default: 1 },
    perPage = { min: 20, max: 40, default: 20 },
    sortOrder,
    sortBy,
  }: FilterParams,
  other?: Record<string, unknown>
) => {
  let validation = {};

  if (other) {
    validation = {
      ...validation,
      ...other,
    };
  }

  if (q) {
    validation = {
      ...validation,
      q: z.string().max(q.max),
    };
  }

  if (page) {
    validation = {
      ...validation,
      page: z.number().int().min(page.min).default(page.default),
    };
  }

  if (perPage) {
    validation = {
      ...validation,
      perPage: z
        .number()
        .int()
        .min(perPage.min)
        .max(perPage.max)
        .default(perPage.default),
    };
  }

  if (sortOrder) {
    validation = {
      ...validation,
      sortOrder: z.enum(["ASC", "DESC"] as const).default(sortOrder.default),
    };
  }

  if (sortBy) {
    validation = {
      ...validation,
      sortBy: z.nativeEnum(sortBy.options).default(sortBy.default),
    };
  }

  return z.object(validation);
};
