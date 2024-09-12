import type { FilterOption } from '@/types/findProjects';

export type TFilter = {
  type: string;
  name: string;
  label: string;
  options: FilterOption[];
};
