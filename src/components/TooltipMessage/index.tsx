import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  tooltipMessage: string;
}

const TooltipMessage = (props: Props) => {
  const { tooltipMessage } = props;

  return <p className={styles.tooltipMessage}>{tooltipMessage}</p>;
};

export default memo(TooltipMessage);
