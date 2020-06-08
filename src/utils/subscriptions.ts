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
