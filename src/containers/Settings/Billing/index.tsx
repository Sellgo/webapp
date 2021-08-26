import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* Actions */
import { fetchSellerSubscription } from '../../../actions/Settings/Subscription';
import { getSellerInfo } from '../../../actions/Settings';

/* Styling */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../../components/PageHeader';
import PastTransactionsSection from './PastTransactionsSection';

/* Types */
import { Subscription } from '../../../interfaces/Seller';
import { AppConfig } from '../../../config';
import QuotaAndPaymentsSection from './QuotaAndPaymentsSection';

/* Interfaces */
import {
  QuotaCollection,
  StripeSubscriptionInfo,
  Transaction,
  CreditCard,
} from '../../../interfaces/Settings/billing';

import {
  DEFAULT_CREDIT_CARD,
  DEFAULT_QUOTA_COLLECTION,
  DEFAULT_STRIPE_SUBSCRIPTION_INFO,
} from '../../../constants/Settings/billing';

interface Props {
  getSeller: () => void;
  fetchSellerSubscription: () => void;
  sellerSubscription: any;
  location: any;

  subscriptions: Subscription[];
  profile: any;
  subscriptionPlan: string;
  match: any;
}

const Billing = (props: Props) => {
  const { match, fetchSellerSubscription, subscriptionPlan, profile } = props;
  const [isTransactionHistoryLoading, setTransactionHistoryLoading] = React.useState<boolean>(true);
  const [transactionHistory, setTransactionHistory] = React.useState<Transaction[]>([]);

  const [isQuotaLoading, setQuotaLoading] = React.useState<boolean>(true);
  const [quotas, setQuotas] = React.useState<QuotaCollection>(DEFAULT_QUOTA_COLLECTION);

  const [isSubscriptionStripeLoading, setSubscriptionStripeLoading] = React.useState<boolean>(true);
  const [subscriptionStripeInfo, setSubscriptionStripeInfo] = React.useState<
    StripeSubscriptionInfo
  >(DEFAULT_STRIPE_SUBSCRIPTION_INFO);

  const [isCreditCardLoading, setCreditCardLoading] = React.useState<boolean>(true);
  const [creditCardInfo, setCreditCardInfo] = React.useState<CreditCard>(DEFAULT_CREDIT_CARD);

  const sellerID = localStorage.getItem('userId');

  const fetchSubscriptionStripeInfo = async () => {
    const res = await axios.get(`
      ${AppConfig.BASE_URL_API}sellers/${sellerID}/billing/current-subscription`);
    if (res.status === 200) {
      setSubscriptionStripeInfo(res.data);
    }
    setSubscriptionStripeLoading(false);
  };

  const fetchCreditCardInfo = async () => {
    const res = await axios.get(`
    ${AppConfig.BASE_URL_API}sellers/${sellerID}/billing/credit-card`);
    if (res.status === 200) {
      setCreditCardInfo(res.data);
    }
    setCreditCardLoading(false);
  };

  const fetchQuotas = async () => {
    const res = await axios.get(`
    ${AppConfig.BASE_URL_API}sellers/${sellerID}/quota`);
    if (res.status === 200) {
      setQuotas(res.data);
    }
    setQuotaLoading(false);
  };

  const fetchTransactionHistory = async () => {
    const res = await axios.get(`
    ${AppConfig.BASE_URL_API}sellers/${sellerID}/billing/transactions`);
    if (res.status === 200) {
      setTransactionHistory(res.data);
    }
    setTransactionHistoryLoading(false);
  };

  React.useEffect(() => {
    getSellerInfo();
    fetchSellerSubscription();
    fetchSubscriptionStripeInfo();
    fetchCreditCardInfo();
    fetchQuotas();
    fetchTransactionHistory();
  }, []);

  React.useEffect(() => {
    console.log('plan', subscriptionPlan);
    console.log('profile', profile);
  }, [subscriptionPlan, profile]);
  console.log(transactionHistory);
  return (
    <>
      <PageHeader
        title={'Billing'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Settings', to: '/settings' },
          { content: 'Billing' },
        ]}
        auth={match.params.auth}
      />

      <main className={styles.billingPageWrapper}>
        <QuotaAndPaymentsSection
          subscriptionPlan="Professional"
          subscriptionDetails={subscriptionStripeInfo}
          quotas={quotas}
          card={creditCardInfo}
          isQuotaLoading={isQuotaLoading}
          isSubscriptionStripeLoading={isSubscriptionStripeLoading}
          isCreditCardLoading={isCreditCardLoading}
        />

        <PastTransactionsSection
          transactionHistory={transactionHistory}
          loading={isTransactionHistoryLoading}
        />
      </main>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  profile: state.settings.profile,
  sellerSubscription: state.subscription.sellerSubscription,
  subscriptionType: state.subscription.subscriptionType,
  subscriptions: state.subscription.subscriptions,
  subscriptionPlan: state.subscription.plan,
});

const mapDispatchToProps = {
  getSeller: () => getSellerInfo(),
  fetchSellerSubscription: () => fetchSellerSubscription(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
