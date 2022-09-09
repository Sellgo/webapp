import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
// import SeasonalityTable from './SeasonalityTable';
import ToggleRadio from '../../../../../components/ToggleRadio';
import Placeholder from '../../../../../components/Placeholder';
import BoxContainer from '../../../../../components/BoxContainer';
// eslint-disable-next-line max-len
import SeasonalityTable from '../../../../PerfectStock/SalesProjection/ExpandedProduct/EditSeasonalityPopup/SeasonalityTable';

/* Utils */
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { error, success } from '../../../../../utils/notifications';

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
import { SalesProjectionUpdatePayload } from '../../../../../interfaces/PerfectStock/SalesProjection';
import { Checkbox } from 'semantic-ui-react';
import ProductInformation from '../../../../../components/ProductInformation';

interface Props {
  salesProjectionResult: any;
  isLoadingSalesProjection: boolean;
  rowData?: any;
  fetchSalesProjection: () => void;
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) => void;
}

const SalesForecastingAdjustorCore = (props: Props) => {
  const {
    fetchSalesProjection,
    updateSalesProjectionProduct,
    salesProjectionResult,
    isLoadingSalesProjection,
  } = props;

  const [seasonalitySettings, setSeasonalitySettings] = useState<any[]>([]);
  const [isLoadingSeasonalitySettings, setIsLoadingSeasonalitySettings] = useState<boolean>(false);
  const [isSavingSeasonalitySettings, setIsSavingSeasonalitySettings] = useState<boolean>(false);
  const [id, setId] = useState<number>(-1);

  /* Seasonality adjustor toggles */
  const handleSeasonalityAdjustorToggle = (
    seasonalityAdjustorActivated: boolean,
    currentProductId: number
  ) => {
    const id = currentProductId;
    updateSalesProjectionProduct({
      id,
      updatePayload: {
        seasonal_adjustment_included: seasonalityAdjustorActivated ? 'true' : 'false',
      },
    });
  };

  /* Fetch seasonality settings */
  const getSeasonalitySettings = async () => {
    setIsLoadingSeasonalitySettings(true);
    try {
      const sellerId = sellerIDSelector();
      const res = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerId}/sales-adjustment?sales_projection_id=${id}`
      );
      const { data } = res;
      if (data) {
        setSeasonalitySettings(data);
      }
    } catch (err) {
      error('Failed to get seasonality settings');
    }
    setIsLoadingSeasonalitySettings(false);
  };

  /* Hook called upon typing inside the input fields */
  const handleValueChange = (key: string, value: string, id: number) => {
    const newSeasonalitySettings = [...seasonalitySettings];
    const index = newSeasonalitySettings.findIndex(item => item.id === id);
    newSeasonalitySettings[index][key] = value;
    setSeasonalitySettings(newSeasonalitySettings);
  };

  /* Handler to create new seasonality setting */
  const handleAddNewSeasonalitySetting = async () => {
    const newSeasonalitySetting = {
      name: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0],
      sales_projection_id: id,
      type: 'seasonal_trends',
      status: 'pending',
    };

    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/sales-adjustment`;
      const payload = [newSeasonalitySetting];
      const res = await axios.post(url, payload);
      const { data } = res;
      if (data) {
        setSeasonalitySettings([...seasonalitySettings, data]);
      }
    } catch (err) {
      error('Failed to add setting');
    }
  };

  const handleDelete = async (id: number) => {
    const newSeasonalitySettings = seasonalitySettings.map(item => {
      if (item.id === id) {
        item.status = 'inactive';
      }
      return item;
    });
    setSeasonalitySettings(newSeasonalitySettings);
  };

  /* Saving of seasonality settings, triggered upon clicking of Save button */
  const handleSaveSeasonalitySettings = async () => {
    setIsSavingSeasonalitySettings(true);
    const savedSeasonalitySettings = seasonalitySettings.map(setting => {
      if (setting.status === 'pending' && setting.name !== '' && setting.value !== '') {
        setting.status = 'active';
      }
      return setting;
    });
    const sellerId = sellerIDSelector();
    const res = await axios.patch(
      `${AppConfig.BASE_URL_API}sellers/${sellerId}/sales-adjustment`,
      savedSeasonalitySettings
    );
    const { status } = res;
    if (status === 200) {
      fetchSalesProjection();
      success('Seasonality settings saved successfully');
    }
    setIsSavingSeasonalitySettings(false);
  };

  /* On component launch, reset seasonality settings and fetch latest settings */
  React.useEffect(() => {
    fetchSalesProjection();
  }, []);

  React.useEffect(() => {
    if (salesProjectionResult && salesProjectionResult.length > 0 && !(id >= 0)) {
      const fisrtActiveSaleProjectionProduct = salesProjectionResult.find(
        (salesProjection: any) =>
          salesProjection.seasonal_adjustment_included === true ||
          salesProjection.seasonal_adjustment_included === 'true'
      );
      if (fisrtActiveSaleProjectionProduct) {
        setId(fisrtActiveSaleProjectionProduct?.id);
      } else {
        setId(salesProjectionResult[0]?.id);
      }
    }
  }, [salesProjectionResult]);

  React.useEffect(() => {
    if (id >= 0) {
      setSeasonalitySettings([]);
      getSeasonalitySettings();
    }
  }, [id]);

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
              salesProjectionResult.map((salesProjection: any, index: any) => {
                const { image_url, title, asin, sku } = salesProjection;
                const isSeasonalityEnabled =
                  salesProjection.seasonal_adjustment_included === true ||
                  salesProjection.seasonal_adjustment_included === 'true';
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
                          if (id !== salesProjection.id) setId(salesProjection.id);
                        }}
                        className={styles.checkBox}
                      />
                      <ToggleRadio
                        isToggled={isSeasonalityEnabled}
                        handleChange={() =>
                          handleSeasonalityAdjustorToggle(
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
            ${styles.seasonalityTableWrapper}
            ${!isSeasonalityEnabled ? styles.seasonalityTableWrapper__disabled : ''}
          `}
                      >
                        <SeasonalityTable
                          seasonalitySettings={seasonalitySettings}
                          handleValueChange={handleValueChange}
                          handleDelete={handleDelete}
                          isLoadingSeasonalitySettings={isLoadingSeasonalitySettings}
                        />
                        <button
                          onClick={handleAddNewSeasonalitySetting}
                          className={styles.addNewSetting}
                        >
                          + &nbsp; Add new seasonality
                        </button>
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
              onClick={handleSaveSeasonalitySettings}
              loading={isSavingSeasonalitySettings}
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesForecastingAdjustorCore);
