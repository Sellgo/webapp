import React, { memo } from 'react';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  handleClick: () => void;
  showAdvancedFilter: boolean;
}

const AdvancedFilterToggle = (props: Props) => {
  const { handleClick, showAdvancedFilter } = props;

  return (
    <div
      className={styles.advancedFilterToggle}
      onClick={handleClick}
      style={{ background: !showAdvancedFilter ? '#F9F9FA' : ' #F2EFE4' }}
    >
      <span>Advanced Filters</span>
      <span>{showAdvancedFilter ? <Icon name="chevron up" /> : <Icon name="chevron down" />}</span>
    </div>
  );
};

export default memo(AdvancedFilterToggle);
