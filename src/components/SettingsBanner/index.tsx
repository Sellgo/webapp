import React from 'react';

/* Styling */
import styles from './index.module.scss';
import history from '../../history';

/* Assets */
import { ReactComponent as LeftArrow } from '../../assets/images/leftArrowLong.svg';

interface Props {
  title: string;
}

const SettingsBanner = (props: Props) => {
  const { title } = props;
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className={styles.editingOrderStatusBanner}>
      <button onClick={handleGoBack}>
        {' '}
        <LeftArrow /> Back to previous page
      </button>
      <p>{title}</p>
    </div>
  );
};

export default SettingsBanner;
