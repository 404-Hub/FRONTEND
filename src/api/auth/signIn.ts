import { InferType, object, string } from 'yup';

export const signInDtoSchema = object().shape({
  email: string().email().required(),
  password: string().min(8).required(),
});

export type SignInDto = InferType<typeof signInDtoSchema>;

export type SignInResponse = {
  // todo
};
