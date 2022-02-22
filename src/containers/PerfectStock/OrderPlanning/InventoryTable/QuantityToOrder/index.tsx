import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'rsuite';
import { Radio } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';
import './toggleReset.scss';

/* Components */
import InputWithSaveOptions from '../../../../../components/InputWithSaveOptions';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';
import { UpdatePurchaseOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { formatNumber } from '../../../../../utils/format';

/* Actions */
import { updatePurchaseOrder } from '../../../../../actions/PerfectStock/OrderPlanning';

interface Props extends RowCell {
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) => void;
  orderId: number;
}

const QuantityToOrder = (props: Props) => {
  const { orderId, updatePurchaseOrder, ...otherProps } = props;
  const { rowData } = otherProps;

  const usingPredictiveSales = rowData.quantity_mode === 'predictive';

  const handleSaveManualSales = (updatedManualSales: string) => {
    const payload: UpdatePurchaseOrderPayload = {
      id: orderId,
      po_sku_id: rowData.id,
      manual_quantity: parseFloat(updatedManualSales),
    };
    updatePurchaseOrder(payload);
  };

  const handleChangeProjectionMode = async () => {
    const payload: UpdatePurchaseOrderPayload = {
      id: orderId,
      po_sku_id: rowData.id,
      quantity_mode: usingPredictiveSales ? 'manual' : 'predictive',
    };
    await updatePurchaseOrder(payload);
  };

  const displayPredictiveSales = formatNumber(rowData.quantity) || '';
  const defaultManualSalesPrediction = rowData.manual_quantity
    ? rowData.manual_quantity
    : rowData.quantity || '';

  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.salesPrediction} salesPrediction`}
      >
        <Radio
          label={usingPredictiveSales ? 'Predictive' : 'Manual'}
          className={styles.radioSelection}
          checked={usingPredictiveSales}
          onChange={handleChangeProjectionMode}
          toggle
        />
        {usingPredictiveSales ? (
          displayPredictiveSales
        ) : (
          <div className={styles.editManualSales}>
            <InputWithSaveOptions
              isNumber
              isPositiveOnly
              handleSave={handleSaveManualSales}
              defaultValue={defaultManualSalesPrediction}
            />
          </div>
        )}
      </div>
    </Table.Cell>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) =>
    dispatch(updatePurchaseOrder(payload)),
});

export default connect(null, mapDispatchToProps)(QuantityToOrder);
