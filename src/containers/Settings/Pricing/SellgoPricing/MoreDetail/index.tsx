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
      <p>Enterprise</p>
      <div className={styles.pricingPlansCardBody}>
        <PricingPlansCardFeaturesList featuresIncluded={MORE_DETAIL_FEATURES} />
      </div>
      <ActionButton
        variant={'primary'}
        size={'md'}
        type="black"
        className={styles.completeButton}
        onClick={() => setIsDemoFormOpen(true)}
      >
        Contact sales
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
