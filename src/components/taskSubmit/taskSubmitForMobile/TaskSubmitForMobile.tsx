'use client';

import { useCallback, useState } from 'react';
import { TTaskSubmitProps } from '@/types/taskSubmit';
import { Paper } from '@mui/material';
import TaskSubmiting from './TaskSubmitingForMobile';
import TaskSubmitingAfterClick from '../AfterSubmit';
import GithubAdd from './GitHubAdd';

const TaskSubmitForMobile = (props: TTaskSubmitProps) => {
  const { conditions, handleChangeCondition, isValidCond } = props;
  const [isValid, setIsvalid] = useState<boolean>(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);
  const [hasGithub, setHasGithub] = useState<boolean>(false);

  const handleSubmitClick = useCallback(() => {
    setIsSubmitClicked((prev) => !prev);
  }, [isSubmitClicked]);

  const handleValidationCheck = useCallback(
    (isRight: boolean) => {
      setIsvalid(isRight);
    },
    [isValid],
  );

  const handleGithubCheck = useCallback(
    (hasGithubRef: boolean) => {
      setHasGithub(hasGithubRef);
    },
    [hasGithub],
  );

  return (
        <Paper
            sx={{
              display: {
                xs: 'block',
                md: 'none',
              },
            }}
        >
            {!isSubmitClicked && (
                <TaskSubmiting
                    validation={handleValidationCheck}
                    submiting={handleSubmitClick}
                    conditions={conditions}
                    handleChangeCondition={handleChangeCondition}
                    isValidCond={isValidCond}
                />
            )}
            {isSubmitClicked && !isValid && (
                <TaskSubmitingAfterClick
                    isValid={isValid}
                    submiting={handleSubmitClick}
                />
            )}
            {isSubmitClicked && isValid && !hasGithub && (
                <GithubAdd
                    githubCheck={handleGithubCheck}
                    validation={handleValidationCheck}
                    submiting={handleSubmitClick}
                />
            )}
            {isSubmitClicked && hasGithub && isValid && (
                <TaskSubmitingAfterClick
                    isValid
                    submiting={handleSubmitClick}
                />
            )}
        </Paper>
  );
};

export default TaskSubmitForMobile;
