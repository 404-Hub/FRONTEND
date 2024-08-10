import { Dispatch, SetStateAction } from 'react';

type TTaskSubmitingProps = {
  validation: (isRight: boolean) => void;
  submiting: () => void;
  conditions: Record<string, boolean>;
  handleChangeCondition: (condition: string, conditionValue?: boolean) => void;
  isValidCond: boolean;
};

type TTaskSubmitingAfterClickProps = {
  isValid: boolean;
  submiting: () => void;
};

type TGithubAdd = {
  validation: (isRight: boolean) => void;
  githubCheck: (hasGit: boolean) => void;
  submiting: () => void;
};

type TGithubInputProps = {
  isInputValid: boolean;
  setIsInputValid: Dispatch<SetStateAction<boolean>>;
  isVisible?: boolean;
};

type TTaskSubmitProps = {
  conditions: Record<string, boolean>;
  handleChangeCondition: (condition: string, conditionValue?: boolean) => void;
  isValidCond: boolean;
};

export type { TTaskSubmitingProps, TTaskSubmitingAfterClickProps, TGithubAdd, TGithubInputProps, TTaskSubmitProps };
