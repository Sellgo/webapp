import React from 'react';
import { Modal } from 'semantic-ui-react';
// @ts-ignore
import { Widget } from '@typeform/embed-react';

/* Images */
import sellgoLogoWhiteWithText from '../../assets/images/sellgoLogoWhiteWithText.png';
import cross from '../../assets/images/crossIcon.svg';

/* Components */
import OrangeButton from '../../components/OrangeButton';

/* Styling */
import styles from './index.module.scss';

/* Config */
import { AppConfig } from '../../config';

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

              <OrangeButton
                className={styles.startButton}
                type="primary"
                size="small"
                onClick={() => setInTypeform(true)}
              >
                I&apos;m ready to start
              </OrangeButton>
            </div>
          )}
          <div className={styles.footer}>
            Questions? Check out our&nbsp;<a href="/faq">FAQ</a>. Something not right?&nbsp;
            <a href="/contact">Contact us.</a> &nbsp;We Can Help.
          </div>
        </div>
      }
    />
  );
};

export default QuickWin;
