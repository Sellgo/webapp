import React, { memo } from 'react';
import { Modal } from 'semantic-ui-react';

/* Components */
import ActionButton from '../ActionButton';

/* Styling */
import styles from './index.module.scss';
import './globals.scss';

interface Props {
  isOpen: boolean;
  title: string;
  text: string;
  cancelText: string;
  saveText: string;
  setIsOpen: (value: boolean) => void;
  handleCancel: () => void;
  handleSave: () => void;
}

const AlertModal = (props: Props) => {
  const { isOpen, title, text, cancelText, saveText, setIsOpen, handleCancel, handleSave } = props;

  return (
    <Modal
      open={isOpen}
      className={styles.alertModal}
      onClose={() => setIsOpen(false)}
      size={'small'}
      closeOnDocumentClick={false}
      closeOnDimmerClick={false}
      content={
        <div className={styles.alertModal__contentWrapper}>
          <div className={styles.alertModal__title}>
            <p>{title}</p>
          </div>
          <div className={styles.alertModal__text}>
            <p>{text}</p>
          </div>
          <div className={styles.alertModal__btnWrapper}>
            <ActionButton variant={'reset'} size={'md'} onClick={() => handleCancel()}>
              {cancelText}
            </ActionButton>
            <ActionButton
              variant="primary"
              type="purpleGradient"
              size="md"
              onClick={() => handleSave()}
              className={styles.continueButton}
            >
              {saveText}
            </ActionButton>
          </div>
        </div>
      }
    />
  );
};

export default memo(AlertModal);
