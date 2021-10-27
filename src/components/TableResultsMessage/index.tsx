import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import UpgradeCTA from '../UpgradeCTA';

/* Utils */
import { getSubscriptionDetailsWithQuota } from '../../utils/subscriptions';
import { formatNumber } from '../../utils/format';

/* Types */
import { SellerSubscription } from '../../interfaces/Seller';
import { SubscriptionDetailsWithQuota } from '../../interfaces/Subscription';

interface Props {
  prependMessage: string;
  appendMessage: string;
  count: number;
  actualCount?: number;
  hideCTA?: boolean;
  hidePlanDetailsText?: boolean;
  limitType?:
    | 'seller_database_display_limit'
    | 'seller_map_overview_display_limit'
    | 'seller_finder_inventory_display_limit'
    | 'seller_finder_seller_display_limit';

  /* From Redux State */
  subscriptions: SubscriptionDetailsWithQuota[];
  sellerSubscription: SellerSubscription;
}

const TableResultsMessage = (props: Props) => {
  const {
    actualCount,
    limitType,
    count,
    hidePlanDetailsText,
    prependMessage,
    appendMessage,
    hideCTA,
    subscriptions,
    sellerSubscription,
  } = props;
  const subscriptionLimitDetails = getSubscriptionDetailsWithQuota(
    subscriptions,
    sellerSubscription.subscription_id
  );

  /* Display upgrade CTA if product display is limited */
  if (actualCount && limitType) {
    const limitCount = subscriptionLimitDetails ? subscriptionLimitDetails[limitType] : 0;
    if (actualCount <= limitCount) {
      return (
        <p className={styles.messageText}>
          {prependMessage} <span className={styles.count}>{formatNumber(actualCount)}</span> out of{' '}
          <span className={styles.count}>{formatNumber(count)}</span> {appendMessage}
          {!hideCTA && <UpgradeCTA type="Upgrade" showText={!hidePlanDetailsText} />}
        </p>
      );
    }
  }

  return (
    <p className={styles.messageText}>
      {prependMessage} <span className={styles.count}>{formatNumber(count)}</span> {appendMessage}
    </p>
  );
};

const mapStateToProps = (state: any) => ({
  sellerSubscription: state.subscription.sellerSubscription,
  subscriptions: state.subscription.subscriptions,
});

export default connect(mapStateToProps)(TableResultsMessage);
