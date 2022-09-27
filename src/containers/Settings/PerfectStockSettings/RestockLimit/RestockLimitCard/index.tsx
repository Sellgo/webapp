import React, { useState } from 'react';
import { Progress } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Constants */
import { formatCompletedDate } from '../../../../../utils/date';
import { getMarketplaceFlag } from '../../../../../constants/Settings';
import { numberWithCommas } from '../../../../../utils/format';

interface Props {
  restockLimit: any;
  setUpdatedRestockThresholds: (payload: any[]) => void;
  updatedRestockThresholds: any;
}

const RestockLimitCard = (props: Props) => {
  const { restockLimit, setUpdatedRestockThresholds, updatedRestockThresholds } = props;

  const [restockThreshold, setRestockThreshold] = useState(restockLimit?.restock_threshold || 0);

  const handleChange = (event: any) => {
    setRestockThreshold(event.target.value);

    const _updatedRestockThresholds = updatedRestockThresholds;

    if (!_updatedRestockThresholds.length) {
      _updatedRestockThresholds.push({
        id: restockLimit.id.toString(),
        restock_threshold: event.target.value,
      });
    } else {
      _updatedRestockThresholds.forEach((threshold: any, index: number) => {
        if (threshold.id === restockLimit.id.toString()) {
          threshold.restock_threshold = event.target.value;
          return;
        } else if (index === _updatedRestockThresholds.length - 1) {
          _updatedRestockThresholds.push({
            id: restockLimit.id.toString(),
            restock_threshold: event.target.value,
          });
          return;
        }
      });
    }

    setUpdatedRestockThresholds(_updatedRestockThresholds);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.titleContainer}>
        <h6 className={styles.title}>{restockLimit?.storage_type_name}</h6>
        <img
          src={getMarketplaceFlag(restockLimit?.marketplace_id)}
          alt={restockLimit?.storage_type_name}
        />
      </div>

      <div className={styles.progressContainer}>
        <Progress
          percent={
            restockLimit?.restock_utilization && restockLimit?.restock_threshold
              ? (restockLimit?.restock_utilization / restockLimit?.restock_threshold) * 100
              : 0
          }
          size="tiny"
          success={!restockLimit?.past_due ? true : false}
        >
          <div className={styles.progress}>
            {numberWithCommas(restockLimit?.restock_utilization || 0)} of{' '}
            {numberWithCommas(restockLimit?.restock_threshold || 0)}
          </div>
        </Progress>
      </div>

      <div className={styles.utilQuantity}>
        <div>Utilization Quantity</div>
        <div className={styles.value}>{restockLimit?.restock_utilization || 0}</div>
      </div>

      <div className={styles.utilQuantity}>
        <div>Maximum Inventory Level</div>
        <input
          className={`${styles.value} ${styles.restockThreshold} ${restockLimit?.past_due &&
            styles.pastDueInput}`}
          value={restockThreshold}
          onChange={handleChange}
        />
      </div>

      <div className={styles.utilQuantity}>
        <div>Maximum Shipment Quantity</div>
        <div className={styles.value}>
          {restockLimit?.restock_threshold && restockLimit?.restock_utilization
            ? restockLimit?.restock_threshold - restockLimit?.restock_utilization
            : 0}
        </div>
      </div>

      <div className={styles.utilQuantity}>
        <div className={styles.lastUpdateLabel}>Last update</div>
        <div className={restockLimit?.past_due && styles.pastDue}>
          {formatCompletedDate(restockLimit?.udate)}
        </div>
      </div>
    </div>
  );
};

export default RestockLimitCard;
