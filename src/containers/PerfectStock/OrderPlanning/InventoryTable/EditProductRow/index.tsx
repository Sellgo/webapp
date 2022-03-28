import React from 'react';
import { connect } from 'react-redux';
import { updatePurchaseOrder } from '../../../../../actions/PerfectStock/OrderPlanning';
import { UpdatePurchaseOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';
import { formatNumber, showNAIfZeroOrNull } from '../../../../../utils/format';

/* Styling */
import styles from './index.module.scss';

/* Components */
import StatBox from './StatBox';

interface Props {
  orderId: number;
  rowData: any;
  hideDaysUntilStockout?: boolean;
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) => void;
}

const EditProductRow = (props: Props) => {
  const { rowData, hideDaysUntilStockout, updatePurchaseOrder, orderId } = props;
  const daysToStockOut = showNAIfZeroOrNull(
    rowData.days_until_so,
    formatNumber(rowData.days_until_so)
  );

  const updateInventorySku = async (shippingCost: string) => {
    shippingCost = shippingCost.replace(',', '');
    const id = orderId;
    updatePurchaseOrder({
      id,
      po_sku_id: rowData.id,
      total_shipping_cost: parseFloat(shippingCost),
    });
  };

  const handleAutoCalculate = async () => {
    const id = orderId;
    updatePurchaseOrder({
      id,
      po_sku_id: rowData.id,
      estimate_shipping_cost: true,
    });
  };

  const stockOutDate = new Date();
  stockOutDate.setTime(stockOutDate.getTime() + daysToStockOut * 24 * 60 * 60 * 1000);
  return (
    <div className={styles.editProductRow}>
      {!hideDaysUntilStockout ? (
        <div className={styles.daysUntilStockout}>
          <p className={styles.stockoutDate}>
            <span>Days until Stockout</span>
            {stockOutDate.toLocaleDateString() !== 'Invalid Date'
              ? stockOutDate.toLocaleDateString()
              : ''}
          </p>
          <p className={styles.stockoutNumber}>{daysToStockOut}</p>
        </div>
      ) : (
        <div className={styles.emptyStatBox} />
      )}
      <StatBox title={'Overstock'} stat={rowData.overstock_quantity} asFloat prepend="" />
      <StatBox title={'MOQ'} stat={rowData.moq} />
      <StatBox title={'Cartons'} stat={rowData.total_carton} />
      <StatBox
        title={'Carton Volume'}
        stat={rowData.total_cbm}
        secondStat={rowData.total_cft || 0}
        append="m3"
        secondAppend="ft3"
        asFloat
      />
      <StatBox
        title={'Carton Gross Weight'}
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
        editable
        autoCalculate
        handleAutoCalculate={handleAutoCalculate}
        handleEditSave={updateInventorySku}
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

const mapDispatchToProps = (dispatch: any) => ({
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) =>
    dispatch(updatePurchaseOrder(payload)),
});

export default connect(null, mapDispatchToProps)(EditProductRow);
