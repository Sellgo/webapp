import React from 'react';
import { Radio } from 'semantic-ui-react';
// import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
// import './toggleReset.scss';

/* Components */
import InputWithSaveOptions from '../../../../../../components/InputWithSaveOptions';

/* Interface */
import { RowCell } from '../../../../../../interfaces/Table';
import { UpdateTplInboundShippings } from '../../../../../../interfaces/PerfectStock/Tpl';

/* Utils */
import { formatNumber } from '../../../../../../utils/format';
import { updateInboundShippings } from '../../../../../../libs/api/tpl/inboundShipping';
import { error, success } from '../../../../../../utils/notifications';

const ShipmentQuantity = (props: RowCell) => {
  const { ...otherProps } = props;
  const { rowData } = otherProps;
  const [usingPredictiveSales, setUsingPredictiveSales] = React.useState<boolean>(
    !!(rowData.quantity_mode === 'predictive')
  );
  //   let usingPredictiveSales = !!(rowData.quantity_mode === 'predictive');

  const handleSaveManualSales = async (updatedSalesProjection: string) => {
    const payload: UpdateTplInboundShippings = {
      inbound_shipping_sku_id: rowData.inbound_shipping_sku_id,
      manual_quantity: parseFloat(updatedSalesProjection),
      quantity_mode: 'manual',
      quantity: rowData.quantity,
    };
    try {
      const response = await updateInboundShippings(payload);
      if (!response?.hasError) {
        success(response?.data?.message);
      } else {
        error(response?.err);
      }
    } catch (err) {
      console.error('Error updating Tpl Inbound Shippings', err);
    }
  };

  const handleChangeProjectionMode = async () => {
    const payload: UpdateTplInboundShippings = {
      inbound_shipping_sku_id: rowData.inbound_shipping_sku_id,
      quantity_mode: usingPredictiveSales ? 'manual' : 'predictive',
      manual_quantity: rowData.manual_quantity,
      quantity: rowData.quantity,
    };
    try {
      const response = await updateInboundShippings(payload);
      if (!response?.hasError) {
        setUsingPredictiveSales(!usingPredictiveSales);
        // success(response?.data?.message);
      } else {
        error(response?.err);
      }
    } catch (err) {
      console.error('Error updating Tpl Inbound Shippings', err);
    }
  };

  const displayPredictiveSales = formatNumber(rowData.quantity) || '';
  const defaultManualSalesPrediction = rowData.manual_quantity;

  return (
    <div
      className={`
          ${styles.salesPrediction} salesPrediction ${usingPredictiveSales && styles.predictive}`}
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
  );
};

export default ShipmentQuantity;
