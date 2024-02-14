type Options = {
  [subscribers: string]: string;
  changeInfo: string;
  bests: string;
  training: string;
  advanced: string;
  complex: string;
};

type AllFiltersOptions = {
  label: string;
  name: string;
  checked: boolean
}[];

type AllFilters = {
  type: string;
  name: string;
  label: string;
  options: AllFiltersOptions;
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

type HandleValueType = (name: string, value: string, type: string, checked: boolean) => void;

export type {
  Options, AllFilters, AllFiltersOptions, SelectedFilters, HandleValueType, FormDataValue, Project,
};
