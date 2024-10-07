'use client';

import TaskSubmitForMobile from './taskSubmitForMobile/TaskSubmitForMobile';
import TaskSubmitForDesctop from './taskSubmitForDesctop/TaskSubmitForDesctop';
import useConditions from './hooks/useConditions';

const ProjectSubmit = () => {
  const conditionsInf = useConditions();
  const { conditions, handleChangeCondition, isValidCond } = conditionsInf;
  return (
    <>
      <TaskSubmitForMobile
        conditions={conditions}
        handleChangeCondition={handleChangeCondition}
        isValidCond={isValidCond}
      />
      <TaskSubmitForDesctop
        conditions={conditions}
        handleChangeCondition={handleChangeCondition}
        isValidCond={isValidCond}
      />
    </>
  );
};

export default ProjectSubmit;
