import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BoxHeader from '../../../../../components/BoxHeader';
import BoxContainer from '../../../../../components/BoxContainer';

interface Props {
  className?: string;
}

const InventorySkuStatus = (props: Props) => {
  const { className } = props;

  return (
    <div className={`${styles.expandedProductSettings} ${className}`}>
      <BoxHeader className={styles.settingsBoxHeader}>Calculation Variables</BoxHeader>
      <BoxContainer className={styles.settingsBoxContainer}>
        <div className={styles.settingWrapper}>
          <p className={styles.settingsTitle}> Sales Calendar </p>
          <div className={styles.settingToggleWrapper}>
            <h1> hi </h1>
          </div>
        </div>
      </BoxContainer>
    </div>
  );
};

export default InventorySkuStatus;
