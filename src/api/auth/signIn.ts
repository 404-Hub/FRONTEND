import { z } from 'zod';

export const signInDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInDto = z.infer<typeof signInDtoSchema>;

export type SignInResponse = {
  // todo
};
