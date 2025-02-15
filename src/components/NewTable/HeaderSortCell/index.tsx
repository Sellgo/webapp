import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Component */
import OnboardingTooltip from '../../OnboardingTooltip';
import TooltipMessage from '../../TooltipMessage';

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
  disableSort?: boolean;
  disabled?: boolean;
  alignMiddle?: boolean;
  icon?: React.ReactNode;
}

const HeaderSortCell = (props: Props) => {
  const {
    title,
    dataKey,
    alignMiddle,
    currentSortColumn,
    currentSortType,
    userOnboarding,
    userOnboardingResources,
    disableSort,
    disabled,
    icon,
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
    <Popup
      on="hover"
      className={
        tooltipText && tooltipText.length > 0
          ? styles.onboardingTooltipPopup
          : styles.hideTooltipPopup
      }
      position="top center"
      hoverable
      trigger={
        <div
          className={`
          ${styles.headerCell}
          ${disabled ? styles.headerCell__disableSort : ''}
          ${alignMiddle ? styles.headerCell__alignMiddle : ''}
        `}
        >
          <p
            className={`
              ${styles.headerText} 
              ${disabled ? styles.headerText__disabled : ''}
              ${disableSort ? styles.headerText__disabledSort : ''}
              ${alignMiddle ? styles.headerText__alignMiddle : ''}
            `}
            style={isCurrentlySorted ? sortedStyles : defaultStyles}
          >
            {icon}
            <br />
            {title}

            {/* Youtube On boarding Icon */}
            {showTableKpiOnboarding && youtubeLink && (
              <OnboardingTooltip
                youtubeLink={youtubeLink}
                tooltipMessage={''}
                infoIconClassName={styles.infoCircleTrigger}
                youtubeIconClassName={styles.youtubeLogoTrigger}
              />
            )}
          </p>

          {!disableSort && (
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
          )}
        </div>
      }
      content={tooltipText && <TooltipMessage tooltipMessage={tooltipText} />}
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboarding: getUserOnboarding(state),
    userOnboardingResources: getUserOnboardingResources(state),
  };
};

export default connect(mapStateToProps)(HeaderSortCell);
