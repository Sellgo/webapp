import React from 'react';

/* Styling */
import styles from './index.module.scss';
import history from '../../../../history';

/* Assets */
import { ReactComponent as LeftArrow } from '../../../../assets/images/leftArrowLong.svg';

const EditingOrderStatusBanner = () => {
  const handleGoBack = () => {
    history.push('/aistock/order');
  };

  return (
    <div className={styles.editingOrderStatusBanner}>
      <button onClick={handleGoBack}>
        {' '}
        <LeftArrow /> Back to previous page
      </button>
      <p>CREATING/ EDITING ORDERS</p>
    </div>
  );
};

export default EditingOrderStatusBanner;
