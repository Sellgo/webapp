import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'rsuite';
import { Radio } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';
import './toggleReset.scss';

/* Actions */
import { updateSalesProjectionProduct } from '../../../../../actions/PerfectStock/SalesProjection';

/* Components */
import InputWithSaveOptions from '../../../../../components/InputWithSaveOptions';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';
import { SalesProjectionUpdatePayload } from '../../../../../interfaces/PerfectStock/SalesProjection';
import { formatRating } from '../../../../../utils/format';

interface Props extends RowCell {
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) => void;
}

const SalesPrediction = (props: Props) => {
  const { updateSalesProjectionProduct, ...otherProps } = props;
  const { rowData } = otherProps;

  const usingPredictiveSales = rowData.projection_mode === 'predictive';

  const handleSaveManualSales = (updatedSalesProjection: string) => {
    const payload: SalesProjectionUpdatePayload = {
      id: rowData.id,
      updatePayload: {
        manual_sales: parseFloat(updatedSalesProjection),
      },
    };
    updateSalesProjectionProduct(payload);
  };

  const handleChangeProjectionMode = () => {
    const payload: SalesProjectionUpdatePayload = {
      id: rowData.id,
      updatePayload: {
        projection_mode: usingPredictiveSales ? 'manual' : 'predictive',
      },
    };
    updateSalesProjectionProduct(payload);
  };

  const displayPredictiveSales = formatRating(rowData.predictive_sales) || '';
  const defaultManualSalesPrediction = rowData.manual_sales
    ? rowData.manual_sales
    : rowData.predictive_sales;

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
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) =>
    dispatch(updateSalesProjectionProduct(payload)),
});

export default connect(null, mapDispatchToProps)(SalesPrediction);
