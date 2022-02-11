import React, { SyntheticEvent, useState } from 'react';
import { connect } from 'react-redux';
import { Popup, Modal } from 'semantic-ui-react';

/* Assets */
import { ReactComponent as YoutubeLogo } from '../../assets/images/youtubeLogo.svg';
import {
  FALLBACK_ONBOARDING_DETAILS,
  TABLE_SPECIAL_ONBOARDING_INDEX,
} from '../../constants/UserOnboarding';
import { getUserOnboardingResources } from '../../selectors/UserOnboarding';

/* Styling */
import styles from './index.module.scss';

interface Props {
  userOnboardingResources: any;
  tooltipKey: string;
  children: React.ReactNode;
}

const TooltipWrapper = (props: Props) => {
  const { userOnboardingResources, tooltipKey, children } = props;

  /* On Boarding Logic */
  const specialCellOnboardingDetails =
    userOnboardingResources[TABLE_SPECIAL_ONBOARDING_INDEX] || {};

  const { youtubeLink, tooltipText } =
    specialCellOnboardingDetails[tooltipKey] || FALLBACK_ONBOARDING_DETAILS;

  const [openEmbedModal, setOpenEmbedModal] = useState(false);
  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setOpenEmbedModal(true);
  };
  return (
    <>
      <Popup
        on="hover"
        className={styles.onboardingTooltipPopup}
        trigger={
          <span className={styles.trigger}>
            {children}
            {youtubeLink && <YoutubeLogo className={styles.youtubeLogo} onClick={handleClick} />}
          </span>
        }
        position="top center"
        content={<p className={styles.tooltipMessage}>{tooltipText}</p>}
      />

      {/* YOutube Embed Vidoes */}
      <Modal
        open={openEmbedModal}
        className={styles.youtubeEmbedModal}
        onClose={() => setOpenEmbedModal(false)}
        content={
          <div className={styles.youtubeEmbedContainer}>
            <iframe
              width="560"
              height="500"
              src={youtubeLink}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        }
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboardingResources: getUserOnboardingResources(state),
    sellerSubscription: state.subscription.sellerSubscription,
  };
};

export default connect(mapStateToProps)(TooltipWrapper);
