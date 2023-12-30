type Options = {
  [subscribers: string]: string;
  changeInfo: string;
  bests: string;
  training: string;
  advanced: string;
  complex: string;
}

type AllFilters = {
  type: string;
  name: string;
  label: string;
  options: {
    label: string;
    name: string;
    checked: boolean
  }[]
}[];

type SelectedFilters = {
  label: string;
  name: string;
  checked: boolean;
  filter: string;
  type: string;
};

type FormDataValue = {
  name: string;
  value: string;
  type: string;
  checked: boolean;
};

type Project = {
  rating: string;
  number: number;
  name: string;
  description: string;
};

// eslint-disable-next-line no-unused-vars
type HandleValueType = (name: string, value: string, type: string, checked: boolean) => void;

export type {
  Options, AllFilters, SelectedFilters, HandleValueType, FormDataValue, Project,
};
