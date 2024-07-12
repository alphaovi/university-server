import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string({ invalid_type_error: 'Password must be string' })
    .min(7)
    .max(15, { message: 'Password cannot be more than 20 characters' })
    .optional(),
});

export const userValidation = {
  userValidationSchema,
};
