import { Dispatch, SetStateAction } from 'react';

type Options = {
  subscribers?: string;
  changeInfo?: string;
  bests?: string;
  training?: string;
  advanced?: string;
  complex?: string;
};

type FilterOption = {
  label: string;
  name: string;
  checked: boolean;
};

type Filter = {
  type: string;
  name: string;
  label: string;
  options: FilterOption[];
};

type Filters = Filter[];

type SelectedFilters = {
  label: string;
  name: string;
  checked: boolean;
  filter: string;
  type: string;
};

type ActualFilter = {
  filterName: string;
  filterType: string;
  actualRadioOptions: string;
  actualCheckboxOptions: string[];
};

type TProject = {
  rating: string;
  upvotes: number;
  downvotes: number;
  id: number;
  title: string;
  description: string;
};

type ProjectsListProps = {
  projectType: string | null;
  filters: ActualFilter[];
};

type GetAppsProps = {
  page: number;
  category: string | null;
  filters?: ActualFilter[];
};

type FilterChangeArgs = {
  name: string;
  value: string;
  type: string;
  checked: boolean;
};

type FilterChange = (args: FilterChangeArgs) => void;
type TSetCategoryCallback = (category: TCategory | null) => void;

type TCategory = {
  id: string;
  name: string;
  children: TCategory[];
};

type TCategoryProps = {
  categories: TCategory[];
  onCategorySelect?: (category: TCategory) => void;
  setCurrentCategory?: (category: TCategory | null) => void;
  SetCategoryCallback?: TSetCategoryCallback;
};
type TSubCategoryProps = {
  category: TCategory;
  onCategorySelect?: (category: TCategory) => void;
  setCurrentCategory?: (category: TCategory | null) => void;
  SetCategoryCallback?: TSetCategoryCallback;
};

type TCardProps = {
  category: TCategory;
  onCategorySelect?: (category: TCategory) => void;
  setCurrentCategory?: (category: TCategory | null) => void;
  SetCategoryCallback?: TSetCategoryCallback;
};

type RenderFiltersProps = {
  showFilters: boolean;
  allFilters: Filters;
  handleChange: FilterChange;
};

type FilterBlockProps = {
  setFormData: Dispatch<SetStateAction<ActualFilter[]>>;
  handleChange: FilterChange;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  resetFilters: () => void;
  showFilters: boolean;
  allFilters: Filters;
};

type SelectFiltersProps = {
  projectType: string | null;
  allFilters: Filters;
  showFilters: boolean;
  handleChange: FilterChange;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
};

type FilterProps = {
  filter: Filter;
  handleChange: FilterChange;
};

export type {
  RenderFiltersProps,
  SelectFiltersProps,
  FilterProps,
  FilterBlockProps,
  TSetCategoryCallback,
  TCategory,
  TCategoryProps,
  TSubCategoryProps,
  TCardProps,
  FilterChangeArgs,
  Options,
  Filter,
  Filters,
  FilterOption,
  SelectedFilters,
  FilterChange,
  ActualFilter,
  TProject,
  ProjectsListProps,
  GetAppsProps,
};
