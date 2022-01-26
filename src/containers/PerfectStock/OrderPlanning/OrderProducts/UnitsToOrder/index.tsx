import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'rsuite';
import { Radio } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { updateSalesProjectionProduct } from '../../../../../actions/PerfectStock/SalesProjection';

/* Components */
import SaveCancelOptions from '../../../../../components/SaveCancelOptions';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';
import { SalesProjectionUpdatePayload } from '../../../../../interfaces/PerfectStock/SalesProjection';
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import { formatRating } from '../../../../../utils/format';

interface Props extends RowCell {
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) => void;
}

const UnitsToOrder = (props: Props) => {
  const { updateSalesProjectionProduct, ...otherProps } = props;
  const { rowData } = otherProps;
  console.log(rowData);

  const usingPredictiveSales = rowData.quantity_mode === 'predictive';
  const [updatedManualSales, setUpdatedManualSales] = React.useState<string>(rowData.manual_sales);
  const [isEditingManualSales, setIsEditingManualSales] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (rowData.manual_quantity) {
      setUpdatedManualSales(rowData.manual_quantity);
    } else {
      setUpdatedManualSales(rowData.quantity);
    }
  }, [rowData]);

  const handleResetManualSalesChanges = () => {
    setIsEditingManualSales(false);
    setUpdatedManualSales(rowData.manual_quantity);
  };

  const handleEditManualSales = (value: string) => {
    setUpdatedManualSales(value);

    if (value === rowData.manual_quantity) {
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
  const displayManualSales = formatRating(updatedManualSales) || '';

  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.salesPrediction}`}
      >
        <div className={styles.salesOptions}>
          <Radio
            label="Predictive"
            className={styles.radioSelection}
            checked={usingPredictiveSales}
            onChange={handleChangeProjectionMode}
          />
          <Radio
            label="Manual"
            className={styles.radioSelection}
            checked={!usingPredictiveSales}
            onChange={handleChangeProjectionMode}
          />
        </div>

        <div className={styles.salesResults}>
          {usingPredictiveSales ? (
            displayPredictiveSales
          ) : (
            <div className={styles.editManualSales}>
              <InputFilter
                label=""
                placeholder=""
                isNumber
                value={displayManualSales}
                className={styles.textInput}
                handleChange={handleEditManualSales}
                disabled={usingPredictiveSales}
              />
              {isEditingManualSales && (
                <SaveCancelOptions
                  handleSave={() => handleSaveManualSales(true)}
                  handleCancel={() => handleSaveManualSales(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Table.Cell>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) =>
    dispatch(updateSalesProjectionProduct(payload)),
});

export default connect(null, mapDispatchToProps)(UnitsToOrder);
