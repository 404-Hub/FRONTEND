export type TButtonType = {
    [key: string]: string | undefined;
}

export type TOneStepData = {
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
    buttons: TButtonType[];
};
