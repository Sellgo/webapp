import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import FilterBlack from '../../assets/images/filter-black.svg';
import FilterWhite from '../../assets/images/filter-white.svg';
import AngleUpWhite from '../../assets/images/angle-up-white.svg';
import AngleDownBlack from '../../assets/images/angle-down-black.svg';

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
      style={{ background: !showAdvancedFilter ? '#3B4557' : ' #95A1AC' }}
    >
      <img
        className={styles.filterIcon}
        src={!showAdvancedFilter ? FilterWhite : FilterBlack}
        alt="filter"
      />
      <span style={{ color: !showAdvancedFilter ? '#FFFFFF' : '#636D76' }}>
        Marketplace Metrics
      </span>
      <span>
        {showAdvancedFilter ? (
          <img src={AngleUpWhite} alt="angle" />
        ) : (
          <img src={AngleDownBlack} alt="angle" />
        )}
      </span>
    </div>
  );
};

export default memo(AdvancedFilterToggle);
