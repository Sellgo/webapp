import React from 'react';
import { Icon } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

interface Props {
  className?: string;
  handleSave: () => void;
  handleCancel: () => void;
}

const SaveCancelOptions = (props: Props) => {
  const { className, handleSave, handleCancel } = props;
  return (
    <div className={`${className} ${styles.saveCancelOptions}`}>
      <button className={styles.checkIcon}>
        <Icon name="check" onClick={handleSave} />
      </button>
      <button className={styles.closeIcon}>
        <Icon name="close" onClick={handleCancel} />
      </button>
    </div>
  );
};

export default SaveCancelOptions;
