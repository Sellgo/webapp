import React from 'react';
import { connect } from 'react-redux';
import { Radio } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import {
  fetchDraftOrderInformation,
  updatePurchaseOrder,
} from '../../../../../../actions/PerfectStock/OrderPlanning';

/* Components */
import SaveCancelOptions from '../../../../../../components/SaveCancelOptions';
import InputFilter from '../../../../../../components/FormFilters/InputFilter';

/* Types */
import { UpdatePurchaseOrderPayload } from '../../../../../../interfaces/PerfectStock/OrderPlanning';

interface Props {
  rowData: any;
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) => void;
  fetchDraftOrderInformation: () => void;
  orderId: number;
}

const UnitsToOrder = (props: Props) => {
  const { updatePurchaseOrder, fetchDraftOrderInformation, orderId, ...otherProps } = props;
  const { rowData } = otherProps;
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
    const num = parseInt(value);
    if (Number.isInteger(num) && num >= 0) {
      setUpdatedManualSales(value);
    }

    if (value === rowData.manual_quantity) {
      setIsEditingManualSales(false);
    } else {
      setIsEditingManualSales(true);
    }
  };

  const handleSaveManualSales = async (save: boolean) => {
    if (!save) {
      handleResetManualSalesChanges();
    } else {
      const payload: UpdatePurchaseOrderPayload = {
        id: orderId,
        po_sku_id: rowData.id,
        manual_quantity: parseFloat(updatedManualSales),
      };
      await updatePurchaseOrder(payload);
      setIsEditingManualSales(false);
    }
  };

  const handleChangeProjectionMode = async () => {
    const payload: UpdatePurchaseOrderPayload = {
      id: orderId,
      po_sku_id: rowData.id,
      quantity_mode: usingPredictiveSales ? 'manual' : 'predictive',
    };
    await updatePurchaseOrder(payload);
    fetchDraftOrderInformation();
  };

  const displayPredictiveSales = rowData.quantity || 0;
  const displayManualSales = updatedManualSales;

  return (
    <div
      className={`
        ${styles.salesPrediction}`}
    >
      <div className={styles.salesOptions}>
        <Radio
          label="Predictive"
          className={`
            ${styles.radioSelection} 
            ${usingPredictiveSales ? styles.radioSelection__selected : ''}
          `}
          checked={usingPredictiveSales}
          onChange={handleChangeProjectionMode}
        />
        <Radio
          label="Manual"
          className={`
            ${styles.radioSelection} 
            ${!usingPredictiveSales ? styles.radioSelection__selected : ''}
          `}
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
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) =>
    dispatch(updatePurchaseOrder(payload)),
  fetchDraftOrderInformation: () => dispatch(fetchDraftOrderInformation()),
});

export default connect(null, mapDispatchToProps)(UnitsToOrder);
