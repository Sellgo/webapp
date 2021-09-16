import React from 'react';
import { connect } from 'react-redux';
import { Icon, Popup } from 'semantic-ui-react';

/* Constants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  TABLE_SPECIAL_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

/* Styling */
import styles from './index.module.scss';

interface Props {
  label: string;
  exportContent: React.ReactNode;
  className?: string;
  userOnboarding: boolean;
  userOnboardingResources: any;
}

const TableExport = (props: Props) => {
  const { label, className, exportContent, userOnboarding, userOnboardingResources } = props;

  /* On Boarding Logic */
  const specialCellOnboardingDetails =
    userOnboardingResources[TABLE_SPECIAL_ONBOARDING_INDEX] || {};
  const showOnboarding = userOnboarding && Object.keys(specialCellOnboardingDetails).length > 0;

  const { youtubeLink, tooltipText } =
    specialCellOnboardingDetails[label] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <div className={`${styles.exportButtonContainer} ${className}`}>
      <p className={styles.exportLabel}>
        <Icon name="download" className={styles.downloadIcon} />
        {label}

        {/* Youtube On boarding Icon */}
        {showOnboarding && (youtubeLink || tooltipText) && (
          <OnboardingTooltip
            youtubeLink={youtubeLink}
            tooltipMessage={tooltipText}
            infoIconClassName={styles.infoCircle}
            youtubeIconClassName={styles.youtubeLogo}
          />
        )}
      </p>

      <Popup
        className={styles.exportPopup}
        on="click"
        position="bottom right"
        offset="-5"
        trigger={
          <Icon name="angle down" className={styles.caretDownIcon} style={{ cursor: 'pointer' }} />
        }
        content={exportContent}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboarding: getUserOnboarding(state),
    userOnboardingResources: getUserOnboardingResources(state),
  };
};

export default connect(mapStateToProps)(TableExport);
