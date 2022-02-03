import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';
import { SalesProjectionUpdatePayload } from '../../../../../interfaces/PerfectStock/SalesProjection';

/* Components */
import ToggleRadio from '../../../../../components/ToggleRadio';
import InputWithSaveOptions from '../../../../../components/InputWithSaveOptions';

/* Actions */
import { updateSalesProjectionProduct } from '../../../../../actions/PerfectStock/SalesProjection';

interface Props extends RowCell {
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) => void;
}

const InventoryThreshold = (props: Props) => {
  const { updateSalesProjectionProduct, ...otherProps } = props;
  const { rowData } = otherProps;

  const handleSaveInventoryThreshold = (updatedInventoryThreshold: string) => {
    const payload: SalesProjectionUpdatePayload = {
      id: rowData.id,
      updatePayload: {
        stockout_threshold_inventory: parseFloat(updatedInventoryThreshold),
      },
    };
    updateSalesProjectionProduct(payload);
  };

  const handleInventoryThresholdToggle = (stockoutThresholdInventory: boolean) => {
    updateSalesProjectionProduct({
      id: rowData.id,
      updatePayload: {
        stockout_threshhold_inventory_included: stockoutThresholdInventory ? 'true' : 'false',
      },
    });
  };

  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.inventoryThresholdCell}`}
      >
        <ToggleRadio
          isToggled={rowData.stockout_threshhold_inventory_included ? true : false}
          handleChange={() =>
            handleInventoryThresholdToggle(!rowData.stockout_threshhold_inventory_included)
          }
          label={'Threshold'}
          className={styles.toggleButton}
        />

        <InputWithSaveOptions
          defaultValue={
            rowData.stockout_threshold_inventory ? rowData.stockout_threshold_inventory : '0'
          }
          handleSave={handleSaveInventoryThreshold}
          isNumber
          isPositiveOnly
          disabled={!rowData.stockout_threshhold_inventory_included}
        />
      </div>
    </Table.Cell>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) =>
      dispatch(updateSalesProjectionProduct(payload)),
  };
};

export default connect(null, mapDispatchToProps)(InventoryThreshold);
