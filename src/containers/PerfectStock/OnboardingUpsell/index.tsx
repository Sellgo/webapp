import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* components */
import ActionButton from '../../../components/ActionButton';

/* Actions */
import { fetchSellerSubscription } from '../../../actions/Settings/Subscription';
import MigrationDisplay from '../../../assets/images/aistockPremigrationDisplay.png';

/* Utils */
import history from '../../../history';

interface Props {
  redirectToNextStep?: () => void;
}

const OnboardingUpsell = (props: Props) => {
  const { redirectToNextStep } = props;

  return (
    <main className={styles.upsellCtaPage}>
      <div className={styles.leftSection}>
        <h2>Your free trial has expired, upgrade to continue.</h2>
        <p>Take control of your business success through inventory and cash flow forecast.</p>
        <div className={styles.benefitsTable}>
          <div className={styles.benefitsColumn}>
            <h2>Benefits</h2>
            <span>Streamline smart order for longer than 6-month period</span>
            <span>Activate all sales forecasting features</span>
            <span>Activate all order planning features</span>
            <span>Activate all 3PL manager features</span>
            <span>Activate all cash flow expense features</span>
          </div>
          <div className={styles.freePlanColumn}>
            <h2>14-day Free Trial</h2>
            <span>-</span>
            <span>-</span>
            <span>-</span>
            <span>-</span>
            <span>-</span>
          </div>
          <div className={styles.professionalColumn}>
            <h2>Professional</h2>
            <p className={styles.price}>$97/mo</p>
            <span>Yes</span>
            <span>Yes</span>
            <span>Yes</span>
            <span>Yes</span>
            <span>Yes</span>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <div className={styles.dotContainer}>
            <div className={styles.dot}></div>
            <div className={`${styles.dot} ${styles.selected}`}></div>
            <div className={styles.dot}></div>
          </div>

          <ActionButton
            type="purpleGradient"
            variant="secondary"
            size="md"
            onClick={redirectToNextStep}
            className={styles.activateButton}
          >
            Maybe Later
          </ActionButton>

          <ActionButton
            type="purpleGradient"
            variant="primary"
            size="md"
            onClick={() => history.push('/subscription/payment')}
            className={styles.activateButton}
          >
            Upgrade
          </ActionButton>
        </div>
      </div>

      <div className={styles.rightDisplayPictureWrapper}>
        <img
          src={MigrationDisplay}
          className={styles.rightDisplayPicture}
          alt="migration display"
        />
      </div>
    </main>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerSubscription: () => dispatch(fetchSellerSubscription()),
  };
};

export default connect(null, mapDispatchToProps)(OnboardingUpsell);
