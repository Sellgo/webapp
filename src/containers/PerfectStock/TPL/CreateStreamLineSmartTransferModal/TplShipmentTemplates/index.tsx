import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';
import ActionButton from '../../../../../components/ActionButton';
import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';

/* Utils */
import { error } from '../../../../../utils/notifications';
import history from '../../../../../history';

/* Apis */
import {
  fetchAllPackingTemplates,
  fetchPackingTemplateById,
} from '../../../../../libs/api/tpl/packingTemplates';

export const COLUMNS_DATA = [
  {
    key: 'productDetail',
    label: '',
    width: '180',
    align: '',
  },
  {
    key: 'UnitsPerCartoon',
    label: 'Units per cartoon',
    width: '80',
    align: 'center',
  },
  {
    key: 'CartoonDimension',
    label: 'Cartoon dimension (in)',
    width: '100',
    align: 'center',
  },
  {
    key: 'CartoonWeight',
    label: 'Cartoon weight (lb)',
    width: '70',
    align: 'center',
  },
  {
    key: 'PrepGuidance',
    label: 'Prep  guidance',
    width: '80',
    align: 'center',
  },
  {
    key: 'labels',
    label: 'Who label units?',
    width: '100',
    align: 'center',
  },
];

interface Props {
  handlePrev: () => void;
  handleNext: () => void;
  setCreateStreamLinePayload: (payload: any) => void;
  createStreamLinePayload: any;
  createStreamLineStep: number;
}

const SelectShippingTemplate = (props: Props) => {
  const {
    handlePrev,
    handleNext,
    setCreateStreamLinePayload,
    createStreamLinePayload,
    createStreamLineStep,
  } = props;

  const [replenishmentTemplatesOptions, setReplenishmentTemplatesOptions] = React.useState([]);
  const [packingTemplateData, setPackingTemplateData] = React.useState<any[]>();
  const handleSubmit = () => {
    /* Handle Error */
    if (!(Number(createStreamLinePayload.tpl_packing_template_id) > 0)) {
      error('Please select a template');
      return;
    } else {
      handleNext();
    }
  };

  const setReplenishmentTemplateOptions = async () => {
    const replenishmentTemplates = await fetchAllPackingTemplates();
    if (!replenishmentTemplates?.hasError) {
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

      setReplenishmentTemplatesOptions(tempReplenishmentTemplatesOptions);
    }
  };

  const getShippingTemplatedata = async (id: string) => {
    const response = await fetchPackingTemplateById(Number(id));
    if (response?.hasError) {
      error(response.err);
      return;
    }
    setPackingTemplateData(response?.data.tpl_packing_template_skus);
  };

  React.useEffect(() => {
    setReplenishmentTemplateOptions();
    if (Number(createStreamLinePayload.tpl_packing_template_id) > 0) {
      getShippingTemplatedata(createStreamLinePayload.tpl_packing_template_id);
    }
  }, []);

  const handleSelectShippingTemplate = async (replenishmentTemplateId: string) => {
    if (replenishmentTemplateId === 'Create new lead time') {
      localStorage.setItem('createOrderStep', createStreamLineStep.toString());
      localStorage.setItem('createStreamLinePayload', JSON.stringify(createStreamLinePayload));
      history.push('/settings/aistock/lead-time');
      return;
    }
    setCreateStreamLinePayload({
      ...createStreamLinePayload,
      tpl_packing_template_id: parseInt(replenishmentTemplateId),
    });
    await getShippingTemplatedata(replenishmentTemplateId);
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h3 className={styles.heading}>
          Select your shipment prep template<span className={styles.asterick}>*</span>
        </h3>
        <div className={styles.inputBox}>
          <div>
            <SelectionFilter
              filterOptions={replenishmentTemplatesOptions}
              value={createStreamLinePayload.tpl_packing_template_id.toString()}
              handleChange={handleSelectShippingTemplate}
              placeholder="FBA replenishment template name*"
              label=""
              className={styles.selectField}
            />
          </div>
          <div className={styles.contentBox}>
            <div className={styles.columnWrapper}>
              {COLUMNS_DATA &&
                COLUMNS_DATA.map(columnData => {
                  const { key, label, width } = columnData;
                  return (
                    <div
                      key={key}
                      style={{
                        marginRight: '20px',
                      }}
                    >
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
                    </div>
                  );
                })}
            </div>
            <div className={styles.packingTemplateWrapper}>
              {packingTemplateData &&
                packingTemplateData.map((packingTemplate: any, index: number) => {
                  const {
                    image_url,
                    title,
                    asin,
                    sku,
                    length,
                    width,
                    height,
                    weight,
                    guidance,
                    owner,
                    carton_count,
                    merchant_listing_id,
                  } = packingTemplate;
                  const merchantListIds: any[] = [];
                  createStreamLinePayload.merchant_listings.forEach((merchant_listing: any) => {
                    merchantListIds.push(merchant_listing.merchant_listing_id);
                  });
                  return (
                    <>
                      {merchantListIds.indexOf(merchant_listing_id) >= 0 && (
                        <div key={index} className={styles.columnWrapper}>
                          <div
                            className={styles.productInformation}
                            style={{
                              width: `${COLUMNS_DATA[0].width}px`,
                              marginRight: '20px',
                            }}
                          >
                            <img src={image_url} className={styles.productImage} />
                            <div className={styles.productDetails}>
                              <p className={styles.productTitle}>{title}</p>
                              <div className={styles.productAttributes}>
                                <div className={styles.flagAndAsinCol}>
                                  <img
                                    className={styles.flagIcon}
                                    src={require(`../../../../../assets/flags/US.png`)}
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
                              marginRight: '20px',
                            }}
                          >
                            <p
                              style={{
                                width: `${COLUMNS_DATA[1].width}px`,
                                textAlign: 'center',
                                margin: '0 auto',
                              }}
                            >
                              {carton_count}
                            </p>
                          </div>
                          <div
                            style={{
                              marginRight: '20px',
                            }}
                          >
                            <p
                              style={{
                                width: `${COLUMNS_DATA[2].width}px`,
                                textAlign: 'center',
                                margin: '0 auto',
                              }}
                            >
                              {length} x {width} x {height}
                            </p>
                          </div>
                          <div
                            style={{
                              marginRight: '20px',
                            }}
                          >
                            <p
                              style={{
                                width: `${COLUMNS_DATA[3].width}px`,
                                textAlign: 'center',
                                margin: '0 auto',
                              }}
                            >
                              {weight}
                            </p>
                          </div>
                          <div
                            style={{
                              marginRight: '20px',
                            }}
                          >
                            <p
                              style={{
                                width: `${COLUMNS_DATA[4].width}px`,
                                textAlign: 'center',
                                margin: '0 auto',
                              }}
                            >
                              {guidance}
                            </p>
                          </div>
                          <div
                            style={{
                              marginRight: '20px',
                            }}
                          >
                            <p
                              style={{
                                width: `${COLUMNS_DATA[2].width}px`,
                                textAlign: 'center',
                                margin: '0 auto',
                              }}
                            >
                              {owner}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
            </div>
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

export default SelectShippingTemplate;
