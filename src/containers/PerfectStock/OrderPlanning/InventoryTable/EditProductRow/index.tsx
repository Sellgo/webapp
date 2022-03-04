import React from 'react';
import { formatNumber, showNAIfZeroOrNull } from '../../../../../utils/format';

/* Styling */
import styles from './index.module.scss';

/* Components */
import StatBox from './StatBox';

interface Props {
  rowData: any;
  hideDaysUntilStockout?: boolean;
}

const EditProductRow = (props: Props) => {
  const { rowData, hideDaysUntilStockout } = props;
  const daysToStockOut = showNAIfZeroOrNull(
    rowData.days_until_so,
    formatNumber(rowData.days_until_so)
  );

  const stockOutDate = new Date();
  stockOutDate.setTime(stockOutDate.getTime() + daysToStockOut * 24 * 60 * 60 * 1000);
  return (
    <div className={styles.editProductRow}>
      {!hideDaysUntilStockout && (
        <div className={styles.daysUntilStockout}>
          <p className={styles.stockoutDate}>
            <span>Days until Stockout</span>
            {stockOutDate.toLocaleDateString() !== 'Invalid Date'
              ? stockOutDate.toLocaleDateString()
              : ''}
          </p>
          <p className={styles.stockoutNumber}>{daysToStockOut}</p>
        </div>
      )}
      <StatBox title={'MOQ'} stat={rowData.moq} />
      <StatBox title={'Cartons'} stat={rowData.carton_count} />
      <StatBox
        title={'Volume'}
        stat={rowData.total_cbm}
        secondStat={rowData.total_cft || 0}
        append="m3"
        secondAppend="ft3"
      />
      <StatBox
        title={'Gross Weight'}
        stat={rowData.total_weight_kg}
        secondStat={rowData.total_weight_lbs || 0}
        append="kg"
        secondAppend="lbs"
        asFloat
      />
      <StatBox title={'Cost Per Unit'} stat={rowData.product_cost} prepend="$" asFloat />
      <StatBox
        title={'Est. Shipping/ Unit'}
        stat={rowData.shipping_cost_per_unit}
        prepend="$"
        asFloat
      />
      <StatBox
        title={'Cost + Shipping Per Unit'}
        stat={rowData.cost_plus_shipping_per_unit}
        asFloat
        prepend="$"
      />
      <StatBox title={'Total Cost'} stat={rowData.total_cost} prepend="$" asFloat />
      <StatBox
        title={'Est. Shipping Cost'}
        stat={rowData.total_shipping_cost}
        prepend="$"
        asFloat
      />
      <StatBox
        title={'Total Cost with Shipping'}
        stat={rowData.total_cost_plus_shipping}
        prepend="$"
        asFloat
      />
    </div>
  );
};

export default EditProductRow;
