import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { OFFSET_TO_CHART_WIDTH } from '../../../../constants/PerfectStock/OrderPlanning';
import { getActivePurchaseOrder } from '../../../../selectors/PerfectStock/OrderPlanning';
import { PurchaseOrder } from '../../../../interfaces/PerfectStock/OrderPlanning';
import { formatNumber, showNAIfZeroOrNull } from '../../../../utils/format';

interface Props {
  activeOrder: PurchaseOrder;
}

const OrderSummary = (props: Props) => {
  const { activeOrder } = props;
  let totalUnits = 0;
  let totalCartons = 0;
  let costPerUnit = 0;
  let totalCost = 0;
  activeOrder.merchant_listings?.forEach(merchantListing => {
    /* Predictive mode, with valid quantity */
    if (merchantListing.quantity_mode === 'predictive' && merchantListing.quantity) {
      totalUnits += merchantListing.quantity;

      /* Manual mode, with manual quantity inputted before */
    } else if (merchantListing.quantity_mode !== 'predictive' && merchantListing.manual_quantity) {
      totalUnits += merchantListing.manual_quantity;

      /* Manual mode, with no manual quantity inputted before */
    } else if (merchantListing.quantity_mode !== 'predictive' && merchantListing.quantity) {
      totalUnits += merchantListing.quantity;
    }

    if (merchantListing.carton_count) {
      totalCartons += merchantListing.carton_count;
    }

    if (merchantListing.unit_cost) {
      costPerUnit += merchantListing.product_cost;
    }

    if (merchantListing.total_cost) {
      totalCost += merchantListing.total_cost;
    }
  });

  if (!activeOrder.id || activeOrder.id === -1) {
    return null;
  }

  return (
    <div className={styles.orderSummaryWrapper}>
      <div
        className={styles.orderName}
        style={{
          width: OFFSET_TO_CHART_WIDTH,
        }}
      >
        <span>TOTAL</span>
        {activeOrder.number} (EDIT)
      </div>
      <div className={styles.statWrapper}>
        <span className={styles.statHeader}>Total Units</span>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(totalUnits, formatNumber(totalUnits))}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <span className={styles.statHeader}>Cartons</span>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(totalCartons, formatNumber(totalCartons))}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <span className={styles.statHeader}>Cost per unit</span>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(costPerUnit, formatNumber(costPerUnit))}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <span className={styles.statHeader}>Total cost</span>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(totalCost, formatNumber(totalCost))}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    activeOrder: getActivePurchaseOrder(state),
  };
};

export default connect(mapStateToProps)(OrderSummary);
