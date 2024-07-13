export interface SubscriptionPlan {
  _id: string;
  planName: 'free' | 'VIP 1' | 'VIP 2' | 'VIP 3';
  duration: '7' | '14' | '0';
  dailyEarnings: number;
  cost: number;
}
