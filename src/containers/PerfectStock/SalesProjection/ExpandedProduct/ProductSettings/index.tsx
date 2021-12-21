import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { updateSalesProjectionProduct } from '../../../../../actions/PerfectStock/SalesProjection';

/* Constants */
import { WEIGHT_OPTIONS } from '../../../../../constants/PerfectStock/SalesProjection';

/* Components */
import BoxHeader from '../../../../../components/BoxHeader';
import BoxContainer from '../../../../../components/BoxContainer';
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import SaveCancelOptions from '../../../../../components/SaveCancelOptions';
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';

/* Interface */
import {
  SalesProjectionUpdatePayload,
  WeightedAverageSettings,
} from '../../../../../interfaces/PerfectStock/SalesProjection';

interface Props {
  productId: number;
  defaultInventoryThresholdActivated: boolean;
  defaultInventoryThreshold: number;
  defaultWeightActivated: boolean;
  defaultWeightL7D: string;
  defaultWeightL30D: string;
  defaultWeightL90D: string;
  defaultWeightN30D: string;
  defaultWeightN90D: string;
  defaultSeasonalityAdjustorActivated: boolean;

  /* Redux Actions */
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) => void;
}

const ExpandedProduct = (props: Props) => {
  const {
    productId,
    defaultInventoryThresholdActivated,
    defaultInventoryThreshold,
    defaultWeightActivated,
    defaultWeightL7D,
    defaultWeightL30D,
    defaultWeightL90D,
    defaultWeightN30D,
    defaultWeightN90D,
    defaultSeasonalityAdjustorActivated,
    updateSalesProjectionProduct,
  } = props;

  const defaultWeightedAverageSettings: WeightedAverageSettings = {
    avg_l7d_weight: defaultWeightL7D,
    avg_l30d_weight: defaultWeightL30D,
    avg_l90d_weight: defaultWeightL90D,
    avg_n30d_ly_weight: defaultWeightN30D,
    avg_n90d_ly_weight: defaultWeightN90D,
  };

  const [inventoryThreshold, setInventoryThreshold] = React.useState<number>(
    defaultInventoryThreshold || 0
  );
  const [isEditingInventoryThreshold, setIsEditingInventoryThreshold] = React.useState<boolean>(
    false
  );
  const [isEditingWeightedAverage, setIsEditingWeightedAverage] = React.useState<boolean>(false);
  const [weightedAverageSettings, setWeightedAverageSettings] = React.useState<
    WeightedAverageSettings
  >(defaultWeightedAverageSettings);
  const [weightedAverageError, setWeightedAverageError] = React.useState<boolean>(false);

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
  /* Weighted average settings handlers */
  /* ================================== */
  const handleWeightedAverageToggle = (weightedAverageActivated: boolean) => {
    updateSalesProjectionProduct({
      id: productId,
      updatePayload: {
        weighted_average_included: weightedAverageActivated ? 'true' : 'false',
      },
    });
  };

  const handleWeightedAverageUpdate = (key: string, value: string) => {
    setWeightedAverageSettings({
      ...weightedAverageSettings,
      [key]: value,
    });
  };

  const handleEditWeightedAverageSave = () => {
    updateSalesProjectionProduct({
      id: productId,
      updatePayload: weightedAverageSettings,
    });
    setIsEditingWeightedAverage(false);
  };

  const handleEditWeightedAverageCancel = () => {
    setIsEditingWeightedAverage(false);
    setWeightedAverageSettings(defaultWeightedAverageSettings);
  };

  /* Check if user is editing weighted average settings */
  React.useEffect(() => {
    if (
      JSON.stringify(defaultWeightedAverageSettings) !== JSON.stringify(weightedAverageSettings)
    ) {
      setIsEditingWeightedAverage(true);
    } else {
      setIsEditingWeightedAverage(false);
    }
  }, [weightedAverageSettings]);

  /* Error checks to ensure that sum of all percentages = 100% */
  React.useEffect(() => {
    if (isEditingWeightedAverage) {
      const weightedAverageSum = Object.values(weightedAverageSettings).reduce((acc, curr) => {
        return parseInt(acc) + Math.floor(parseInt(curr));
      });

      if (weightedAverageSum !== 100) {
        setWeightedAverageError(true);
      } else {
        setWeightedAverageError(false);
      }
    } else {
      console.log('wad');
      setWeightedAverageError(false);
    }
  }, [weightedAverageSettings, isEditingWeightedAverage]);

  return (
    <div className={styles.expandedProductSettings}>
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
          <p className={styles.settingsTitle}> Average Weighted Sales </p>
          <Checkbox
            toggle
            checked={defaultWeightActivated}
            onChange={() => handleWeightedAverageToggle(!defaultWeightActivated)}
            label="Average Weighted Sales"
            className={styles.settingToggle}
          />
          <SelectionFilter
            label="Average Last 7 Day"
            placeholder=""
            filterOptions={WEIGHT_OPTIONS}
            value={weightedAverageSettings.avg_l7d_weight}
            handleChange={(value: string) => handleWeightedAverageUpdate('avg_l7d_weight', value)}
            className={styles.settingInput}
            error={weightedAverageError}
            disabled={!defaultWeightActivated}
          />
          <SelectionFilter
            label="Average Last 30 Day"
            placeholder=""
            filterOptions={WEIGHT_OPTIONS}
            value={weightedAverageSettings.avg_l30d_weight}
            handleChange={(value: string) => handleWeightedAverageUpdate('avg_l30d_weight', value)}
            className={styles.settingInput}
            disabled={!defaultWeightActivated}
            error={weightedAverageError}
          />
          <SelectionFilter
            label="Average Last 90 Day"
            placeholder=""
            filterOptions={WEIGHT_OPTIONS}
            value={weightedAverageSettings.avg_l90d_weight}
            handleChange={(value: string) => handleWeightedAverageUpdate('avg_l90d_weight', value)}
            className={styles.settingInput}
            disabled={!defaultWeightActivated}
            error={weightedAverageError}
          />
          <SelectionFilter
            label="Average Next 30 Day Last Year"
            placeholder=""
            filterOptions={WEIGHT_OPTIONS}
            value={weightedAverageSettings.avg_n30d_ly_weight}
            handleChange={(value: string) =>
              handleWeightedAverageUpdate('avg_n30d_ly_weight', value)
            }
            className={styles.settingInput}
            disabled={!defaultWeightActivated}
            error={weightedAverageError}
          />
          <SelectionFilter
            label="Average Next 90 Day Last Year"
            placeholder=""
            filterOptions={WEIGHT_OPTIONS}
            value={weightedAverageSettings.avg_n90d_ly_weight}
            handleChange={(value: string) =>
              handleWeightedAverageUpdate('avg_n90d_ly_weight', value)
            }
            className={styles.settingInput}
            disabled={!defaultWeightActivated}
            error={weightedAverageError}
          />
          {weightedAverageError && (
            <p className={styles.errorMsg}> Total averages should total up to 100% </p>
          )}

          {isEditingWeightedAverage && (
            <SaveCancelOptions
              disabled={weightedAverageError}
              className={styles.saveCancelOptions}
              handleSave={handleEditWeightedAverageSave}
              handleCancel={handleEditWeightedAverageCancel}
            />
          )}
        </div>
        <div className={styles.settingWrapper}>
          <p className={styles.settingsTitle}> Sales Calendar </p>
          <Checkbox
            toggle
            checked={defaultSeasonalityAdjustorActivated}
            onChange={() => console.log('Update')}
            label="Seasonality Adjustor"
            className={styles.settingToggle}
          />
          <Checkbox
            checked={true}
            onChange={() => console.log('Update')}
            label="Seasonal Trends"
            className={`${styles.settingToggle} ${styles.settingToggle__checkbox}`}
          />
          <Checkbox
            checked={true}
            onChange={() => console.log('Update')}
            label="Deep Discount Sales"
            className={`${styles.settingToggle} ${styles.settingToggle__checkbox}`}
          />
          <Checkbox
            checked={true}
            onChange={() => console.log('Update')}
            label="MCF Sales"
            className={`${styles.settingToggle} ${styles.settingToggle__checkbox}`}
          />
          <Checkbox
            checked={true}
            onChange={() => console.log('Update')}
            label="Additiona Sales Growth"
            className={`${styles.settingToggle} ${styles.settingToggle__checkbox}`}
          />
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

export default connect(null, mapDispatchToProps)(ExpandedProduct);
