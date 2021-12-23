import React from 'react';
import ActionButton from '../../../../../components/ActionButton';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../../assets/images/thinAddIcon.svg';

/* Styling */
import styles from './index.module.scss';

interface Props {
  handleAddGroup: () => void;
}
const LeadTimeMeta = (props: Props) => {
  const { handleAddGroup } = props;
  return (
    <>
      <ActionButton
        type="purpleGradient"
        variant="secondary"
        size="md"
        className={styles.addTriggerButton}
        onClick={handleAddGroup}
      >
        <ThinAddIcon />
        <span>Add Product Trigger</span>
      </ActionButton>
    </>
  );
};
export default LeadTimeMeta;
