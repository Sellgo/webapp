import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
// import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';
import ActionButton from '../../../../../components/ActionButton';

/* Interfaces */
// import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';
import { TplVendor } from '../../../../../interfaces/PerfectStock/Tpl';

/* Selectors */
import { getTplVendors } from '../../../../../selectors/PerfectStock/Tpl';

/* Utils */
import { error } from '../../../../../utils/notifications';
// import history from '../../../../../history';

/* Apis */
import { fetchReplishmentTemplates } from '../../../../../libs/api/replenishmentTemplates';
import { calculateTplShipmentQuantities } from '../../../../../libs/api/tpl';
import { getOrderProducts } from '../../../../../libs/api/orderProducts';
// import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';
import { Checkbox } from 'semantic-ui-react';

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
    width: '180',
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
  createStreamLinePayload: any;
  tplVendors: TplVendor[];
  createStreamLineStep: number;
  merchantListIds: any[];
}

const SelectFbaReplenishmentTemplate = (props: Props) => {
  const {
    handlePrev,
    handleNext,
    // setCreateStreamLinePayload,
    createStreamLinePayload,
    // createStreamLineStep,
    // tplVendors,
    merchantListIds,
  } = props;

  const [isRoundToNextChecked, setIsRoundToNextChecked] = React.useState<boolean>(false);
  const [orderSkus, setOrderSkus] = React.useState<any>([]);

  const handleSubmit = () => {
    /* Handle Error */
    console.log(createStreamLinePayload);
    if (createStreamLinePayload.tpl_replenishment_template_id < 0) {
      error('Please select a template');
      return;
    } else {
      handleNext();
    }
  };

  const setReplenishmentTemplateOptions = async () => {
    const payload = {
      vendor_id: 1,
      date: createStreamLinePayload.start_date,
      merchant_listing_ids: merchantListIds,
    };
    const calculationResults = await calculateTplShipmentQuantities(payload);
    const replenishmentTemplates = await fetchReplishmentTemplates();
    if (!calculationResults?.hasError) {
      // setReplenishmentTemplatesData(replenishmentTemplates?.data);
      const tempReplenishmentTemplatesOptions = replenishmentTemplates?.data.map(
        (replenishmentTemplate: any) => ({
          key: replenishmentTemplate.id?.toString() || '',
          value: replenishmentTemplate.id?.toString() || '',
          text: replenishmentTemplate.name,
        })
      );

      tempReplenishmentTemplatesOptions.push({
        key: 'Create new lead time',
        value: 'Create new lead time',
        text: 'Create new lead time',
      });

      // setReplenishmentTemplatesOptions(tempReplenishmentTemplatesOptions);
    }
  };

  React.useEffect(() => {
    setReplenishmentTemplateOptions();
  }, []);

  const fetchOrderProducts = async () => {
    const result = await getOrderProducts();
    if (result.hasError) {
      error(result.err);
      return;
    }
    let tempData = {};
    result.data.forEach((dataElement: any) => {
      const tempId = dataElement.id;
      if (merchantListIds.indexOf(tempId) >= 0) {
        const tempDataElement = {
          [tempId]: dataElement,
        };
        tempData = { ...tempData, ...tempDataElement };
      }
    });
    setOrderSkus(tempData);
  };

  React.useEffect(() => {
    if (orderSkus.length === 0) {
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
                        width: `${width}px`,
                        marginRight: '40px',
                      }}
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
                              width: '100%',
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
                            width: '100%',
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
            {/* <ProductsInfo /> */}
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

const mapStateToProps = (state: any) => {
  return {
    tplVendors: getTplVendors(state),
  };
};

export default connect(mapStateToProps)(SelectFbaReplenishmentTemplate);
