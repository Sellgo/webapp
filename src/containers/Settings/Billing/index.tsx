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
import SettingsNav from '../SettingsNav';

/* Types */
import { AppConfig } from '../../../config';
import QuotaAndPaymentsSection from './QuotaAndPaymentsSection';

/* Interfaces */
import {
  QuotaCollection,
  StripeSubscriptionInfo,
  Transaction,
  CreditCard,
  SubscriptionPlanType,
} from '../../../interfaces/Settings/billing';

import {
  DEFAULT_CREDIT_CARD,
  DEFAULT_QUOTA_COLLECTION,
  DEFAULT_STRIPE_SUBSCRIPTION_INFO,
} from '../../../constants/Settings/billing';

interface Props {
  fetchSellerSubscription: () => void;
  subscriptionPlan: SubscriptionPlanType;
  match: any;
  history: any;
}

const Billing = (props: Props) => {
  const { match, fetchSellerSubscription, subscriptionPlan, history } = props;

  const [hasActivePlan, setHasActivePlan] = React.useState<boolean>(true);
  const [hasPaymentMethod, setHasPaymentMethod] = React.useState<boolean>(true);
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
    setSubscriptionStripeLoading(true);
    try {
      const res = await axios.get(`
        ${AppConfig.BASE_URL_API}sellers/${sellerID}/billing/current-subscription`);
      if (res.status === 200) {
        setHasActivePlan(true);
        setSubscriptionStripeInfo(res.data);
      }
    } catch (err) {
      setHasActivePlan(false);
    }
    setSubscriptionStripeLoading(false);
  };

  const fetchCreditCardInfo = async () => {
    setCreditCardLoading(true);
    try {
      const res = await axios.get(`
      ${AppConfig.BASE_URL_API}sellers/${sellerID}/billing/credit-card`);
      if (res.status === 200) {
        setHasPaymentMethod(true);
        setCreditCardInfo(res.data);
      }
    } catch (err) {
      setHasPaymentMethod(false);
    }
    setCreditCardLoading(false);
  };

  const fetchQuotas = async () => {
    setQuotaLoading(true);
    try {
      const res = await axios.get(`
      ${AppConfig.BASE_URL_API}sellers/${sellerID}/quota`);
      if (res.status === 200) {
        setQuotas(res.data);
      }
    } catch (err) {
      setQuotas(DEFAULT_QUOTA_COLLECTION);
    }
    setQuotaLoading(false);
  };

  const fetchTransactionHistoryPastYear = async () => {
    setTransactionHistoryLoading(true);
    try {
      const res = await axios.get(`
      ${AppConfig.BASE_URL_API}sellers/${sellerID}/billing/year/transactions`);
      if (res.status === 200) {
        setTransactionHistory(res.data);
      }
    } catch (err) {
      setTransactionHistory([]);
    }
    setTransactionHistoryLoading(false);
  };

  const fetchTransactionHistoryAll = async () => {
    setTransactionHistoryLoading(true);
    try {
      const res = await axios.get(`
      ${AppConfig.BASE_URL_API}sellers/${sellerID}/billing/all/transactions`);
      if (res.status === 200) {
        setTransactionHistory(res.data);
      }
    } catch (err) {
      setTransactionHistory([]);
    }
    setTransactionHistoryLoading(false);
  };

  React.useEffect(() => {
    getSellerInfo();
    fetchSellerSubscription();
    fetchSubscriptionStripeInfo();
    fetchCreditCardInfo();
    fetchQuotas();
    fetchTransactionHistoryPastYear();
  }, []);

  return (
    <>
      <PageHeader
        title={'Billing'}
        breadcrumb={[{ content: 'Home', to: '/' }, { content: 'Settings' }, { content: 'Billing' }]}
        auth={match.params.auth}
      />

      <main className={styles.billingPageWrapper}>
        <SettingsNav match={match} history={history} />
        <div className={styles.billingPage}>
          <QuotaAndPaymentsSection
            subscriptionPlan={subscriptionPlan}
            subscriptionDetails={subscriptionStripeInfo}
            quotas={quotas}
            card={creditCardInfo}
            isQuotaLoading={isQuotaLoading}
            isSubscriptionStripeLoading={isSubscriptionStripeLoading}
            isCreditCardLoading={isCreditCardLoading}
            fetchCreditCardInfo={fetchCreditCardInfo}
            hasActivePlan={hasActivePlan}
            hasPaymentMethod={hasPaymentMethod}
          />

          <PastTransactionsSection
            transactionHistory={transactionHistory}
            loading={isTransactionHistoryLoading}
            fetchTransactionHistoryAll={fetchTransactionHistoryAll}
          />
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  subscriptionPlan: state.subscription.plan,
});

const mapDispatchToProps = {
  fetchSellerSubscription: () => fetchSellerSubscription(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
