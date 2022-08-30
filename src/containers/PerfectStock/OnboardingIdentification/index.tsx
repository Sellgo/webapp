import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { fetchSellerSubscription, updateSeller } from '../../../actions/Settings/Subscription';
import MigrationDisplay from '../../../assets/images/aistockPremigrationDisplay.png';

interface Props {
  redirectToNextStep: () => void;
  updateSeller: (seller: any) => void;
}

const businessTypes = [
  {
    label: 'Brand enterprise',
    value: 'brand_enterprise',
  },
  {
    label: 'Private label',
    value: 'private_label',
  },
  {
    label: 'Agency',
    value: 'agency',
  },
  {
    label: 'Wholesale/ reseller',
    value: 'wholesale_reseller',
  },
  {
    label: 'Arbitrage',
    value: 'arbitrage',
  },
  {
    label: 'Other retailers',
    value: 'other_retailers',
  },
  {
    label: 'Other service providers',
    value: 'other_service_providers',
  },
];

const OnboardingIdentification = (props: Props) => {
  const { redirectToNextStep, updateSeller } = props;

  const handleBusinessTypeChange = async (value: string) => {
    updateSeller({
      business_type: value,
    });

    redirectToNextStep();
  };

  return (
    <>
      <main className={styles.pilotOnboardingPage}>
        <div className={styles.leftSection}>
          <h2>Start your Amazon inventory planning the right way with AiStock</h2>
          <p>
            Learn how to build a robust inventory system step-by-step with AiStock, our
            comprehensive one-click supply chain.
          </p>

          <div className={styles.optionsContainer}>
            <p className={styles.optionsLabel}>How would you describe your business?</p>

            {businessTypes.map((type, index) => (
              <div
                className={styles.businessType}
                onClick={() => handleBusinessTypeChange(type.value)}
                key={index}
              >
                {type.label}
              </div>
            ))}
          </div>

          <div className={styles.buttonContainer}>
            <div className={styles.dotContainer}>
              <div className={`${styles.dot} ${styles.selected}`}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
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
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerSubscription: () => dispatch(fetchSellerSubscription()),
    updateSeller: (seller: any) => dispatch(updateSeller(seller)),
  };
};

export default connect(null, mapDispatchToProps)(OnboardingIdentification);
