export interface UserSubscription {
  _id: string;
  user: string; // ID of User
  tier: string; // ID of SubscriptionPlan
  startDate: Date;
  endDate: Date;
  payments: { date: Date; amount: number }[];
}
