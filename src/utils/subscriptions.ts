export const isSubscriptionFree = (type: string) => {
  return type === 'free';
};

export const isSubscriptionTrial = (type: string) => {
  return type === 'trial';
};

export const isSubscriptionPaid = (type: string) => {
  return type === 'paid';
};

export const isSubscriptionNotPaid = (type: string) => {
  return !isSubscriptionPaid(type);
};

export const isPlanBasic = (plan: string) => {
  return plan === 'Basic Plan';
};

export const isPlanPro = (plan: string) => {
  return plan === 'Pro Plan';
};

export const isPlanEnterprise = (plan: string) => {
  return plan === 'Enterprise';
};

export const isPlanFreeTrial = (plan: string) => {
  return plan === 'Free Trial';
};

export const isPlanFreeAccount = (plan: string) => {
  return plan === 'Free Account';
};
