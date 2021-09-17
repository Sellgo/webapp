import React, { memo, SyntheticEvent, useState } from 'react';
import { Icon, Popup, Modal } from 'semantic-ui-react';

/* Assets */
import { ReactComponent as YoutubeLogo } from '../../assets/images/youtubeLogo.svg';

/* Styling */
import styles from './index.module.scss';

interface Props {
  tooltipMessage: string;
  youtubeLink: string;
  youtubeIconClassName: string;
  infoIconClassName: string;
}

const OnboardingTooltip = (props: Props) => {
  const { tooltipMessage, youtubeLink, youtubeIconClassName, infoIconClassName } = props;

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
          youtubeLink ? (
            <YoutubeLogo className={youtubeIconClassName} onClick={handleClick} />
          ) : (
            <Icon name="info circle" className={infoIconClassName} />
          )
        }
        content={<p className={styles.tooltipMessage}>{tooltipMessage}</p>}
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

export default memo(OnboardingTooltip);
