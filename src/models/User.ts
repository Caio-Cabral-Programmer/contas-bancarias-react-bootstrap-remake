export type Account = {
  number: string;
  agency: string;
  balance: string;
  limit: string;
};

export type Card = {
  number: string;
  limit: string;
};

export type User = {
  id?: string | number;
  name: string;
  account: Account;
  card: Card;
};
