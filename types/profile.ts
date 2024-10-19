type TProfileInfo = {
  user_id: number;
  name: string;
  avatar: string;
  role: string;
  about: string;
  availability: string;
};

type TContacts = {
  icon: string;
  text: string;
};

type TProfileProject = {
  id: number;
  title: string;
  idea_id: number;
};

export type { TProfileInfo, TContacts, TProfileProject };
