import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

/* Styles */
import styles from './index.module.scss';

/* Components */
import AllFeaturesTable from '../../../../../components/AllFeaturesTable';

/* Utils */
import { getAllFeaturesForPlans } from '../../../../../utils/featurePlans';

interface Props {
  planName: string;
}

const PricingComparison = (props: Props) => {
  const { planName } = props;
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const allPlanFeatures = getAllFeaturesForPlans(planName);
  return (
    <section className={styles.pricingComparisonSection}>
      <div className={styles.comparisonTextContainer}>
        <p onClick={() => setShowComparison(!showComparison)}>
          {showComparison ? 'Collapse Comparison' : 'Show Plan Comparison'}
          <span className={showComparison ? styles.rotateNegative : styles.rotatePositive}>
            &gt;
          </span>
        </p>
      </div>
      <div className={`${!showComparison && styles.hideFeatureTable}`}>
        {allPlanFeatures.map((feature: any) => {
          return <AllFeaturesTable header={feature.header} body={feature.body} key={uuid()} />;
        })}
      </div>
    </section>
  );
};

export default PricingComparison;
