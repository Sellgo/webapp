import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';

interface Props {
  handleNext: () => void;
}

const OrderCreatedSuccess = (props: Props) => {
  const { handleNext } = props;

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>You&apos;re all set!</h2>
      </div>

      <div className={styles.buttonsRow}>
        <ActionButton
          className={styles.nextButton}
          onClick={handleNext}
          variant="secondary"
          type="purpleGradient"
          size="md"
        >
          Take me to the Smart Order Now
        </ActionButton>
      </div>
    </div>
  );
};

export default OrderCreatedSuccess;
