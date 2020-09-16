import { Subscription, SellerSubscription } from '../interfaces/Seller';
import moment from 'moment';

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

export const isTrialExpired = (sellerSubscription: SellerSubscription) => {
  if (!sellerSubscription || !sellerSubscription.expiry_date) {
    return false;
  }

  const today = new Date();
  const exp = new Date(sellerSubscription.expiry_date);
  const expireDateMinutes = moment(exp).diff(today, 'minutes');

  return expireDateMinutes <= 0;
};
