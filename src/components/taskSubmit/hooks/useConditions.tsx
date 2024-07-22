import { useState, useCallback, useEffect } from 'react';
import { conditionsList } from '../textForTaskSubmit';

const useConditions = () => {
  const [conditions, setConditions] = useState<Record<string, boolean>>(conditionsList);
  const [isValidCond, setIsValidCond] = useState<boolean>(false);

  const handleChangeCondition = useCallback(
    (condition: string, conditionValue?: boolean) => {
      if (conditionValue === undefined) {
        setConditions((prev) => {
          prev[condition] = !prev[condition];
          return { ...prev };
        });
      } else {
        setConditions((prev) => {
          prev[condition] = conditionValue;
          return { ...prev };
        });
      }
    },
    [conditions]
  );

  useEffect(() => {
    setIsValidCond(Object.values(conditions).indexOf(false) === -1);
  }, [conditions]);

  return {
    conditions,
    handleChangeCondition,
    isValidCond,
  };
};

export default useConditions;
