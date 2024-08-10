export type TButtonVariant = 'contained' | 'outlined' | 'text';

export type TExtendButtonProps = {
  label: string;
  variant: TButtonVariant;
  action?: () => void;
};

export type TButtonType = {
  back?: TExtendButtonProps | string;
  next?: TExtendButtonProps | string;
  customButtons?: TExtendButtonProps[];
};

export type TStep = {
  label: string;
  header?: string;
  title: string;
  fieldName?: string;
  labelTitle?: string;
  isMultiline?: boolean;
  showExample?: string;
  exampleText?: string;
  descriptionTitle?: string;
  additionalTitle?: string;
  projectTitle?: string;
  isCorrectTitle?: string;
  buttons: TButtonType;
};
