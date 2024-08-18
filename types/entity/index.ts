export interface TRole {
  id: number;
  title: string;
  description: string;
}

export interface TProfile {
  id: number;
  avatar: string | File;
  about: string;
  availability: string;
  team_role_id: number;
}
