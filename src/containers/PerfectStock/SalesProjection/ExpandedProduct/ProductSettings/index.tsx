import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { updateSalesProjectionProduct } from '../../../../../actions/PerfectStock/SalesProjection';

/* Constants */
import { WEIGHT_OPTIONS } from '../../../../../constants/PerfectStock/SalesProjection';

/* Components */
import BoxHeader from '../../../../../components/BoxHeader';
import BoxContainer from '../../../../../components/BoxContainer';
import ToggleRadio from '../../../../../components/ToggleRadio';
import SaveCancelOptions from '../../../../../components/SaveCancelOptions';
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';

/* Interface */
import {
  SalesProjectionUpdatePayload,
  WeightedAverageSettings,
} from '../../../../../interfaces/PerfectStock/SalesProjection';

interface Props {
  productId: number;
  defaultWeightActivated: boolean;
  defaultWeightL7D: string;
  defaultWeightL31D60D: string;
  defaultWeightL61D90D: string;
  defaultWeightL30D: string;
  defaultWeightL90D: string;
  defaultWeightN30D: string;
  defaultWeightN90D: string;

  /* Redux Actions */
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) => void;
}

const ExpandedProduct = (props: Props) => {
  const {
    productId,
    defaultWeightActivated,
    defaultWeightL7D,
    defaultWeightL30D,
    defaultWeightL90D,
    defaultWeightN30D,
    defaultWeightN90D,
    defaultWeightL31D60D,
    defaultWeightL61D90D,
    updateSalesProjectionProduct,
  } = props;

  const defaultWeightedAverageSettings: WeightedAverageSettings = {
    avg_l7d_weight: defaultWeightL7D,
    avg_l30d_weight: defaultWeightL30D,
    avg_l90d_weight: defaultWeightL90D,
    avg_n30d_ly_weight: defaultWeightN30D,
    avg_n90d_ly_weight: defaultWeightN90D,
    avg_31d_60d_weight: defaultWeightL31D60D,
    avg_61d_90d_weight: defaultWeightL61D90D,
  };

  const [isEditingWeightedAverage, setIsEditingWeightedAverage] = React.useState<boolean>(false);
  const [weightedAverageSettings, setWeightedAverageSettings] = React.useState<
    WeightedAverageSettings
  >(defaultWeightedAverageSettings);

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

  React.useEffect(() => {
    /* Compare objects */
    if (
      JSON.stringify(defaultWeightedAverageSettings) === JSON.stringify(weightedAverageSettings)
    ) {
      setIsEditingWeightedAverage(false);
    } else {
      setIsEditingWeightedAverage(true);
    }
  }, [weightedAverageSettings, defaultWeightedAverageSettings]);

  return (
    <div className={styles.expandedProductSettings}>
      <BoxHeader className={styles.settingsBoxHeader}>Calculation Variables</BoxHeader>
      <BoxContainer className={styles.settingsBoxContainer}>
        <div className={styles.settingWrapper}>
          <p className={styles.settingsTitle}> Average Weighted Sales </p>
          <ToggleRadio
            isToggled={defaultWeightActivated}
            handleChange={() => handleWeightedAverageToggle(!defaultWeightActivated)}
            label="Average Weighted Sales"
            className={styles.settingToggle}
          />
          <SelectionFilter
            label="Average Last 90 Days"
            placeholder=""
            filterOptions={WEIGHT_OPTIONS}
            value={weightedAverageSettings.avg_l90d_weight}
            handleChange={(value: string) => handleWeightedAverageUpdate('avg_l90d_weight', value)}
            className={styles.settingInput}
            disabled={!defaultWeightActivated}
          />
          <SelectionFilter
            label="Average Last 61 - 90 Days"
            placeholder=""
            filterOptions={WEIGHT_OPTIONS}
            value={weightedAverageSettings.avg_61d_90d_weight}
            handleChange={(value: string) =>
              handleWeightedAverageUpdate('avg_61d_90d_weight', value)
            }
            className={styles.settingInput}
            disabled={!defaultWeightActivated}
          />
          <SelectionFilter
            label="Average Last 31 - 60 Days"
            placeholder=""
            filterOptions={WEIGHT_OPTIONS}
            value={weightedAverageSettings.avg_31d_60d_weight}
            handleChange={(value: string) =>
              handleWeightedAverageUpdate('avg_31d_60d_weight', value)
            }
            className={styles.settingInput}
            disabled={!defaultWeightActivated}
          />
          <SelectionFilter
            label="Average Last 30 Days"
            placeholder=""
            filterOptions={WEIGHT_OPTIONS}
            value={weightedAverageSettings.avg_l30d_weight}
            handleChange={(value: string) => handleWeightedAverageUpdate('avg_l30d_weight', value)}
            className={styles.settingInput}
            disabled={!defaultWeightActivated}
          />
          <SelectionFilter
            label="Average Last 7 Days"
            placeholder=""
            filterOptions={WEIGHT_OPTIONS}
            value={weightedAverageSettings.avg_l7d_weight}
            handleChange={(value: string) => handleWeightedAverageUpdate('avg_l7d_weight', value)}
            className={styles.settingInput}
            disabled={!defaultWeightActivated}
          />
          <SelectionFilter
            label="Average Next 30 Days Last Year"
            placeholder=""
            filterOptions={WEIGHT_OPTIONS}
            value={weightedAverageSettings.avg_n30d_ly_weight}
            handleChange={(value: string) =>
              handleWeightedAverageUpdate('avg_n30d_ly_weight', value)
            }
            className={styles.settingInput}
            disabled={!defaultWeightActivated}
          />
          <SelectionFilter
            label="Average Next 90 Days Last Year"
            placeholder=""
            filterOptions={WEIGHT_OPTIONS}
            value={weightedAverageSettings.avg_n90d_ly_weight}
            handleChange={(value: string) =>
              handleWeightedAverageUpdate('avg_n90d_ly_weight', value)
            }
            className={styles.settingInput}
            disabled={!defaultWeightActivated}
          />

          {isEditingWeightedAverage && (
            <SaveCancelOptions
              disabled={false}
              className={styles.saveCancelOptions}
              handleSave={handleEditWeightedAverageSave}
              handleCancel={handleEditWeightedAverageCancel}
            />
          )}
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
