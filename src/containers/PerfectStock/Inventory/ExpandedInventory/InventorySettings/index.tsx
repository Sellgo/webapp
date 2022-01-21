import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { updateSalesProjectionProduct } from '../../../../../actions/PerfectStock/SalesProjection';

/* Components */
import BoxHeader from '../../../../../components/BoxHeader';
import BoxContainer from '../../../../../components/BoxContainer';
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import SaveCancelOptions from '../../../../../components/SaveCancelOptions';
import ActionPopup from '../../../../../components/ActionPopup';
import TableIcon from '../../../../../components/Icons/TableIcon';

/* Interface */
import { SalesProjectionUpdatePayload } from '../../../../../interfaces/PerfectStock/SalesProjection';

/* COnstants */
import { SIDE_SETTING_WIDTH } from '../../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  productId: number;
  defaultInventoryThresholdActivated: boolean;
  defaultInventoryThreshold: number;
  defaultSeasonalityAdjustorActivated: boolean;

  /* Redux Actions */
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) => void;
}

const InventorySettings = (props: Props) => {
  const {
    productId,
    defaultInventoryThresholdActivated,
    defaultInventoryThreshold,
    defaultSeasonalityAdjustorActivated,
    updateSalesProjectionProduct,
  } = props;

  const [inventoryThreshold, setInventoryThreshold] = React.useState<number>(
    defaultInventoryThreshold || 0
  );
  const [isEditingInventoryThreshold, setIsEditingInventoryThreshold] = React.useState<boolean>(
    false
  );

  /* ===================================== */
  /* Inventory threshold settings handlers */
  /* ===================================== */
  const handleUpdateInventoryThresholdSave = async () => {
    updateSalesProjectionProduct({
      id: productId,
      updatePayload: {
        stockout_threshold_inventory: inventoryThreshold,
      },
    });
    setIsEditingInventoryThreshold(false);
  };

  const handleUpdateInventoryThresholdCancel = () => {
    setInventoryThreshold(defaultInventoryThreshold);
    setIsEditingInventoryThreshold(false);
  };

  const handleInventoryThresholdToggle = (inventoryThresholdActivated: boolean) => {
    updateSalesProjectionProduct({
      id: productId,
      updatePayload: {
        stockout_threshhold_inventory_included: inventoryThresholdActivated ? 'true' : 'false',
      },
    });
  };

  /* ================================== */
  /* Seasonality adjustor toggles */
  /* ================================== */
  const handleSeasonalityAdjustorToggle = (seasonalityAdjustorActivated: boolean) => {
    updateSalesProjectionProduct({
      id: productId,
      updatePayload: {
        seasonal_adjustment_included: seasonalityAdjustorActivated ? 'true' : 'false',
      },
    });
  };

  return (
    <div className={styles.expandedProductSettings} style={{ width: SIDE_SETTING_WIDTH - 30 }}>
      <BoxHeader className={styles.settingsBoxHeader}>Calculation Variables</BoxHeader>
      <BoxContainer className={styles.settingsBoxContainer}>
        <div className={styles.settingWrapper}>
          <p className={styles.settingsTitle}> Inventory Threshold </p>
          <Checkbox
            toggle
            checked={defaultInventoryThresholdActivated}
            onChange={() => handleInventoryThresholdToggle(!defaultInventoryThresholdActivated)}
            label="Inventory Threshold"
            className={styles.settingToggle}
          />
          <InputFilter
            placeholder="100"
            isNumber
            value={inventoryThreshold.toString()}
            handleChange={(value: string) => setInventoryThreshold(parseInt(value))}
            className={styles.settingInput}
            onFocus={() => setIsEditingInventoryThreshold(true)}
            onBlur={() => setIsEditingInventoryThreshold(false)}
            disabled={!defaultInventoryThresholdActivated}
          />
          {isEditingInventoryThreshold && (
            <SaveCancelOptions
              className={styles.saveCancelOptions}
              handleSave={handleUpdateInventoryThresholdSave}
              handleCancel={handleUpdateInventoryThresholdCancel}
            />
          )}
        </div>

        <div className={styles.settingWrapper}>
          <p className={styles.settingsTitle}> Sales Calendar </p>
          <div className={styles.settingToggleWrapper}>
            <Checkbox
              toggle
              checked={defaultSeasonalityAdjustorActivated}
              onChange={() => handleSeasonalityAdjustorToggle(!defaultSeasonalityAdjustorActivated)}
              label="Seasonality Adjustor"
              className={styles.settingToggle}
            />
            <ActionPopup>
              <button onClick={() => null}>
                <TableIcon name="calendar check outline" />
                &nbsp;Edit Seasonality Adjustor
              </button>
            </ActionPopup>
          </div>
        </div>
      </BoxContainer>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) =>
      dispatch(updateSalesProjectionProduct(payload)),
  };
};

export default connect(null, mapDispatchToProps)(InventorySettings);
