export interface User {
  _id: string ;
  name: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string | null;
  referralEarnings: number;
  invitationCode: string;
  referUser?: string; // Depending on your requirements
  wallet: number;
  frozenWallet: number;
  deposits: { amount: number; date: Date }[];
  activeSubscription: string; // ID of UserSubscription
}
