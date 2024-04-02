type Options = {
  subscribers?: string;
  changeInfo?: string;
  bests?: string;
  training?: string;
  advanced?: string;
  complex?: string;
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

type TProject = {
  rating: string;
  upvotes: number;
  downvotes: number;
  id: number;
  title: string;
  description: string;
};

type HandleValueType = (name: string, value: string, type: string, checked: boolean) => void;

export type {
  Options, AllFilters, AllFiltersOptions, SelectedFilters, HandleValueType, FormDataValue, TProject,
};

export type TCategory = {
    id: string;
    name: string;
    children: TCategory[];
};

export type TCategoryProps = {
  categories: TCategory[],
  onCategorySelect?: (category: TCategory) => void;
  setCurrentCategory?: (category: TCategory | null) => void;
};
export type TSubCategoryProps = {
  category: TCategory,
  onCategorySelect?: (category: TCategory) => void;
  setCurrentCategory?: (category: TCategory | null) => void;
};

export type TCardProps = {
  category: TCategory;
  onCategorySelect?: (category: TCategory) => void;
  setCurrentCategory?: (category: TCategory | null) => void;
}
