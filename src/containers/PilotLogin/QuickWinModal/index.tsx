import React from 'react';
import { Modal } from 'semantic-ui-react';
// @ts-ignore
import { Widget } from '@typeform/embed-react';

/* Images */
import sellgoLogoWhiteWithText from '../../../assets/images/sellgoLogoWhiteWithText.png';
import cross from '../../../assets/images/crossIcon.svg';

/* Components */
import ActionButton from '../../../components/ActionButton';

/* Styling */
import styles from './index.module.scss';

/* Config */
import { AppConfig } from '../../../config';

const QuickWin = () => {
  const [isModalOpen, setModalOpen] = React.useState<boolean>(true);
  const [isInTypeform, setInTypeform] = React.useState<boolean>(false);

  return (
    <Modal
      open={isModalOpen}
      className={styles.quickWinModal}
      onClose={() => setModalOpen(false)}
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
          {isInTypeform ? (
            <Widget
              id={AppConfig.QUICK_WIN_SURVEY_ID}
              className={styles.typeFormBox}
              onSubmit={() => setModalOpen(false)}
            />
          ) : (
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>
                You&apos;ll be up and running in a few seconds ...
              </h2>
              <p className={styles.modalText}>
                Thank you for allowing Sellgo the privilege of helping for your Amazon business.
                {<br />}
                You are the reason we are here, and we truly hope we provide you with the excellent
                service you deserve.
              </p>

              <ActionButton
                variant="secondary"
                type="purpleGradient"
                size="md"
                onClick={() => setInTypeform(true)}
                className={styles.startButton}
              >
                I&apos;m ready to start
              </ActionButton>
            </div>
          )}
        </div>
      }
    />
  );
};

export default QuickWin;
