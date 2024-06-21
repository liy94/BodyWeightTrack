export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Weight = {
  id: string;
  userID: string;
  weight: number;
  date: Date;
};
