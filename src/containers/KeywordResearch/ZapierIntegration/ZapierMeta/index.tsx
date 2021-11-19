import React from 'react';
import ActionButton from '../../../../components/ActionButton';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';

/* Styling */
import styles from './index.module.scss';

interface Props {
  handleAddTrigger: () => void;
}
const ZapierMeta = (props: Props) => {
  const { handleAddTrigger } = props;
  return (
    <>
      <ActionButton
        type="purpleGradient"
        variant="secondary"
        size="md"
        className={styles.addTriggerButton}
        onClick={handleAddTrigger}
      >
        <ThinAddIcon />
        <span>Add Product Trigger</span>
      </ActionButton>
    </>
  );
};
export default ZapierMeta;
