import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  text: string;
  hideOnDesktop?: boolean;
}

const TopBanner = (props: Props) => {
  const { text, hideOnDesktop } = props;

  return <p className={`${styles.topBanner} ${hideOnDesktop && styles.hideOnDesktop}`}>{text}</p>;
};

export default memo(TopBanner);
