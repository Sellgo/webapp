import React from 'react';
import { Modal } from 'semantic-ui-react';
// @ts-ignore
import { Widget } from '@typeform/embed-react';

/* Images */
import aistockLogoWhiteWithText from '../../assets/images/aistockLogoWhiteWithText.png';
import cross from '../../assets/images/crossIcon.svg';

/* Styling */
import styles from './index.module.scss';

interface Props {
  isOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  surveyId: string;
  onSubmit: () => void;
}

const QuickWin = (props: Props) => {
  const { isOpen, setModalOpen, onSubmit, surveyId } = props;
  const [completedSurvey, setCompletedSurvey] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (completedSurvey) {
      setModalOpen(false);
    }
  }, [completedSurvey]);

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
            <img className={styles.sellgoLogo} src={aistockLogoWhiteWithText} alt="aistock-logo" />
            <img
              onClick={() => setModalOpen(false)}
              className={styles.crossIcon}
              src={cross}
              alt="aistock-logo"
            />
          </div>
          <Widget
            id={surveyId}
            className={styles.typeFormBox}
            onSubmit={() => {
              setCompletedSurvey(true);
              onSubmit();
            }}
          />
        </div>
      }
    />
  );
};

export default QuickWin;
