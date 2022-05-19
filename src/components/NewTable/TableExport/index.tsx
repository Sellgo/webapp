import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Loader, Icon, Popup, Modal } from 'semantic-ui-react';

/* Constants */
import {
  EXPORT_KEY,
  FALLBACK_ONBOARDING_DETAILS,
  TABLE_SPECIAL_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Interfaces */
import { SellerSubscription } from '../../../interfaces/Seller';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';
import UpgradeCTA from '../../UpgradeCTA';

/* Styling */
import styles from './index.module.scss';
import { DAILY_SUBSCRIPTION_PLANS } from '../../../constants/Subscription/Sellgo';

/* Assets */
import BanIcon from '../../../assets/images/banIcon.svg';

interface Props {
  loading?: boolean;
  label: string;
  exportContent: React.ReactNode;
  className?: string;
  userOnboarding: boolean;
  userOnboardingResources: any;
  onButtonClick?: () => void;
  disableExport?: boolean;
  sellerSubscription: SellerSubscription;
  hideCTA?: boolean;
  exportConfirmation?: React.ReactNode;
  isConfirmOpen?: boolean;
  setConfirmOpen?: (isOpen: boolean) => void;
}

const TableExport = (props: Props) => {
  const {
    loading,
    label,
    className,
    exportContent,
    userOnboarding,
    userOnboardingResources,
    disableExport,
    onButtonClick,
    sellerSubscription,
    hideCTA,
    exportConfirmation,
    isConfirmOpen,
    setConfirmOpen,
  } = props;

  const [openPopup, setOpenPopup] = useState(false);

  /* On Boarding Logic */
  const specialCellOnboardingDetails =
    userOnboardingResources[TABLE_SPECIAL_ONBOARDING_INDEX] || {};
  const showOnboarding = userOnboarding && Object.keys(specialCellOnboardingDetails).length > 0;

  const { youtubeLink, tooltipText } =
    specialCellOnboardingDetails[EXPORT_KEY] || FALLBACK_ONBOARDING_DETAILS;

  const isExportAllowed = !DAILY_SUBSCRIPTION_PLANS.includes(sellerSubscription.subscription_id);

  return (
    <div className={`${styles.exportButtonContainer} ${className}`}>
      <button
        className={`${styles.exportBtn}`}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          if (exportConfirmation && setConfirmOpen) {
            setConfirmOpen(true);
          } else {
            onButtonClick && onButtonClick();
          }
        }}
        disabled={disableExport || !isExportAllowed}
      >
        {isExportAllowed && !loading ? (
          <Icon name="download" className={styles.downloadIcon} />
        ) : isExportAllowed && loading ? (
          <div className={styles.loaderContainer}>
            <Loader active size="tiny" />
          </div>
        ) : (
          <img src={BanIcon} alt="ban-icon" className={styles.banIcon} />
        )}
        {label}
        {!isExportAllowed && !hideCTA && <UpgradeCTA type="Unlock" />}

        {/* Youtube On boarding Icon */}
        {showOnboarding && (youtubeLink || tooltipText) && (
          <OnboardingTooltip
            youtubeLink={youtubeLink}
            tooltipMessage={tooltipText}
            infoIconClassName={styles.infoCircle}
            youtubeIconClassName={styles.youtubeLogo}
          />
        )}
      </button>

      {isExportAllowed && (
        <Popup
          className={styles.exportPopup}
          on="click"
          position="bottom right"
          offset="-5"
          open={openPopup}
          onClose={() => setOpenPopup(false)}
          onOpen={e => {
            e.preventDefault();
            e.stopPropagation();
            setOpenPopup(true);
          }}
          trigger={
            <Icon
              name="angle down"
              className={styles.caretDownIcon}
              style={{ cursor: 'pointer' }}
            />
          }
          content={exportContent}
        />
      )}

      {exportConfirmation && setConfirmOpen && (
        <Modal
          open={isConfirmOpen}
          className={styles.exportConfirmationModal}
          content={exportConfirmation}
          onClose={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboarding: getUserOnboarding(state),
    userOnboardingResources: getUserOnboardingResources(state),
    sellerSubscription: state.subscription.sellerSubscription,
  };
};

export default connect(mapStateToProps)(TableExport);
