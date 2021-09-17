import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Component */
import OnboardingTooltip from '../../OnboardingTooltip';

/* Constants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  TABLE_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

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

  /* ====================================================== */
  // maybe needs refactor later into better version
  /* ================== USER ONBOARDING LOGIC  ============ */
  /* ====================================================== */

  const tableKpiOnboardingDetails = userOnboardingResources[TABLE_KPI_ONBOARDING_INDEX] || {};
  const showTableKpiOnboarding =
    userOnboarding && Object.keys(tableKpiOnboardingDetails).length > 0;

  const { youtubeLink, tooltipText } =
    tableKpiOnboardingDetails[dataKey] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <div className={styles.headerCell}>
      <p className={styles.headerText} style={isCurrentlySorted ? sortedStyles : defaultStyles}>
        {title}

        {/* Youtube On boarding Icon */}
        {showTableKpiOnboarding && (youtubeLink || tooltipText) && (
          <OnboardingTooltip
            youtubeLink={youtubeLink}
            tooltipMessage={tooltipText}
            infoIconClassName={styles.infoCircleTrigger}
            youtubeIconClassName={styles.youtubeLogoTrigger}
          />
        )}
      </p>

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
