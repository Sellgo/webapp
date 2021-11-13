import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import UpgradeCTA from '../UpgradeCTA';

/* Types */
import { SellerSubscription } from '../../interfaces/Seller';
import { SubscriptionDetailsWithQuota } from '../../interfaces/Subscription';

/* Utils */
import { getSubscriptionDetailsWithQuota } from '../../utils/subscriptions';
import { formatNumber } from '../../utils/format';

interface Props {
  prependMessage: string;
  appendMessage: string;
  quotaType?:
    | 'seller_database_limit'
    | 'seller_finder_seller_limit'
    | 'seller_finder_inventory_limit';
  hideCTA?: boolean;

  /* From Redux State */
  subscriptions: SubscriptionDetailsWithQuota[];
  sellerSubscription: SellerSubscription;
}

const TableErrorMessage = (props: Props) => {
  const {
    prependMessage,
    appendMessage,
    quotaType,
    hideCTA,
    subscriptions,
    sellerSubscription,
  } = props;

  /* Display quota exceeded with quota count */
  if (quotaType) {
    const subscriptionLimitDetails = getSubscriptionDetailsWithQuota(
      subscriptions,
      sellerSubscription.subscription_id
    );
    const quotaCount = subscriptionLimitDetails ? subscriptionLimitDetails[quotaType] : 0;

    return (
      <p className={styles.messageText}>
        {prependMessage}
        {formatNumber(quotaCount)}
        {appendMessage}
        {!hideCTA && <UpgradeCTA type="Upgrade" />}
      </p>
    );
  } else {
    return (
      <p className={styles.messageText}>
        {prependMessage}
        {appendMessage}
        <UpgradeCTA type="Upgrade" />
      </p>
    );
  }
};

const mapStateToProps = (state: any) => ({
  sellerSubscription: state.subscription.sellerSubscription,
  subscriptions: state.subscription.subscriptions,
});

export default connect(mapStateToProps)(TableErrorMessage);
