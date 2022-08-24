import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';
import Highcharts from 'highcharts';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import ToggleRadio from '../../../../../components/ToggleRadio';
import Placeholder from '../../../../../components/Placeholder';
import BoxContainer from '../../../../../components/BoxContainer';
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';
import ProductInformation from '../../../../../components/ProductInformation';

/* Actions */
import {
  fetchSalesProjection,
  updateSalesProjectionProduct,
} from '../../../../../actions/PerfectStock/SalesProjection';

import {
  getSalesProjectionResults,
  getIsLoadingSalesProjection,
} from '../../../../../selectors/PerfectStock/SalesProjection';

/* Types */
import {
  SalesProjectionUpdatePayload,
  WeightedAverageSettings,
} from '../../../../../interfaces/PerfectStock/SalesProjection';
import { WEIGHT_OPTIONS } from '../../../../../constants/PerfectStock/SalesProjection';

interface Props {
  salesProjectionResult: any;
  isLoadingSalesProjection: boolean;
  rowData?: any;
  fetchSalesProjection: () => void;
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) => void;
}

const SalesForecastingWeightsCore = (props: Props) => {
  const {
    fetchSalesProjection,
    updateSalesProjectionProduct,
    salesProjectionResult,
    isLoadingSalesProjection,
  } = props;

  const [id, setId] = useState<number>(-1);

  /* weighrs */
  const [weightedAverageSettings, setWeightedAverageSettings] = React.useState<
    WeightedAverageSettings
  >({
    avg_l7d_weight: '0',
    avg_l30d_weight: '0',
    avg_l90d_weight: '0',
    avg_n30d_ly_weight: '0',
    avg_n90d_ly_weight: '0',
    avg_31d_60d_weight: '0',
    avg_61d_90d_weight: '0',
  });

  const defaultWeightAverageSettings = (salesProjectionDataItem: any) => {
    const defaultWeightedAverageSettings: WeightedAverageSettings = {
      avg_l7d_weight: salesProjectionDataItem.avg_l7d_weight || '0',
      avg_l30d_weight: salesProjectionDataItem.avg_l30d_weight || '0',
      avg_l90d_weight: salesProjectionDataItem.avg_l90d_weight || '0',
      avg_n30d_ly_weight: salesProjectionDataItem.avg_n30d_ly_weight || '0',
      avg_n90d_ly_weight: salesProjectionDataItem.avg_n90d_ly_weight || '0',
      avg_31d_60d_weight: salesProjectionDataItem.avg_31d_60d_weight || '0',
      avg_61d_90d_weight: salesProjectionDataItem.avg_61d_90d_weight || '0',
    };
    setWeightedAverageSettings(defaultWeightedAverageSettings);
  };

  /* ================================== */
  /* Weighted average settings handlers */
  /* ================================== */
  const handleWeightedAverageToggle = (
    weightedAverageActivated: boolean,
    currentProductId: number
  ) => {
    const id = currentProductId;
    updateSalesProjectionProduct({
      id,
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
      id,
      updatePayload: weightedAverageSettings,
    });
  };

  React.useEffect(() => {
    fetchSalesProjection();
  }, []);

  React.useEffect(() => {
    if (salesProjectionResult && salesProjectionResult.length > 0 && !(id >= 0)) {
      setId(-1);
      const fisrtActiveSaleProjectionProduct = salesProjectionResult.find(
        (salesProjection: any) =>
          salesProjection.weighted_average_included === true ||
          salesProjection.weighted_average_included === 'true'
      );
      if (fisrtActiveSaleProjectionProduct) {
        setId(fisrtActiveSaleProjectionProduct?.id);
        defaultWeightAverageSettings(fisrtActiveSaleProjectionProduct);
      } else {
        setId(salesProjectionResult[0]?.id);
        defaultWeightAverageSettings(salesProjectionResult[0]);
      }
    }
  }, [salesProjectionResult]);

  React.useEffect(() => {
    console.log('132');
    if (id >= 0 && !isLoadingSalesProjection) {
      const chartMount = document.getElementById(`pie-graph-${id}`);
      if (chartMount) {
        Highcharts.chart({
          chart: {
            plotShadow: false,
            type: 'pie',
            renderTo: `pie-graph-${id}`,
            backgroundColor: 'transparent',
          },
          title: {
            text: '',
            floating: true,
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
          },
          plotOptions: {
            pie: {
              cursor: 'arrow',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                distance: -50,
                filter: {
                  property: 'percentage',
                  operator: '>',
                  value: 4,
                },
              },
            },
          },
          series: [
            {
              name: '',
              colorByPoint: true,
              type: 'pie',
              data: [
                {
                  name: 'Last 90 Days',
                  y: parseFloat(weightedAverageSettings.avg_l90d_weight),
                },
                {
                  name: 'Last 61-90 Days',
                  y: parseFloat(weightedAverageSettings.avg_61d_90d_weight),
                },
                {
                  name: 'Last 31-60 Days',
                  y: parseFloat(weightedAverageSettings.avg_31d_60d_weight),
                },
                {
                  name: 'Last 30 Days',
                  y: parseFloat(weightedAverageSettings.avg_l30d_weight),
                },
                {
                  name: 'Last 7 Days',
                  y: parseFloat(weightedAverageSettings.avg_l7d_weight),
                },
                {
                  name: 'Next 30 Days',
                  y: parseFloat(weightedAverageSettings.avg_n30d_ly_weight),
                },
                {
                  name: 'Next 90 Days',
                  y: parseFloat(weightedAverageSettings.avg_n90d_ly_weight),
                },
              ],
            },
          ],
        });
      }
    }
  }, [id, weightedAverageSettings, isLoadingSalesProjection]);

  return (
    <>
      {isLoadingSalesProjection && (
        <BoxContainer className={styles.boxContainer}>
          <Placeholder numberRows={5} numberParagraphs={1} />
        </BoxContainer>
      )}
      {!isLoadingSalesProjection && (
        <div className={styles.coreWrapper}>
          <div className={styles.modalHeader}>
            {salesProjectionResult &&
              salesProjectionResult.map((salesProjection: any, index: number) => {
                const { image_url, title, asin, sku } = salesProjection;
                const defaultWeightActivated =
                  salesProjection.weighted_average_included === true ||
                  salesProjection.weighted_average_included === 'true';
                return (
                  <div key={index}>
                    <div
                      className={`${id === salesProjection.id &&
                        styles.selectedProductInformationWrapper}
                    ${styles.productInformationWrapper}
                `}
                    >
                      <Checkbox
                        checked={!!(id === salesProjection.id)}
                        radio
                        onChange={() => {
                          if (id !== salesProjection.id) {
                            defaultWeightAverageSettings(salesProjectionResult[index]);
                            setId(salesProjection.id);
                          }
                        }}
                        className={styles.checkBox}
                      />
                      <ToggleRadio
                        isToggled={defaultWeightActivated}
                        handleChange={() =>
                          handleWeightedAverageToggle(
                            !salesProjection.seasonal_adjustment_included,
                            salesProjection.id
                          )
                        }
                        label={''}
                        className={styles.toggleButton}
                      />
                      <ProductInformation
                        image_url={image_url}
                        asin={asin}
                        sku={sku}
                        title={title}
                      />
                    </div>
                    <div className={`${id !== salesProjection.id && styles.hideSeasonalityTable}`}>
                      <div
                        className={`
                                    ${styles.weightDisplayWrapper}
                                    ${
                                      !defaultWeightActivated
                                        ? styles.weightDisplayWrapper__disabled
                                        : ''
                                    }
                                  `}
                      >
                        <div>
                          <SelectionFilter
                            label="Average Last 90 Days"
                            placeholder=""
                            filterOptions={WEIGHT_OPTIONS}
                            value={weightedAverageSettings.avg_l90d_weight}
                            handleChange={(value: string) =>
                              handleWeightedAverageUpdate('avg_l90d_weight', value)
                            }
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
                            handleChange={(value: string) =>
                              handleWeightedAverageUpdate('avg_l30d_weight', value)
                            }
                            className={styles.settingInput}
                            disabled={!defaultWeightActivated}
                          />
                          <SelectionFilter
                            label="Average Last 7 Days"
                            placeholder=""
                            filterOptions={WEIGHT_OPTIONS}
                            value={weightedAverageSettings.avg_l7d_weight}
                            handleChange={(value: string) =>
                              handleWeightedAverageUpdate('avg_l7d_weight', value)
                            }
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
                        </div>
                        <div>
                          <div
                            id={`pie-graph-${salesProjection.id}`}
                            className={`${styles.pieChart} ${
                              defaultWeightActivated ? '' : styles.pieChart__disabled
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={styles.buttonsRow}>
            <ActionButton
              variant="reset"
              type="grey"
              size="md"
              className={styles.resetButton}
              onClick={fetchSalesProjection}
            >
              Cancel
            </ActionButton>
            <ActionButton
              variant="secondary"
              type="purpleGradient"
              size="md"
              onClick={handleEditWeightedAverageSave}
              // loading={salesProjectionResult[].}
            >
              Apply
            </ActionButton>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    salesProjectionResult: getSalesProjectionResults(state),
    isLoadingSalesProjection: getIsLoadingSalesProjection(state),
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSalesProjection: () => dispatch(fetchSalesProjection({})),
    updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) =>
      dispatch(updateSalesProjectionProduct(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesForecastingWeightsCore);
