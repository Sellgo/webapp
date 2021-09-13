import React from 'react';
import { Popup } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  trigger: React.ReactNode;
  tooltipMessage: string;
}

const OnboardingTooltip = (props: Props) => {
  const { trigger, tooltipMessage } = props;

  return (
    <Popup
      className={styles.onboardingTooltipPopup}
      trigger={trigger}
      content={<p className={styles.tooltipMessage}>{tooltipMessage}</p>}
    />
  );
};

export default OnboardingTooltip;
