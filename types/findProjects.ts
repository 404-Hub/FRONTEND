import { Dispatch, SetStateAction } from 'react';
import { TFilter } from '@/types/filter';

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
  filtersState: Record<string, string[]>;
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

type TCategory = {
  id: string;
  name: string;
  title: string;
  children: TCategory[];
};

type TFilterChangeFunction = (filterName: string, optionValue: string) => void;
type TSetCategoryCallback = (category: TCategory | null) => void;

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
  allFilters: TFilter[];
  handleChange: TFilterChangeFunction;
  filtersState: Record<string, string[]>;
};

type FilterBlockProps = {
  handleChange: TFilterChangeFunction;
  resetFilters: () => void;
  filtersState: Record<string, string[]>;
  allFilters: TFilter[];
};

type SelectFiltersProps = {
  projectType: string | null;
  actualFilters: ActualFilter[];
  showFilters: boolean;
  handleChange: TFilterChangeFunction;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
};

type FilterProps = {
  filter: TFilter;
  handleChange: TFilterChangeFunction;
  filtersState: Record<string, string[]>;
};

export type TVote = {
  type: 'up' | 'down' | 'none';
};

export type TIdea = {
  id: number;
  title: string;
  category: string;
  description: string;
  additional_info: string;
  rate: string;
  estimation: number;
  is_assigned: boolean;
  upvotes: number;
  downvotes: number;
  vote: TVote | null;
  project?: {
    id: number;
    idea_id: number;
    user_id: number;
    party_id: number;
    git_link: string | null;
    web_link: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    party: {
      id: number;
      created_by: number;
      idea_id: number;
      requirements: string;
      duration: string;
      is_active: number;
      created_at: string;
      updated_at: string;
    };
  };
  party?: {
    id: number;
    created_by: number;
    idea_id: number;
    requirements: string;
    duration: string;
    is_active: number;
    created_at: string;
    updated_at: string;
  };
  inprogress: number;
  done: number;
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
  FilterOption,
  SelectedFilters,
  TFilterChangeFunction,
  ActualFilter,
  TProject,
  ProjectsListProps,
  ProjectCardProps,
};
