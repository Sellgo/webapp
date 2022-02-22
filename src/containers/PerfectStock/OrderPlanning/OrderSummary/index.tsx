import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { OFFSET_TO_CHART_WIDTH } from '../../../../constants/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getActivePurchaseOrder,
  getInventoryTableResults,
} from '../../../../selectors/PerfectStock/OrderPlanning';

/* Interfaces */
import { PurchaseOrder } from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { formatNumber, showNAIfZeroOrNull, formatDecimal } from '../../../../utils/format';

/* Components */
import TooltipWrapper from '../../../../components/TooltipWrapper';

interface Props {
  activeOrder: PurchaseOrder;
  inventoryTableResults: any[];
}

const OrderSummary = (props: Props) => {
  const { activeOrder, inventoryTableResults } = props;
  let totalUnits = 0;
  let totalCartons = 0;
  let costPerUnit = 0;
  let totalCost = 0;
  let totalCbm = 0;
  let totalCft = 0;
  let totalWeightKg = 0;
  let totalWeightLbs = 0;
  inventoryTableResults.forEach(merchantListing => {
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

    /* Cartons */
    if (merchantListing.carton_count) {
      totalCartons += merchantListing.carton_count;
    }

    /* Cost per unit */
    if (merchantListing.unit_cost) {
      costPerUnit += merchantListing.product_cost;
    }

    /* Total cost */
    if (merchantListing.total_cost) {
      totalCost += merchantListing.total_cost;
    }

    /* Total cbm */
    if (merchantListing.cbm) {
      totalCbm += merchantListing.cbm;
    }

    /* Total cft */
    if (merchantListing.cft) {
      totalCft += merchantListing.cft;
    }

    /* Total weight kg */
    if (merchantListing.weigth_kg) {
      totalWeightKg += merchantListing.weigth_kg;
    }

    /* Total weight Lbs */
    if (merchantListing.weigth_lbs) {
      totalWeightLbs += merchantListing.weigth_lbs;
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
        <TooltipWrapper tooltipKey="Total Units">
          <span className={styles.statHeader}>Total Units</span>
        </TooltipWrapper>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(totalUnits, formatNumber(totalUnits))}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Total Cartons">
          <span className={styles.statHeader}>Cartons</span>
        </TooltipWrapper>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(totalCartons, formatNumber(totalCartons))}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Total CBM">
          <span className={styles.statHeader}>Total CBM</span>
        </TooltipWrapper>
        <span className={`${styles.stat} ${styles.stat__double}`}>
          {showNAIfZeroOrNull(totalCbm, `${formatDecimal(totalCbm)} m3`)}
        </span>
        <span className={`${styles.stat} ${styles.stat__double}`}>
          {showNAIfZeroOrNull(totalCft, `${formatDecimal(totalCft)} ft2`)}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Total Gross Weight">
          <span className={styles.statHeader}>Total Gross Weight</span>
        </TooltipWrapper>
        <span className={`${styles.stat} ${styles.stat__double}`}>
          {showNAIfZeroOrNull(totalWeightKg, `${formatDecimal(totalWeightKg)} kg`)}
        </span>
        <span className={`${styles.stat} ${styles.stat__double}`}>
          {showNAIfZeroOrNull(totalWeightLbs, `${formatDecimal(totalWeightLbs)} lbs`)}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <span className={styles.statHeader}>Cost per unit</span>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(costPerUnit, `$${formatDecimal(costPerUnit)}`)}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Total Cost with Shipping">
          <span className={styles.statHeader}>Total cost</span>
        </TooltipWrapper>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(totalCost, `$${formatDecimal(totalCost)}`)}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    inventoryTableResults: getInventoryTableResults(state),
    activeOrder: getActivePurchaseOrder(state),
  };
};

export default connect(mapStateToProps)(OrderSummary);
