import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

/* Styling */
import styles from './index.module.scss';

/* Data */
import { plansAndProductsDetails } from './data/index';
import { monthlyAndAnnualPlans } from './data/tableData';

/* Components */
import SubscriptionMessage from '../../../components/FreeTrialMessageDisplay';
import PageHeader from '../../../components/PageHeader';
import PricePlanToggleButton from '../../../components/PricePlanToggleButton';
import PricingInfoAlert from '../../../components/PricingInfoAlert';
import PricingPlansCard from '../../../components/PricingPlansCard';
import AllFeaturesTable from '../../../components/AllFeaturesTable';

/* Asssets */
import Setcard from '../../../assets/images/4_Card_color_horizontal.svg';
import Stripe from '../../../assets/images/powered_by_stripe.svg';

interface Props {
  match: any;
}
const Subscription: React.FC<Props> = props => {
  const { match } = props;

  const [isMonthly, setIsMonthly] = useState(false);

  const infoAlertDetails = isMonthly
    ? plansAndProductsDetails.infoAlertMessage.monthly
    : plansAndProductsDetails.infoAlertMessage.yearly;

  return (
    <>
      <SubscriptionMessage page={'subscription'} />

      <PageHeader
        title={'Pricing Plans'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Settings', to: '/settings' },
          { content: 'Pricing' },
        ]}
        auth={match.params.auth}
      />

      <main className={styles.subscriptionPage}>
        <section className={styles.subscriptionPageWrapper}>
          <div className={styles.planName}>
            <span />
            <h2>{plansAndProductsDetails.planName}</h2>
          </div>

          <div className={styles.planShortSummary}>
            <p>{plansAndProductsDetails.summary}</p>
          </div>

          <PricePlanToggleButton
            isMonthly={isMonthly}
            handleChange={() => setIsMonthly(!isMonthly)}
            className={styles.paymentModeToggle}
          />

          <PricingInfoAlert {...infoAlertDetails} background="#F2EFE4" />

          <section className={styles.pricingPlanCardsWrapper}>
            {plansAndProductsDetails.productsIncluded.map(product => {
              return (
                <PricingPlansCard
                  key={uuid()}
                  {...product}
                  isMonthly={isMonthly}
                  planName={plansAndProductsDetails.planName}
                />
              );
            })}
          </section>

          <section className={styles.allFeaturesSection}>
            {monthlyAndAnnualPlans.map((feature: any) => {
              return <AllFeaturesTable key={uuid()} header={feature.header} body={feature.body} />;
            })}
          </section>

          <section className={styles.paymentMeta}>
            <div className={styles.paymentMeta__images}>
              <img src={Setcard} alt="Different card payment options" />
              <img src={Stripe} alt="Protected by stripe logo" />
            </div>
            <div className={styles.paymentMeta__text}>
              <p>We offer 7-day money back guarantee.</p>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default Subscription;
