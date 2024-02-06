import { z } from "zod";

export const UUIDValidation = z.string().uuid({ message: "Must be uuid!" });

export const BooleanQueryValidationEnum = ["true", "false"] as const;

export const PerPageQueryValidationEnum = [
  "20",
  "40",
  "60",
  "80",
  "100",
] as const;

export const SortOrderQueryValidationEnum = ["ASC", "DESC"] as const;
