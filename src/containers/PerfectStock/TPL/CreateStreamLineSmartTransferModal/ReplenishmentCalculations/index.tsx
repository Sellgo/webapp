import React from 'react';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ProductsInformation from './ProductInformations';
import ActionButton from '../../../../../components/ActionButton';

/* Utils */
import { error } from '../../../../../utils/notifications';
// import history from '../../../../../history';

/* Apis */
import { calculateTplShipmentQuantities } from '../../../../../libs/api/tpl';
import { getOrderProducts } from '../../../../../libs/api/orderProducts';

export const COLUMNS_DATA = [
  {
    key: 'productDetail',
    label: '',
    width: '180',
    align: '',
  },
  {
    key: 'tplStock',
    label: 'Total 3Pl Stock',
    width: '80',
    align: 'center',
  },
  {
    key: 'shipmentQty',
    label: 'Shipment Quantity',
    width: '180',
    align: 'center',
  },
  {
    key: 'roundToNextBox',
    label: 'Rounded to next box',
    width: '160',
    align: 'center',
  },
  {
    key: 'shipmentBoxes',
    label: 'Shipment Boxes',
    width: '180',
    align: 'center',
  },
];

interface Props {
  handlePrev: () => void;
  handleNext: () => void;
  setCreateStreamLinePayload: (payload: any) => void;
  vendorId: number;
  createStreamLinePayload: any;
}

const ReplenishmentCalculationModal = (props: Props) => {
  const {
    handlePrev,
    handleNext,
    setCreateStreamLinePayload,
    vendorId,
    createStreamLinePayload,
  } = props;

  const [isRoundToNextChecked, setIsRoundToNextChecked] = React.useState<boolean>(false);
  const [orderSkus, setOrderSkus] = React.useState<any>({});
  const [replenishmentCalculationResults, setReplenishmentCalculationResults] = React.useState<
    any[]
  >([]);

  const handleSubmit = () => {
    /* Handle Error */
    console.log(createStreamLinePayload);
    if (createStreamLinePayload.tpl_replenishment_template_id < 0) {
      error('Please select a template');
      return;
    } else {
      setCreateStreamLinePayload({
        ...createStreamLinePayload,
        round_up_to_nearest_carton: isRoundToNextChecked,
      });
      handleNext();
    }
  };

  const setReplenishmentCalculations = async () => {
    const merchantListIds: any[] = [];
    createStreamLinePayload.merchant_listings.forEach((merchant_listing: any) => {
      merchantListIds.push(merchant_listing.merchant_listing_id);
    });
    const payload = {
      vendor_id: vendorId,
      date: createStreamLinePayload.start_date,
      merchant_listing_ids: merchantListIds,
    };
    const calculationResults = await calculateTplShipmentQuantities(payload);
    if (!calculationResults?.hasError) {
      console.log('110', calculationResults);
      setReplenishmentCalculationResults(calculationResults?.data);
    }
  };

  React.useEffect(() => {
    setReplenishmentCalculations();
  }, []);

  const fetchOrderProducts = async () => {
    const result = await getOrderProducts(vendorId);
    if (result.hasError) {
      error(result.err);
      return;
    }
    const merchantListIds: any[] = [];
    createStreamLinePayload.merchant_listings.forEach((merchant_listing: any) => {
      merchantListIds.push(merchant_listing.merchant_listing_id);
    });
    let tempData = {};
    result.data.forEach((dataElement: any) => {
      const tempId = dataElement.merchant_listing_id;
      console.log('134', tempId, merchantListIds);
      if (merchantListIds.indexOf(tempId) >= 0) {
        const tempDataElement = {
          [tempId]: dataElement,
        };
        tempData = { ...tempData, ...tempDataElement };
      }
    });
    console.log(142, tempData);
    setOrderSkus(tempData);
  };

  React.useEffect(() => {
    if (Object.keys(orderSkus).length === 0) {
      fetchOrderProducts();
    }
  }, [orderSkus.length]);

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h3 className={styles.heading}>Select your FBA replenishment template*</h3>
        <div className={styles.inputBox}>
          <div className={styles.contentBox}>
            <div className={styles.columnWrapper}>
              {COLUMNS_DATA &&
                COLUMNS_DATA.map(columnData => {
                  const { key, label, width } = columnData;
                  return (
                    <div
                      key={key}
                      style={{
                        marginRight: '10px',
                      }}
                      className={`${key === 'roundToNextBox' && styles.flex}`}
                    >
                      {key === 'roundToNextBox' ? (
                        <>
                          <Checkbox
                            checked={isRoundToNextChecked}
                            onClick={() => setIsRoundToNextChecked(!isRoundToNextChecked)}
                          />
                          <p
                            className={styles.columnLabel}
                            style={{
                              width: `${width}px`,
                              textAlign: 'center',
                              margin: '0 auto',
                            }}
                          >
                            {label}
                          </p>
                        </>
                      ) : (
                        <p
                          className={styles.columnLabel}
                          style={{
                            width: `${width}px`,
                            textAlign: 'center',
                            margin: '0 auto',
                          }}
                        >
                          {label}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
            {Object.keys(orderSkus).length > 0 && replenishmentCalculationResults.length > 0 && (
              <ProductsInformation
                setCreateStreamLinePayload={setCreateStreamLinePayload}
                createStreamLinePayload={createStreamLinePayload}
                isRoundToNextBoxChecked={isRoundToNextChecked}
                shippingCalculationResults={replenishmentCalculationResults}
                skusOrders={orderSkus}
                columnsData={COLUMNS_DATA}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.buttonsRow}>
        <ActionButton
          className={styles.cancelButton}
          onClick={handlePrev}
          variant="reset"
          size="md"
        >
          Back
        </ActionButton>
        <ActionButton
          className={styles.createButton}
          onClick={handleSubmit}
          variant="secondary"
          type="purpleGradient"
          size="md"
        >
          Continue
        </ActionButton>
      </div>
    </div>
  );
};

export default ReplenishmentCalculationModal;
