import React from 'react';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import { ReactComponent as YoutubeLogo } from '../../../assets/images/youtubeLogo.svg';

/* Component */
import OnboardingTooltip from '../../OnboardingTooltip';
import { getUserOnboarding, getUserOnboardingResources } from '../../../selectors/UserOnboarding';
import { connect } from 'react-redux';

/* Constants */
import {
  FALLBACK_TABLE_KPI_DETAILS,
  TABLE_KPI_ONBOARDING_INDEX,
} from '../../../constants/KeywordResearch/KeywordDatabase';

const sortedStyles = {
  color: '#3b4557',
  fontWeight: 600,
};

const defaultStyles = {
  color: '#95A1AC',
  fontWeight: 500,
};

interface Props {
  title: string;
  dataKey: string;
  currentSortColumn: string;
  currentSortType: 'asc' | 'desc' | undefined;
  userOnboarding: boolean;
  userOnboardingResources: any[];
}

/* Header cell, Adds a sort icon beside the heading. */
const HeaderSortCell = (props: Props) => {
  const {
    title,
    dataKey,
    currentSortColumn,
    currentSortType,
    userOnboarding,
    userOnboardingResources,
  } = props;

  /* Generating sort icon */
  const isCurrentlySorted = currentSortColumn === dataKey;
  const isAscendingSorted = currentSortType === 'asc' && isCurrentlySorted;
  const isDescendingSorted = currentSortType === 'desc' && isCurrentlySorted;

  const showOnboarding = userOnboarding && userOnboardingResources.length > 0;

  const tableKpiOnboardingDetails = userOnboardingResources[TABLE_KPI_ONBOARDING_INDEX] || {};

  const { youtubeLink, tooltipText } =
    tableKpiOnboardingDetails[dataKey] || FALLBACK_TABLE_KPI_DETAILS;

  return (
    <div className={styles.headerCell}>
      <p className={styles.headerText} style={isCurrentlySorted ? sortedStyles : defaultStyles}>
        {title}

        {/* Youtube On boarding Icon */}
        {showOnboarding && (youtubeLink || tooltipText) && (
          <OnboardingTooltip
            trigger={
              youtubeLink ? (
                <YoutubeLogo className={styles.youtubeLogoTrigger} />
              ) : (
                <Icon name="info circle" className={styles.infoCircleTrigger} />
              )
            }
            tooltipMessage={tooltipText}
          />
        )}
      </p>

      {/*  */}

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

const mapStateToProps = (state: any) => {
  return {
    userOnboarding: getUserOnboarding(state),
    userOnboardingResources: getUserOnboardingResources(state),
  };
};

export default connect(mapStateToProps)(HeaderSortCell);
