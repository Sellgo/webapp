import React from 'react';

/* Styling */
import styles from './index.module.scss';
import history from '../../history';

/* Assets */
import { ReactComponent as LeftArrow } from '../../assets/images/leftArrowLong.svg';

interface Props {
  title: string;
  bannerColor?: string;
  textColor?: string;
  backUrl?: string;
}

const SettingsBanner = (props: Props) => {
  const { title, bannerColor, textColor, backUrl } = props;
  const handleGoBack = () => {
    if (backUrl) {
      history.push(backUrl);
    } else {
      history.goBack();
    }
  };

  return (
    <div className={styles.editingOrderStatusBanner} style={{ background: bannerColor }}>
      <button onClick={handleGoBack} style={{ color: textColor }}>
        {' '}
        <LeftArrow className={textColor === '#fff' ? styles.whiteIcon : ''} /> Back to previous page
      </button>
      <p style={{ color: textColor }}>{title}</p>
    </div>
  );
};

export default SettingsBanner;
