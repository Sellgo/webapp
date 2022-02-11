import React from 'react';
import { Icon } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

interface Props {
  className?: string;
  handleSave: () => void;
  handleCancel: () => void;
  disabled?: boolean;
}

const SaveCancelOptions = (props: Props) => {
  const { className, handleSave, handleCancel, disabled } = props;
  return (
    <div
      className={`${className} ${styles.saveCancelOptions}`}
      onMouseDown={e => e.preventDefault()}
    >
      <button className={styles.checkIcon} disabled={disabled} onClick={handleSave}>
        <Icon name="check" />
      </button>
      <button className={styles.closeIcon} onClick={handleCancel}>
        <Icon name="close" />
      </button>
    </div>
  );
};

export default SaveCancelOptions;
