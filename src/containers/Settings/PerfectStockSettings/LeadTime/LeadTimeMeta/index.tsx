import React from 'react';
import ActionButton from '../../../../../components/ActionButton';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../../assets/images/thinAddIcon.svg';
import { ReactComponent as HourGlassIcon } from '../../../../../assets/images/hourglassIcon.svg';

/* Styling */
import styles from './index.module.scss';

interface Props {
  handleAddGroup: () => void;
}
const LeadTimeMeta = (props: Props) => {
  const { handleAddGroup } = props;
  return (
    <>
      <div className={styles.leadTimeMetaTitle}>
        <HourGlassIcon />
        &nbsp;&nbsp;Lead Time Settings
      </div>
      <ActionButton
        type="purpleGradient"
        variant="secondary"
        size="md"
        className={styles.addTriggerButton}
        onClick={handleAddGroup}
      >
        <ThinAddIcon />
        <span>Add Lead Time Group</span>
      </ActionButton>
    </>
  );
};
export default LeadTimeMeta;
