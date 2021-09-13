import React from 'react';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import { ReactComponent as YoutubeLogo } from '../../../assets/images/youtubeLogo.svg';

/* Component */
import OnboardingTooltip from '../../OnboardingTooltip';

interface Props {
  title: string;
  dataKey: string;
  currentSortColumn: string;
  currentSortType: 'asc' | 'desc' | undefined;
}

const sortedStyles = {
  color: '#3b4557',
  fontWeight: 600,
};

const defaultStyles = {
  color: '#95A1AC',
  fontWeight: 500,
};

/* Header cell, Adds a sort icon beside the heading. */
const HeaderSortCell = (props: Props) => {
  const { title, dataKey, currentSortColumn, currentSortType } = props;

  /* Generating sort icon */
  const isCurrentlySorted = currentSortColumn === dataKey;
  const isAscendingSorted = currentSortType === 'asc' && isCurrentlySorted;
  const isDescendingSorted = currentSortType === 'desc' && isCurrentlySorted;

  return (
    <div className={styles.headerCell}>
      <p className={styles.headerText} style={isCurrentlySorted ? sortedStyles : defaultStyles}>
        {title}
        <OnboardingTooltip
          trigger={<YoutubeLogo className={styles.youtubeLogoTrigger} />}
          tooltipMessage={`${dataKey} | 1 min watch`}
        />
      </p>

      {/* <Icon name="info circle" className={styles.infoCircleTrigger} /> */}

      <div className={styles.sortIconGroup}>
        <Icon
          size="large"
          name="triangle up"
          className={isAscendingSorted ? styles.activeSort : styles.inActiveSort}
        />
        <Icon
          size="large"
          name="triangle down"
          className={isDescendingSorted ? styles.activeSort : styles.inActiveSort}
        />
      </div>
    </div>
  );
};

export default React.memo(HeaderSortCell);
