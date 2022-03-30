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
import {
  PurchaseOrder,
  UpdatePurchaseOrderPayload,
} from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { formatNumber, showNAIfZeroOrNull, formatDecimal } from '../../../../utils/format';

/* Components */
import TooltipWrapper from '../../../../components/TooltipWrapper';
import { ReactComponent as CalculatorIcon } from '../../../../assets/images/calculator-regular-rainbow.svg';

/* Actions */
import { updatePurchaseOrder } from '../../../../actions/PerfectStock/OrderPlanning';

interface Props {
  activeOrder: PurchaseOrder;
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) => void;
  inventoryTableResults: any[];
}

const OrderSummary = (props: Props) => {
  const { activeOrder, inventoryTableResults, updatePurchaseOrder } = props;

  const handleAutoCalculateShipping = () => {
    updatePurchaseOrder({
      id: activeOrder.id,
      estimate_shipping_cost: true,
    });
  };

  let totalUnits = 0;
  let totalCartons = 0;
  // let totalOverstock = 0;
  // let costPerUnit = 0;
  // let shippingPerUnit = 0;
  // let costPlusShippingPerUnit = 0;
  let totalCost = 0;
  let totalCbm = 0;
  let totalCft = 0;
  let totalWeightKg = 0;
  let totalWeightLbs = 0;
  let totalShippingCost = 0;
  let totalCostWithShipping = 0;
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
    if (merchantListing.total_carton) {
      totalCartons += merchantListing.total_carton;
    }

    /* Cost per unit */
    // if (merchantListing.product_cost) {
    //   costPerUnit += parseFloat(merchantListing.product_cost);
    // }

    /* Overstock */
    // if (merchantListing.overstock_quantity) {
    //   totalOverstock += merchantListing.overstock_quantity;
    // }

    /* Shipping per unit */
    // if (merchantListing.shipping_cost_per_unit) {
    //   shippingPerUnit += merchantListing.shipping_cost_per_unit;
    // }

    /* Cost + Shipping per unit */
    // if (merchantListing.cost_plus_shipping_per_unit) {
    //   costPlusShippingPerUnit += merchantListing.cost_plus_shipping_per_unit;
    // }

    /* Total cost */
    if (merchantListing.total_cost) {
      totalCost += merchantListing.total_cost;
    }

    /* Total cbm */
    if (merchantListing.total_cbm) {
      totalCbm += merchantListing.total_cbm;
    }

    /* Total cft */
    if (merchantListing.total_cft) {
      totalCft += merchantListing.total_cft;
    }

    /* Total weight kg */
    if (merchantListing.total_weight_kg) {
      totalWeightKg += merchantListing.total_weight_kg;
    }

    /* Total weight Lbs */
    if (merchantListing.total_weight_lbs) {
      totalWeightLbs += merchantListing.total_weight_lbs;
    }

    /* Shipping cost */
    if (merchantListing.total_shipping_cost) {
      totalShippingCost += merchantListing.total_shipping_cost;
    }

    /* Total cost with shipping */
    if (merchantListing.total_cost_plus_shipping) {
      totalCostWithShipping += merchantListing.total_cost_plus_shipping;
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
          minWidth: OFFSET_TO_CHART_WIDTH - 112,
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
        <TooltipWrapper tooltipKey="Total Carton Volume">
          <span className={styles.statHeader}>Total Volume</span>
        </TooltipWrapper>
        <span className={`${styles.stat} ${styles.stat__double}`}>
          {showNAIfZeroOrNull(totalCbm, `${formatDecimal(totalCbm)} m3`)}
        </span>
        <span className={`${styles.stat} ${styles.stat__double}`}>
          {showNAIfZeroOrNull(totalCft, `${formatDecimal(totalCft)} ft2`)}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Total Carton Gross Weight">
          <span className={styles.statHeader}>Total Gross Weight</span>
        </TooltipWrapper>
        <span className={`${styles.stat} ${styles.stat__double}`}>
          {showNAIfZeroOrNull(totalWeightKg, `${formatDecimal(totalWeightKg)} kg`)}
        </span>
        <span className={`${styles.stat} ${styles.stat__double}`}>
          {showNAIfZeroOrNull(totalWeightLbs, `${formatDecimal(totalWeightLbs)} lbs`)}
        </span>
      </div>
      {/* <div className={styles.statWrapper}>
        <span className={styles.statHeader}>Cost per unit</span>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(costPerUnit, `$${formatDecimal(costPerUnit)}`)}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <span className={styles.statHeader}>Est. Shipping/ Unit</span>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(shippingPerUnit, `$${formatDecimal(shippingPerUnit)}`)}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <span className={styles.statHeader}>Cost + Shipping Per Unit</span>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(
            costPlusShippingPerUnit,
            `$${formatDecimal(costPlusShippingPerUnit)}`
          )}
        </span>
      </div> */}
      <div className={`${styles.statWrapper}`} />
      <div className={`${styles.statWrapper} ${styles.statWrapper_borderless}`} />
      <div className={`${styles.statWrapper} ${styles.statWrapper_borderless}`} />
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Total Cost w/o Shipping">
          <span className={styles.statHeader}>Total cost w/o Shipping</span>
        </TooltipWrapper>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(totalCost, `$${formatDecimal(totalCost)}`)}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Estimated Shipping Cost">
          <span className={styles.statHeader}>Estimated Shipping Cost</span>
        </TooltipWrapper>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(totalShippingCost, `$${formatDecimal(totalShippingCost)}`)}
          &nbsp;
          <CalculatorIcon onClick={handleAutoCalculateShipping} />
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Total Cost with Shipping">
          <span className={styles.statHeader}>Total cost with Shipping</span>
        </TooltipWrapper>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(totalCostWithShipping, `$${formatDecimal(totalCostWithShipping)}`)}
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

const mapDispatchToProps = (dispatch: any) => ({
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) =>
    dispatch(updatePurchaseOrder(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
