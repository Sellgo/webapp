import React from 'react';
import { Modal } from 'semantic-ui-react';
// @ts-ignore
import { Widget } from '@typeform/embed-react';

/* Images */
import sellgoLogoWhiteWithText from '../../assets/images/sellgoLogoWhiteWithText.png';
import cross from '../../assets/images/crossIcon.svg';

/* Components */
import ActionButton from '../ActionButton';

/* Styling */
import styles from './index.module.scss';

/* Config */
import { AppConfig } from '../../config';

interface Props {
  isOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  surveyId: string;
  onSubmit: () => void;
}

const QuickWin = (props: Props) => {
  const { isOpen, setModalOpen, onSubmit, surveyId } = props;
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
          <div className={styles.header}>
            <img className={styles.sellgoLogo} src={sellgoLogoWhiteWithText} alt="sellgo-logo" />
            <img
              onClick={() => setModalOpen(false)}
              className={styles.crossIcon}
              src={cross}
              alt="sellgo-logo"
            />
          </div>
          {!completedSurvey ? (
            <Widget
              id={surveyId}
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
              <br />
              <br />
              You will be informed via email, after 1 April 2022, if you are selected for the
              giveaway.
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

export default QuickWin;
