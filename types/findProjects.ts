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
  checked?: boolean;
  filter: string;
  type: string;
};

type ActualFilter = {
  filterName: string;
  filterType: string;
  actualRadioOption: string;
  actualCheckboxOption: string;
  actualLabel: string;
};

type TProject = {
  rating: string;
  upvotes: number;
  downvotes: number;
  id: number;
  title: string;
  description: string;
  additional?: string;
};

type ProjectsListProps = {
  categoryId: string;
  filters: ActualFilter[];
};

type ProjectCardProps = {
  project: TProject;
};

type FilterChangeArgs = {
  name: string;
  label: string;
  value: string;
  type: string;
  checked: boolean;
};

type FilterChange = (args: FilterChangeArgs) => void;
type TSetCategoryCallback = (category: TCategory | null) => void;

type TCategory = {
  id: string;
  name: string;
  title: string;
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
  handleChange: FilterChange;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  resetFilters: () => void;
  showFilters: boolean;
  actualFilters: ActualFilter[];
  allFilters: Filters;
};

type SelectFiltersProps = {
  projectType: string | null;
  actualFilters: ActualFilter[];
  showFilters: boolean;
  handleChange: FilterChange;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
};

type FilterProps = {
  filter: Filter;
  handleChange: FilterChange;
};

type TFoundAppProps = {
  id?: string;
  isAppTaken?: boolean;
  voteByThisUser?: -1 | 0 | 1;
};

type TFoundProject = {
  id: number;
  created_by: number | string;
  category_id: number;
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
  inprogress: number;
  done: number;
  created_at: string;
  updated_at: string;
  additional: string;
  is_assigned: boolean;
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
  ProjectCardProps,
  TFoundAppProps,
  TFoundProject,
};
