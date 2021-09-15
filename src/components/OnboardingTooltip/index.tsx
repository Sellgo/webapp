import React, { memo, SyntheticEvent } from 'react';
import { Icon, Popup } from 'semantic-ui-react';

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

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    window.open(youtubeLink, '_blank');
  };

  return (
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
  );
};

export default memo(OnboardingTooltip);
