import get from 'lodash/get';

/* Interfaces */
import { SellerSubscriptionLimits } from '../../interfaces/Subscription';

/* Get the seller subscription */
export const getSellerSubscription = (state: any) => {
  return get(state, 'subscription.sellerSubscription');
};

/* Get all seller limits */
export const getSellerSubscriptionLimits = (state: any): SellerSubscriptionLimits => {
  const sellerSubscription = getSellerSubscription(state);

  if (sellerSubscription) {
    return {
      sellerMapDropdownLimit: sellerSubscription.seller_map_overview_display_limit || 1000,
    };
  }

  return {
    sellerMapDropdownLimit: 1000,
  };
};
