import React, { memo, SyntheticEvent, useState } from 'react';
import { Modal } from 'semantic-ui-react';

/* Assets */
import { ReactComponent as YoutubeLogo } from '../../assets/images/youtubeLogo.svg';

/* Styling */
import styles from './index.module.scss';

interface Props {
  displayMessage: string;
  youtubeLink: string;
  youtubeIconClassName?: string;
  className?: string;
  isNew?: boolean;
}

const OnboardingTooltip = (props: Props) => {
  const { displayMessage, youtubeLink, youtubeIconClassName, className, isNew } = props;

  const [openEmbedModal, setOpenEmbedModal] = useState(false);
  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setOpenEmbedModal(true);
  };

  return (
    <>
      <div onClick={handleClick} className={`${styles.onboardingButton} ${className}`}>
        <YoutubeLogo className={youtubeIconClassName} onClick={handleClick} />
        <p className={styles.displayMessage}> {displayMessage} </p>
        {isNew && <p className={styles.new}>New</p>}
      </div>

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
