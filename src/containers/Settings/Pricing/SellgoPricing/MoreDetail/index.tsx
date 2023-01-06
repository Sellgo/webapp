import React, { useState } from 'react';

import styles from './index.module.scss';
/* Components */

import ActionButton from '../../../../../components/ActionButton';
import { Modal } from 'semantic-ui-react';
import DemoForm from '../../../../../components/DemoForm';

const MoreDetails = () => {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
  return (
    <section className={styles.moreDetailsSection}>
      <p>
        *Need more data? <br />
        Do you have existing seller data that you want to enrich with our updated data?
      </p>
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
