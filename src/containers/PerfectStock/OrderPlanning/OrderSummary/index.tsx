import React, { useState } from 'react';
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
import { getSellerSubscription } from '../../../../selectors/Subscription';

/* Interfaces */
import {
  PurchaseOrder,
  UpdatePurchaseOrderPayload,
} from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import {
  formatNumber,
  showNAIfZeroOrNull,
  formatDecimal,
  printShortDate,
} from '../../../../utils/format';
import { isSubscriptionIdFreeTrial } from '../../../../utils/subscriptions';
import history from '../../../../history';

/* Components */
import TooltipWrapper from '../../../../components/TooltipWrapper';
import { ReactComponent as CalculatorIcon } from '../../../../assets/images/calculator-regular-rainbow.svg';
import AlertModal from '../../../../components/AlertModal';

/* Actions */
import { updatePurchaseOrder } from '../../../../actions/PerfectStock/OrderPlanning';
import { SellerSubscription } from '../../../../interfaces/Seller';

interface Props {
  activeOrder: PurchaseOrder;
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) => void;
  inventoryTableResults: any[];
  sellerSubscription: SellerSubscription;
}

const OrderSummary = (props: Props) => {
  const { activeOrder, inventoryTableResults, updatePurchaseOrder, sellerSubscription } = props;
  const [isAlertModalOpened, setIsAlertModalOpened] = useState<boolean>(false);

  const handleAutoCalculateShipping = () => {
    updatePurchaseOrder({
      id: activeOrder.id,
      estimate_shipping_cost: true,
    });
  };

  let totalUnits = 0;
  let totalCartons = 0;
  let totalDuty = 0;
  let totalCost = 0;
  let totalCbm = 0;
  let totalCft = 0;
  let totalWeightKg = 0;
  let totalWeightLbs = 0;
  let totalShippingCost = 0;
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

    /* Duty Tax */
    if (merchantListing.product_cost) {
      totalDuty += parseFloat(merchantListing.duty);
    }

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
  });

  if (!activeOrder.id || activeOrder.id === -1) {
    return null;
  }

  const isFreeTrial = isSubscriptionIdFreeTrial(sellerSubscription?.subscription_id);

  const handleBlurClick = () => {
    if (isFreeTrial) {
      setIsAlertModalOpened(true);
    }
  };

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
          <span className={styles.statHeader}>
            Total <br /> Cartons
          </span>
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
        <TooltipWrapper tooltipKey="Total Carton Gross Weight">
          <span className={styles.statHeader}>
            Total <br />
            Gross Weight
          </span>
        </TooltipWrapper>
        <span className={`${styles.stat} ${styles.stat__double}`}>
          {showNAIfZeroOrNull(totalWeightKg, `${formatDecimal(totalWeightKg)} kg`)}
        </span>
        <span className={`${styles.stat} ${styles.stat__double}`}>
          {showNAIfZeroOrNull(totalWeightLbs, `${formatDecimal(totalWeightLbs)} lbs`)}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Total COGS w/o Shipping">
          <span className={styles.statHeader}>
            Total COGS <br />
            w/o Shipping
          </span>
        </TooltipWrapper>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(totalCost, `$${formatDecimal(totalCost)}`)}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Deposit">
          <span className={`${styles.statHeader}`}>Deposit</span>
        </TooltipWrapper>
        {activeOrder.deposit_date && (
          <span
            className={`${styles.date} ${isFreeTrial && styles.dateBlur}`}
            onClick={() => handleBlurClick()}
          >
            ETA {printShortDate(new Date(activeOrder.deposit_date))}
          </span>
        )}
        <span
          className={`${styles.stat} ${isFreeTrial && styles.textBlur}`}
          onClick={() => handleBlurClick()}
        >
          {showNAIfZeroOrNull(
            activeOrder.deposit_amount,
            `$${formatDecimal(activeOrder.deposit_amount)}`
          )}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Mid Pay">
          <span className={styles.statHeader}>Mid Pay</span>
        </TooltipWrapper>
        {activeOrder.mid_pay_date && (
          <span
            className={`${styles.date} ${isFreeTrial && styles.dateBlur}`}
            onClick={() => handleBlurClick()}
          >
            ETA {printShortDate(new Date(activeOrder.mid_pay_date))}
          </span>
        )}
        <span
          className={`${styles.stat} ${isFreeTrial && styles.textBlur}`}
          onClick={() => handleBlurClick()}
        >
          {showNAIfZeroOrNull(
            activeOrder.mid_pay_amount,
            `$${formatDecimal(activeOrder.mid_pay_amount)}`
          )}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Paid In Full">
          <span className={styles.statHeader}>Paid In Full</span>
        </TooltipWrapper>
        {activeOrder.paid_full_date && (
          <span
            className={`${styles.date} ${isFreeTrial && styles.dateBlur}`}
            onClick={() => handleBlurClick()}
          >
            ETA {printShortDate(new Date(activeOrder.paid_full_date))}
          </span>
        )}
        <span
          className={`${styles.stat} ${isFreeTrial && styles.textBlur}`}
          onClick={() => handleBlurClick()}
        >
          {showNAIfZeroOrNull(
            activeOrder.paid_full_amount,
            `$${formatDecimal(activeOrder.paid_full_amount)}`
          )}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Estimated Shipping Cost">
          <span className={styles.statHeader}>
            Estimated <br />
            Shipping
          </span>
        </TooltipWrapper>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(totalShippingCost, `$${formatDecimal(totalShippingCost)}`)}
          &nbsp;
          <CalculatorIcon onClick={handleAutoCalculateShipping} />
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Duty Tax">
          <span className={styles.statHeader}>Duty Tax</span>
        </TooltipWrapper>
        <span className={styles.stat}>
          {showNAIfZeroOrNull(totalDuty, `$${formatDecimal(totalDuty)}`)}
        </span>
      </div>
      <div className={styles.statWrapper}>
        <TooltipWrapper tooltipKey="Total Import Cost">
          <span className={styles.statHeader}>Total Import Cost</span>
        </TooltipWrapper>
        {activeOrder.import_duties_date && (
          <span className={styles.date}>
            ETA {printShortDate(new Date(activeOrder.import_duties_date))}
          </span>
        )}
        <span className={styles.stat}>
          {showNAIfZeroOrNull(
            activeOrder.total_import_cost,
            `$${formatDecimal(activeOrder.total_import_cost)}`
          )}
        </span>
      </div>
      <AlertModal
        isOpen={isAlertModalOpened}
        title={'You discovered a Premium feature!'}
        text={'With AiStock paid plan, you can create as many orders as you want'}
        cancelText={'Dismiss'}
        saveText={'Learn More'}
        setIsOpen={(value: boolean) => setIsAlertModalOpened(value)}
        handleCancel={() => setIsAlertModalOpened(false)}
        handleSave={() => history.push({ pathname: '/settings/pricing' })}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    inventoryTableResults: getInventoryTableResults(state),
    activeOrder: getActivePurchaseOrder(state),
    sellerSubscription: getSellerSubscription(state),
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) =>
    dispatch(updatePurchaseOrder(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
