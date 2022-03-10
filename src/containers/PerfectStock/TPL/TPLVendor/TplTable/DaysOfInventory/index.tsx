import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
import './toggleReset.scss';

/* Actions */
import { updateTplSkuData } from '../../../../../../actions/PerfectStock/Tpl';

/* Components */
import InputWithSaveOptions from '../../../../../../components/InputWithSaveOptions';

/* Interface */
import { RowCell } from '../../../../../../interfaces/Table';
import { UpdateTplSkuPayload } from '../../../../../../interfaces/PerfectStock/Tpl';

/* Utils */
import { formatNumber } from '../../../../../../utils/format';

interface Props extends RowCell {
  updateTplSkuData: (payload: UpdateTplSkuPayload) => void;
}

const DaysOfInventory = (props: Props) => {
  const { updateTplSkuData, ...otherProps } = props;
  const { rowData } = otherProps;

  const usingPredictiveSales = false;

  const handleSaveManualSales = (updatedSalesProjection: string) => {
    const payload: UpdateTplSkuPayload = {
      id: rowData.id,
      days_of_inventory: parseFloat(updatedSalesProjection),
    };
    updateTplSkuData(payload);
  };

  // const handleChangeProjectionMode = () => {
  //   const payload: SalesProjectionUpdatePayload = {
  //     id: rowData.id,
  //     updatePayload: {
  //       projection_mode: usingPredictiveSales ? 'manual' : 'predictive',
  //     },
  //   };
  //   updateSalesProjectionProduct(payload);
  // };

  const displayPredictiveSales = formatNumber(rowData.days_of_inventory) || '';
  const defaultManualSalesPrediction = rowData.days_of_inventory;

  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.salesPrediction} salesPrediction`}
      >
        {/* <Radio
          label={usingPredictiveSales ? 'Predictive' : 'Manual'}
          className={styles.radioSelection}
          checked={usingPredictiveSales}
          onChange={handleChangeProjectionMode}
          toggle
        /> */}
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
  updateTplSkuData: (payload: UpdateTplSkuPayload) => dispatch(updateTplSkuData(payload)),
});

export default connect(null, mapDispatchToProps)(DaysOfInventory);
