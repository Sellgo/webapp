import React, { useState } from 'react';

import styles from './index.module.scss';
/* Components */

import ActionButton from '../../../../../components/ActionButton';
import { Modal } from 'semantic-ui-react';
import DemoForm from '../../../../../components/DemoForm';
import PricingPlansCardFeaturesList from '../../../../../components/PricingPlansCard/PricingPlansCardFeaturesList';
import { MORE_DETAIL_FEATURES } from '../../../../../constants/Subscription/Sellgo/moreDetailFeatures';

const MoreDetails = () => {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
  return (
    <section className={styles.moreDetailsSection}>
      <p>Need everything unlimited?</p>
      <div className={styles.pricingPlansCardBody}>
        <PricingPlansCardFeaturesList featuresIncluded={MORE_DETAIL_FEATURES} />
      </div>
      <ActionButton
        variant={'primary'}
        size={'md'}
        type="purpleGradient"
        className={styles.completeButton}
        onClick={() => setIsDemoFormOpen(true)}
      >
        Talk to an expert
      </ActionButton>

      <Modal
        open={isDemoFormOpen}
        onClose={() => setIsDemoFormOpen(false)}
        // className={styles.demoModal}
      >
        <DemoForm onRequestClose={() => setIsDemoFormOpen(false)} />
      </Modal>
    </section>
  );
};

export default MoreDetails;
