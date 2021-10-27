import { SellerSubscription } from '../interfaces/Seller';
import { SubscriptionDetailsWithQuota } from '../interfaces/Subscription';
import moment from 'moment';

export const isSubscriptionFree = (type: string) => type === 'free';

export const isSubscriptionTrial = (type: string) => type === 'trial';

export const isSubscriptionPaid = (type: string) => type === 'paid';

export const isSubscriptionNotPaid = (type: string) => !isSubscriptionPaid(type);

export const isPlanStarter = (plan: string) => plan === 'Starter Plan';

export const isPlanTeam = (plan: string) => plan === 'Team Plan';

export const isPlanSellerScoutPro = (plan: string) => plan === 'Seller Scout Pro Plan';

export const isPlanWholesaleArbitrage = (plan: string) => plan === 'Wholesale Arbitrage $1 Plan';

export const isPlanPrivateLabel = (plan: string) => plan === 'Private Label $1 Plan';

export const isPlanProfessional = (plan: string) => plan === 'Professional Plan';

export const isPlanEnterprise = (plan: string) => plan === 'Enterprise';

export const isPlanFreeTrial = (plan: string) => plan === 'Free Trial';

export const isPlanFreeAccount = (plan: string) => plan === 'Free Account';

export const isSubscriptionIdSuite = (id: number) => id === 1;

export const isSubscriptionIdProfessional = (id: number) => id === 2;

export const isSubscriptionIdEnterprise = (id: number) => id === 3;

export const isSubscriptionIdFreeTrial = (id: number) => id === 4;

export const isSubscriptionIdFreeAccount = (id: number) => id === 5;

export const isSubscriptionIdStarter = (id: number) => id === 6;

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

/* Util to cheeck if it is beta account */
export const isBetaAccount = (sellerSubscription: SellerSubscription) => {
  // if id==5 and is_beta=true
  return (
    isSubscriptionIdFreeAccount(sellerSubscription.subscription_id) && sellerSubscription.is_beta
  );
};

/* Convert from text readable plan name to key format plan name */
export const convertPlanNameToKey = (planType: string) => {
  const planTypeWithoutSpaces = planType.split(' ').join('');
  return planTypeWithoutSpaces.toLowerCase();
};

export const isFirstTimeLoggedIn = () => {
  return (
    localStorage.getItem('isFirstTimeLoggedIn') &&
    localStorage.getItem('isFirstTimeLoggedIn') === 'true'
  );
};

export const getSubscriptionDetailsWithQuota = (
  subscriptions: SubscriptionDetailsWithQuota[],
  subscriptionId: number
) => {
  return subscriptions.find((subscription: SubscriptionDetailsWithQuota) => {
    return subscription.id === subscriptionId;
  });
};
