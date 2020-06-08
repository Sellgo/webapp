export const isSubscriptionFree = (type: string) => {
  console.log('typess: ', type, type === 'free');
  return type === 'free';
};

export const isSubscriptionTrial = (type: string) => {
  return type === 'trial';
};

export const isSubscriptionNotPaid = (type: string) => {
  return type !== 'paid';
};

export const isSubscriptionPaid = (type: string) => {
  return type === 'paid';
};
