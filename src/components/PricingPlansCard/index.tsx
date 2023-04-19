import React from 'react';
import { v4 as uuid } from 'uuid';

/* Styles */
import styles from './index.module.scss';

/* Components */
import GenericPlanCardHead from './GenericPlanCardHead';
import PricingPlansCardFeaturesList from './PricingPlansCardFeaturesList';
import Star from '../../assets/images/starWhite.svg';

interface Props {
  // product details
  id: number;
  name: string;
  displayName?: string;
  monthlyPrice: number;
  annualPrice: number;
  desc: string;
  featureSubName: string;
  featuresLists: any;
  isNew?: boolean;

  // plan details
  isMonthly: boolean;
  monthlyLookups?: number;
  annualLookups?: number;

  // subscription actions
  changePlan: (
    subscriptionDetails: { name: string; id: number },
    isUpgradingToYearly?: boolean
  ) => void;

  // selelr details
  sellerSubscription: any;
  isFreeTrial?: boolean;
}

const PricingPlansCard: React.FC<Props> = props => {
  const {
    id,
    name,
    displayName,
    isNew,
    monthlyPrice,
    annualPrice,
    desc,
    featureSubName,
    featuresLists,
    isMonthly,
    monthlyLookups,
    annualLookups,
    changePlan,
    sellerSubscription,
    isFreeTrial = false,
  } = props;

  return (
    <div
      className={`${styles.pricingPlansCardWrapper} ${
        isNew ? styles.pricingPlansCardWrapper__new : ''
      }`}
    >
      {isNew && (
        <div className={styles.newFeatureBanner}>
          <img src={Star} width={25} height={25} />
          Most popular
        </div>
      )}
      <div className={`${styles.pricingPlansCard}`}>
        <GenericPlanCardHead
          id={id}
          name={name}
          displayName={displayName}
          desc={desc}
          monthlyPrice={monthlyPrice}
          annualPrice={annualPrice}
          // plan details
          isMonthly={isMonthly}
          changePlan={changePlan}
          // Seller details
          sellerSubscription={sellerSubscription}
          isNew={isNew}
          monthlyLookups={monthlyLookups}
          annualLookups={annualLookups}
          isFreeTrial={isFreeTrial}
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

PricingPlansCard.defaultProps = {
  isNew: false,
};

export default PricingPlansCard;
