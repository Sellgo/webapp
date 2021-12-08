import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'rsuite';
import { Radio, Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { updateSalesProjectionProduct } from '../../../../../actions/PerfectStock/SalesProjection';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';
import { SalesProjectionUpdatePayload } from '../../../../../interfaces/PerfectStock/SalesProjection';
import InputFilter from '../../../../../components/FormFilters/InputFilter';

interface Props extends RowCell {
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) => void;
}

const SalesPrediction = (props: Props) => {
  const { updateSalesProjectionProduct, ...otherProps } = props;
  const { rowData, dataKey } = otherProps;

  const [usingPredictiveSales, setUsingPredictiveSales] = React.useState(true);
  const [updatedManualSales, setUpdatedManualSales] = React.useState<string>(rowData.manual_sales);
  const [isEditingManualSales, setIsEditingManualSales] = React.useState<boolean>(false);

  React.useEffect(() => {
    setUpdatedManualSales(rowData.manual_sales);
  }, [rowData]);

  const handleResetManualSalesChanges = () => {
    setIsEditingManualSales(false);
    setUpdatedManualSales(rowData.manual_sales);
  };

  const handleEditManualSales = (value: string) => {
    setUpdatedManualSales(value);

    if (value === rowData.manual_sales) {
      setIsEditingManualSales(false);
    } else {
      setIsEditingManualSales(true);
    }
  };

  const handleSaveManualSales = (save: boolean) => {
    if (!save) {
      handleResetManualSalesChanges();
    } else {
      const payload: SalesProjectionUpdatePayload = {
        id: rowData.id,
        updatePayload: {
          manual_sales: parseFloat(updatedManualSales),
        },
      };
      updateSalesProjectionProduct(payload);
      setIsEditingManualSales(false);
    }
  };

  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.salesPrediction}`}
      >
        <div className={styles.predictiveSales}>
          <Radio
            label="Predictive"
            className={styles.radioSelection}
            checked={usingPredictiveSales}
            onChange={() => {
              setUsingPredictiveSales(true);
              handleResetManualSalesChanges();
            }}
          />
          {rowData[dataKey]}
        </div>

        <div className={styles.manualSales}>
          <Radio
            label="Manual"
            className={styles.radioSelection}
            checked={!usingPredictiveSales}
            onChange={() => setUsingPredictiveSales(false)}
          />

          <div className={styles.editManualSales}>
            <InputFilter
              label=""
              placeholder=""
              isNumber
              value={updatedManualSales ? updatedManualSales.toString() : ''}
              className={styles.textInput}
              handleChange={handleEditManualSales}
              disabled={usingPredictiveSales}
            />
            {isEditingManualSales && (
              <>
                <Icon
                  name="check"
                  className={styles.checkIcon}
                  onClick={() => handleSaveManualSales(true)}
                />
                <Icon
                  name="close"
                  className={styles.closeIcon}
                  onClick={() => handleSaveManualSales(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Table.Cell>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) =>
    dispatch(updateSalesProjectionProduct(payload)),
});

export default connect(null, mapDispatchToProps)(SalesPrediction);
