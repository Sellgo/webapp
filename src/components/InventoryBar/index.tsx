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
    fillColor = '#2680EB';
  } else {
    fillColor = '#E68619';
  }
  const firstBarHeight = Math.max((percent / 0.2) * 100, 0);
  const secondBarHeight = Math.max(((percent - 0.2) / 0.2) * 100, 0);
  const thirdBarHeight = Math.max(((percent - 0.4) / 0.2) * 100, 0);
  const fourthBarHeight = Math.max(((percent - 0.6) / 0.2) * 100, 0);
  const fifthBarHeight = Math.max(((percent - 0.8) / 0.2) * 100, 0);

  return (
    <span className={styles.inventoryBarWrapper}>
      <span className={styles.bar}>
        <span
          className={styles.barFill}
          style={{
            height: `${fifthBarHeight}%`,
            background: fillColor,
          }}
        />
      </span>
      <span className={styles.bar}>
        <span
          className={styles.barFill}
          style={{
            height: `${fourthBarHeight}%`,
            background: fillColor,
          }}
        />
      </span>
      <span className={styles.bar}>
        <span
          className={styles.barFill}
          style={{
            height: `${thirdBarHeight}%`,
            background: fillColor,
          }}
        />
      </span>
      <span className={styles.bar}>
        <span
          className={styles.barFill}
          style={{
            height: `${secondBarHeight}%`,
            background: fillColor,
          }}
        />
      </span>
      <span className={styles.bar}>
        <span
          className={styles.barFill}
          style={{
            height: `${firstBarHeight}%`,
            background: fillColor,
          }}
        />
      </span>
    </span>
  );
};

export default InventoryBar;
