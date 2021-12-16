import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  percent: number;
}

const InventoryBar = (props: Props) => {
  const { percent } = props;

  let fillColor;
  if (percent <= 0.25) {
    fillColor = '#EB675E';
  } else if (percent <= 0.75) {
    fillColor = '#45A5F9';
  } else {
    fillColor = '#FEDA83';
  }
  const firstBarHeight = Math.max((percent / 0.2) * 100, 0);
  const secondBarHeight = Math.max(((percent - 0.2) / 0.2) * 100, 0);
  const thirdBarHeight = Math.max(((percent - 0.4) / 0.2) * 100, 0);
  const fourthBarHeight = Math.max(((percent - 0.6) / 0.2) * 100, 0);
  const fifthBarHeight = Math.max(((percent - 0.8) / 0.2) * 100, 0);

  return (
    <div className={styles.inventoryBarWrapper}>
      <div className={styles.bar}>
        <div
          className={styles.barFill}
          style={{
            height: `${fifthBarHeight}%`,
            background: fillColor,
          }}
        />
      </div>
      <div className={styles.bar}>
        <div
          className={styles.barFill}
          style={{
            height: `${fourthBarHeight}%`,
            background: fillColor,
          }}
        />
      </div>
      <div className={styles.bar}>
        <div
          className={styles.barFill}
          style={{
            height: `${thirdBarHeight}%`,
            background: fillColor,
          }}
        />
      </div>
      <div className={styles.bar}>
        <div
          className={styles.barFill}
          style={{
            height: `${secondBarHeight}%`,
            background: fillColor,
          }}
        />
      </div>
      <div className={styles.bar}>
        <div
          className={styles.barFill}
          style={{
            height: `${firstBarHeight}%`,
            background: fillColor,
          }}
        />
      </div>
    </div>
  );
};

export default InventoryBar;
