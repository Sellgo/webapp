import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import { ReactComponent as MoneyCheckIcon } from '../../../../assets/images/moneyCheck.svg';
import { ReactComponent as GreenCircle } from '../../../../assets/images/greenCheckCircleSmall.svg';
import { ReactComponent as RedCross } from '../../../../assets/images/redCrossCircle.svg';

/* Constants */
import { ONBOARDING_STATUS_MAPPING } from '../../../../constants/PerfectStock/Cashflow';

/* Components */
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';

interface Props {
  closeModal: () => void;
  onboardingStatus: any[];
}

const OnboardingModal = (props: Props) => {
  const { onboardingStatus } = props;

  const [onboardingFilterStatus, setOnboardingFilterStatus] = React.useState<'' | 'capex' | 'apex'>(
    'apex'
  );

  return (
    <div className={styles.onboardingModal}>
      <BoxHeader>CASH FLOW</BoxHeader>
      {!onboardingFilterStatus && (
        <BoxContainer className={styles.onboardingContent}>
          <h2> Cashflow setup completeness </h2>
          <div className={styles.onboardingButtonOptions}>
            <button
              className={styles.capexButton}
              onClick={() => setOnboardingFilterStatus('capex')}
            >
              <MoneyCheckIcon />
              CAPEX/ Capital Expense
            </button>

            <button
              className={styles.capexButton}
              onClick={() => setOnboardingFilterStatus('apex')}
            >
              <MoneyCheckIcon />
              OPEX/ Operational Expense
            </button>
          </div>
        </BoxContainer>
      )}

      {onboardingFilterStatus && (
        <BoxContainer className={styles.onboardingContent}>
          <h2> Cashflow setup completeness </h2>
          <div className={styles.onboardingList}>
            {onboardingStatus.map(cost => {
              const costInfo: any = ONBOARDING_STATUS_MAPPING[cost.step_name];

              if (costInfo) {
                return (
                  <a
                    href={costInfo.to}
                    className={`
                      ${styles.onboardingCost}
                      ${cost.is_completed ? styles.onboardingCost__completed : ''}
                    `}
                  >
                    {cost.is_completed ? <GreenCircle /> : <RedCross />}
                    &nbsp;
                    {costInfo.title}
                    <span>&gt;</span>
                  </a>
                );
              } else {
                return null;
              }
            })}
          </div>
        </BoxContainer>
      )}
    </div>
  );
};

export default OnboardingModal;
