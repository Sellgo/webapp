import React, { memo } from 'react';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import FilterBlack from '../../assets/images/filter-black.svg';
import FilterWhite from '../../assets/images/filter-white.svg';

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
      style={{ background: !showAdvancedFilter ? '#F9F9FA' : ' #3B4557' }}
    >
      <img src={!showAdvancedFilter ? FilterBlack : FilterWhite} alt="filter" />
      <span style={{ color: !showAdvancedFilter ? '#636D76' : '#FFFFFF' }}>Advanced Filters</span>
      <span>{showAdvancedFilter ? <Icon name="chevron up" /> : <Icon name="chevron down" />}</span>
    </div>
  );
};

export default memo(AdvancedFilterToggle);
