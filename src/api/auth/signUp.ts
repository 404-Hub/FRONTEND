import { InferType, object, ref, string } from 'yup';

export const signUpDtoSchema = object().shape({
  email: string().email().required(),
  name: string().min(2).required(),
  password: string().min(8).required(),
  passwordConfirm: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required(),
});

export type SignUpDto = InferType<typeof signUpDtoSchema>;

export type SignUpResponse = {
  // todo
};
