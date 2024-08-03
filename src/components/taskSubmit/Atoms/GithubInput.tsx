'use client';

import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { TGithubInputProps } from '@/types/taskSubmit';
import { REF, VALID_REF, INVALID_REF } from '../textForTaskSubmit';

const GithubInput = (props: TGithubInputProps) => {
  const { isInputValid = true, setIsInputValid, isVisible = true } = props;

  const [inputValue, setInputValue] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(inputValue !== '');
    const rgx = /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi;
    setIsInputValid(rgx.test(inputValue) && inputValue.includes('github'));
  }, [inputValue]);

  return (
        <TextField
            sx={{ display: isVisible ? 'block' : 'none', marginY: 2 }}
            label={REF}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            error={!isInputValid && isEmpty}
            helperText={!isInputValid && isEmpty ? INVALID_REF : VALID_REF}
            fullWidth
        />
  );
};

export default GithubInput;
