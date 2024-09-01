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
  location: string;
  telegram: string;
  github: string;
  website: string;
  link: string;
  is_email_public: boolean;
  is_location_public: boolean;
  is_github_public: boolean;
  is_website_public: boolean;
  is_telegram_public: boolean;
  is_public: boolean;
}
