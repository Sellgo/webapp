import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

/* Styling */
import styles from './index.module.scss';

/* Data */
import { plansAndProductsDetails } from './data/index';
import { monthlyAndAnnualPlans } from './data/tableData';

/* Components */
import PricePlanToggleButton from '../../../components/PricePlanToggleButton';
import PricingInfoAlert from '../../../components/PricingInfoAlert';
import PricingPlansCard from '../../../components/PricingPlansCard';
import AllFeaturesTable from '../../../components/AllFeaturesTable';

const Subscription: React.FC<{}> = () => {
  const [isMonthly, setIsMonthly] = useState(false);

  const infoAlertDetails = isMonthly
    ? plansAndProductsDetails.infoAlertMessage.monthly
    : plansAndProductsDetails.infoAlertMessage.yearly;

  return (
    <>
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
        </section>
      </main>
    </>
  );
};

export default Subscription;
