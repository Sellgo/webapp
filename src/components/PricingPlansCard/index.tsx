import React from 'react';
import { v4 as uuid } from 'uuid';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PricingPlansCardHead from './PricingPlansCardHead';
import PricingPlansCardFeaturesList from './PricingPlansCardFeaturesList';

interface Props {
  name: string;
  productsDatabase: number;
  salesEstimateCount: number;
  annualPrice: number;
  featuresLists: any;
  featureSubName: string;
  planName: string;
  isMonthly: boolean;
  monthlyPrice: number;
  desc: string;
}

const PricingPlansCard: React.FC<Props> = props => {
  const {
    name,
    productsDatabase,
    annualPrice,
    featuresLists,
    featureSubName,
    planName,
    salesEstimateCount,
    isMonthly,
    monthlyPrice,

    desc,
  } = props;

  return (
    <div className={styles.pricingPlansCardWrapper}>
      <div className={styles.pricingPlansCard}>
        <PricingPlansCardHead
          name={name}
          productsDatabase={productsDatabase}
          annualPrice={annualPrice}
          planName={planName}
          salesEstimateCount={salesEstimateCount}
          isMonthly={isMonthly}
          monthlyPrice={monthlyPrice}
          desc={desc}
        />

        <p className={styles.planType}>{featureSubName}</p>

        <div className={styles.pricingPlansCardBody}>
          {featuresLists.map((featureList: any) => {
            return <PricingPlansCardFeaturesList key={uuid()} {...featureList} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingPlansCard;
