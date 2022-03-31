import React from 'react';
import { Modal } from 'semantic-ui-react';
// @ts-ignore
import { Widget } from '@typeform/embed-react';

/* Components */
import ActionButton from '../ActionButton';

/* Styling */
import styles from './index.module.scss';

/* Config */
import { AppConfig } from '../../config';

interface Props {
  isOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  onSubmit: () => void;
}

const AiStockOnboardingForm = (props: Props) => {
  const { isOpen, setModalOpen, onSubmit } = props;
  const [completedSurvey, setCompletedSurvey] = React.useState<boolean>(false);

  return (
    <Modal
      open={isOpen}
      className={styles.quickWinModal}
      onClose={() => setModalOpen(false)}
      closeOnDocumentClick={false}
      closeOnDimmerClick={false}
      content={
        <div>
          {!completedSurvey ? (
            <Widget
              id={AppConfig.AISTOCK_ONBOARDING_SURVEY}
              className={styles.typeFormBox}
              onSubmit={() => {
                setCompletedSurvey(true);
                onSubmit();
              }}
            />
          ) : (
            <div className={styles.completedSurveyContent}>
              Thank you. Your survey has been received.
              <br />
              Your feedback is valuable in helping us to improve AiStock for you!
              <ActionButton
                variant="primary"
                type="purpleGradient"
                size="md"
                onClick={() => setModalOpen(false)}
                className={styles.continueButton}
              >
                Continue To Ai Stock
              </ActionButton>
            </div>
          )}
        </div>
      }
    />
  );
};

export default AiStockOnboardingForm;
