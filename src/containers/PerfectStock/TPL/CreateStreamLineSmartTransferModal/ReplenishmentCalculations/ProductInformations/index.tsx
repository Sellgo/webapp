import React from 'react';
import { Radio } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import CopyAndLocateClipboard from '../../../../../../components/CopyAndLocateClipboard';
import InputFilter from '../../../../../../components/FormFilters/InputFilter';

interface Props {
  setCreateStreamLinePayload: (payload: any) => void;
  createStreamLinePayload: any;
  columnsData: any[];
  isRoundToNextBoxChecked: boolean;
  shippingCalculationResults: any[];
  skusOrders: any[];
}

const ProductsInformation = (props: Props) => {
  const {
    setCreateStreamLinePayload,
    createStreamLinePayload,
    isRoundToNextBoxChecked,
    shippingCalculationResults,
    skusOrders,
    columnsData,
  } = props;
  console.log('29=>', shippingCalculationResults);
  const merchantListings = createStreamLinePayload.merchant_listings;
  const updateManualQuantityValue = (index: number, value: string) => {
    const tempMerchantListings = merchantListings;
    tempMerchantListings[index].manual_quantity = value;
    setCreateStreamLinePayload({
      ...createStreamLinePayload,
      merchant_listings: tempMerchantListings,
    });
  };
  const shipmentQtyRadioClicked = (type: string, index: number, isPredictive: boolean) => {
    if (type === 'predictive' && isPredictive) return;
    if (type === 'manual' && !isPredictive) return;
    const tempMerchantListings = merchantListings;
    if (type === 'predictive') {
      tempMerchantListings[index] = {
        merchant_listing_id: tempMerchantListings[index].merchant_listing_id,
      };
      setCreateStreamLinePayload({
        ...createStreamLinePayload,
        merchant_listings: tempMerchantListings,
      });
    } else if (type === 'manual') {
      tempMerchantListings[index].manual_quantity = '';
      setCreateStreamLinePayload({
        ...createStreamLinePayload,
        merchant_listings: tempMerchantListings,
      });
    }
  };
  return (
    <div className={styles.createOrderWrapper}>
      {shippingCalculationResults &&
        shippingCalculationResults.map((shippingCalculationResult: any, index: number) => {
          const {
            merchant_listing_id,
            quantity,
            carton_count,
            total_carton,
            weight_lbs,
            length_in,
            width_in,
            height_in,
            tpl_quantity,
          } = shippingCalculationResult;
          const { image_url, title, asin, sku } = skusOrders[merchant_listing_id];
          let notRounded = 0;
          let rounded = 0;
          if (carton_count > 0) {
            notRounded =
              Number.parseInt(
                `${Number.parseFloat(`${Number(quantity) / Number(carton_count)}`)}`
              ) * carton_count;
            rounded =
              Math.round(Number.parseFloat(`${Number(quantity) / Number(carton_count)}`)) *
              carton_count;
          }
          const currentMerchantListingIndex = merchantListings
            .map((merchantListing: any) => merchantListing.merchant_listing_id)
            .indexOf(merchant_listing_id);
          const currentMerchantListing = merchantListings[currentMerchantListingIndex];
          console.log('89', currentMerchantListing);
          const isPredictive = !('manual_quantity' in currentMerchantListing);
          return (
            <div key={index} className={styles.columnWrapper}>
              <div
                className={`${styles.productInformation} ${styles.columnValueWrapper}`}
                style={{
                  width: `${columnsData[0].width}px`,
                }}
              >
                <img src={image_url} className={styles.productImage} />
                <div className={styles.productDetails}>
                  <p className={styles.productTitle}>{title}</p>
                  <div className={styles.productAttributes}>
                    <div className={styles.flagAndAsinCol}>
                      <img
                        className={styles.flagIcon}
                        src={require(`../../../../../../assets/flags/US.png`)}
                      />
                      {/* ASIN and UPC details */}
                      <div className={styles.productTitleTextBox}>
                        {/* ASIN */}
                        {asin.length > 0 ? (
                          <CopyAndLocateClipboard
                            data={asin}
                            link={`http://www.amazon.com/dp/${asin}`}
                            className={styles.productAsin}
                          />
                        ) : (
                          '-'
                        )}

                        {/* UPC */}
                        <span className={styles.upcText}>{sku}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: `${columnsData[1].width}px`,
                }}
                className={styles.columnValueWrapper}
              >
                <p className={styles.columnText}>{tpl_quantity}</p>
              </div>

              <div
                style={{
                  width: `${columnsData[2].width}px`,
                }}
                className={styles.columnValueWrapper}
              >
                <div className={styles.shipmentQuantityWrapper}>
                  <Radio
                    checked={isPredictive}
                    onClick={() => {
                      shipmentQtyRadioClicked(
                        'predictive',
                        currentMerchantListingIndex,
                        isPredictive
                      );
                    }}
                  />
                  <p
                    className={`${styles.shipmentQuantityWrapper__text} ${styles.shipmentQuantityWrapper__textTitle}`}
                  >
                    Predictive
                  </p>
                  <p
                    className={`${styles.shipmentQuantityWrapper__text} ${styles.shipmentQuantityWrapper__textNumber}`}
                  >
                    {quantity}
                  </p>
                </div>
                <div className={styles.shipmentQuantityWrapper}>
                  <Radio
                    checked={!isPredictive}
                    onClick={() => {
                      shipmentQtyRadioClicked('manual', currentMerchantListingIndex, isPredictive);
                    }}
                  />
                  <p
                    className={`${styles.shipmentQuantityWrapper__text} ${styles.shipmentQuantityWrapper__textTitle}`}
                  >
                    Manual
                  </p>
                  <p>
                    <InputFilter
                      value={currentMerchantListing.manual_quantity}
                      placeholder={''}
                      handleChange={e => updateManualQuantityValue(currentMerchantListingIndex, e)}
                      className={styles.shipmentQuantityWrapper__inputFilter}
                    />
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: `${columnsData[3].width}px`,
                }}
                className={styles.columnValueWrapper}
              >
                <p className={styles.columnText}>
                  {isRoundToNextBoxChecked ? rounded : notRounded}
                </p>
              </div>
              <div
                style={{
                  width: `${columnsData[4].width}px`,
                }}
                className={styles.columnValueWrapper}
              >
                <div className={styles.calculationResult}>
                  <p className={styles.calculationResult__title}>Units/ box: </p>
                  <p className={styles.calculationResult__text}>{carton_count}</p>
                </div>
                <div className={styles.calculationResult}>
                  <p className={styles.calculationResult__title}>Number of boxes: </p>
                  <p className={styles.calculationResult__text}>{total_carton}</p>
                </div>
                <div className={styles.calculationResult}>
                  <p className={styles.calculationResult__title}>Box weight (lb.): </p>
                  <p>{weight_lbs?.toFixed(2)}</p>
                </div>
                <div className={styles.calculationResult}>
                  <p className={styles.calculationResult__title}>Box dimensions (in): </p>
                  <p className={styles.calculationResult__text}>
                    {length_in?.toFixed(2)}x{width_in?.toFixed(2)}x{height_in?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductsInformation;
