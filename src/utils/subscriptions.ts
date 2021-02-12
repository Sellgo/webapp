import { SellerSubscription } from '../interfaces/Seller';
import moment from 'moment';

export const isSubscriptionFree = (type: string) => type === 'free';

export const isSubscriptionTrial = (type: string) => type === 'trial';

export const isSubscriptionPaid = (type: string) => type === 'paid';

export const isSubscriptionNotPaid = (type: string) => !isSubscriptionPaid(type);

export const isPlanBasic = (plan: string) => plan === 'Basic Plan';

export const isPlanPro = (plan: string) => plan === 'Pro Plan';

export const isPlanEnterprise = (plan: string) => plan === 'Enterprise';

export const isPlanFreeTrial = (plan: string) => plan === 'Free Trial';

export const isPlanFreeAccount = (plan: string) => plan === 'Free Account';

export const isSubscriptionIdBasic = (id: number) => id === 1;

export const isSubscriptionIdPro = (id: number) => id === 2;

export const isSubscriptionIdEnterprise = (id: number) => id === 3;

export const isSubscriptionIdFreeTrial = (id: number) => id === 4;

export const isSubscriptionIdFreeAccount = (id: number) => id === 5;

export const isPlanPaid = (id: number) => [1, 2, 6].includes(id);

export const isFreeAccountWithoutHistory = (
  sellerSubscription: SellerSubscription,
  subscriptionType: string
) => {
  return isSubscriptionFree(subscriptionType) && sellerSubscription.expiry_date === null;
};

export const isTrialExpired = (sellerSubscription: SellerSubscription) => {
  if (!sellerSubscription || !sellerSubscription.expiry_date) {
    return false;
  }

  const today = new Date();
  const exp = new Date(sellerSubscription.expiry_date);
  const expireDateMinutes = moment(exp).diff(today, 'minutes');

  return expireDateMinutes <= 0;
};
