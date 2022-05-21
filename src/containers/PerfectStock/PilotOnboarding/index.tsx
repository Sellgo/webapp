import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* components */
import ActionButton from '../../../components/ActionButton';

/* Actions */
import { fetchSellerSubscription } from '../../../actions/Settings/Subscription';
import MigrationDisplay from '../../../assets/images/aistockPremigrationDisplay.png';

interface Props {
  redirectToMigrate?: () => void;
}

const PilotOnboarding = (props: Props) => {
  const { redirectToMigrate } = props;
  return (
    <>
      <main className={styles.pilotOnboardingPage}>
        <div className={styles.leftSection}>
          <h2>Let&apos;s start the migration, it&apos;s fast, easy and secure!</h2>
          <p>
            Connecting your Amazon account to AiStock will unlock the power of automation to your
            supply chain system.
          </p>
          <p>Once connected, you'll be able to:</p>
          <div className={styles.benefitRow}>
            <Icon name="checkmark" color="purple" />
            <div className={styles.benefitText}>
              <p>Knowing when you&apos;re at risk of stockout</p>
              <span>with our alert automation tool.</span>
            </div>
          </div>
          <div className={styles.benefitRow}>
            <Icon name="checkmark" color="purple" />
            <div className={styles.benefitText}>
              <p>Knowing what your future sales</p>
              <span>with our sales forecasting.</span>
            </div>
          </div>
          <div className={styles.benefitRow}>
            <Icon name="checkmark" color="purple" />
            <div className={styles.benefitText}>
              <p>Knowing when to place your next orders</p>
              <span>with our order planning tool.</span>
            </div>
          </div>
          <div className={styles.privacyInformation}>
            <Icon name="lock" color="black" size="big" />
            <span>
              AiStock are committed to maintaining the highest standard for security in order that
              your valuable data can be kept safe and secure at channel and at storage. We promise
              that we will never share your data with others.
            </span>
          </div>
          <ActionButton
            variant={'primary'}
            size="md"
            type="purpleGradient"
            className={styles.migrateButton}
            onClick={redirectToMigrate}
          >
            Continue
          </ActionButton>
        </div>
        <div className={styles.rightDisplayPictureWrapper}>
          <img
            src={MigrationDisplay}
            className={styles.rightDisplayPicture}
            alt="migration display"
          />
        </div>
      </main>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerSubscription: () => dispatch(fetchSellerSubscription()),
  };
};

export default connect(null, mapDispatchToProps)(PilotOnboarding);
