import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { OFFSET_TO_CHART_WIDTH } from '../../../../constants/PerfectStock/OrderPlanning';
import { getDraftOrderInformation } from '../../../../selectors/PerfectStock/OrderPlanning';
import { DraftOrderInformation } from '../../../../interfaces/PerfectStock/OrderPlanning';
import { formatNumber, showNAIfZeroOrNull } from '../../../../utils/format';
interface Props {
  draftOrderInformation: DraftOrderInformation;
}

const OrderSummary = (props: Props) => {
  const { draftOrderInformation } = props;

  let totalUnits = 0;
  let totalCartons = 0;
  let costPerUnit = 0;
  let totalCost = 0;
  draftOrderInformation.merchant_listings?.forEach(merchantListing => {
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

  if (!draftOrderInformation.id) {
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
        {draftOrderInformation.number} (Draft)
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
    draftOrderInformation: getDraftOrderInformation(state),
  };
};

export default connect(mapStateToProps)(OrderSummary);
