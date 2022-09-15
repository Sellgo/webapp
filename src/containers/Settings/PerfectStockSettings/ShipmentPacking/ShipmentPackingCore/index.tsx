import React, { useEffect, useState } from 'react';
import axios from 'axios';

/* Configs */
import { AppConfig } from '../../../../../config';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import {
  PROP_GUIDANCE_OPTIONS,
  OWNER_OPTIONS,
  COLUMNS_DATA,
} from '../../../../../constants/PerfectStock/ShipmentPacking';

/* Components */
import BoxContainer from '../../../../../components/BoxContainer';
import Placeholder from '../../../../../components/Placeholder';
import ActionButton from '../../../../../components/ActionButton';
import CopyAndLocateClipboard from '../../../../../components/CopyAndLocateClipboard';
/* Utils */
import { success, error } from '../../../../../utils/notifications';
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';
import ThreePLManagerSettingsHeaderForm from '../../../../../components/ThreePLManagerSettingsHeaderForm';

const ShipmentPackingCore = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [packingTemplateData, setPackingTemplateData] = useState<any>(null);
  const [shippingTemplatesOptions, setShippingTemplatesOptions] = useState<any>(null);
  const [newShippingTempplateName, setNewShippingTempplateName] = useState<string>('');
  const [tplCurrentShipmentid, setTplCurrentShipmentid] = useState<string | number>();
  const [initData, setInitData] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const sellerID = localStorage.getItem('userId');
  /* Handlers */
  const setShipmentTemplateOptions = async () => {
    try {
      const { status, data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/tpl-packing-templates`
      );

      if (status === 200) {
        if (data && data.length > 0) {
          const tempReplenishmentTemplatesOptions = data.map((replenishmentTemplate: any) => ({
            key: replenishmentTemplate.id?.toString() || '',
            value: replenishmentTemplate.id?.toString() || '',
            text: replenishmentTemplate.name,
          }));
          setShippingTemplatesOptions(tempReplenishmentTemplatesOptions);
        } else {
          setIsNew(true);
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchShipmentPacking = async (id: number) => {
    try {
      const { status, data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/tpl-packing-templates/${id}`
      );

      if (status === 200) {
        if (data && Object.keys(data).length > 0) {
          setPackingTemplateData(data.tpl_packing_template_skus);
          setInitData([...data.tpl_packing_template_skus]);
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }

    return [];
  };

  useEffect(() => {
    if (tplCurrentShipmentid && tplCurrentShipmentid > 0) {
      fetchShipmentPacking(Number(tplCurrentShipmentid));
    }
  }, [tplCurrentShipmentid]);

  useEffect(() => {
    setIsLoading(true);
    setShipmentTemplateOptions();
  }, []);

  const updateSellerDatabaseFilter = (key: string, value: any, index: number) => {
    const temp = JSON.parse(JSON.stringify(packingTemplateData));
    temp[index][`${key}`] = `${value}`;
    setPackingTemplateData([...temp]);
  };

  const validateSubmission = (data: any) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (!element.guidance || element.guidance === '' || element.guidance === null) {
        return false;
      }
      if (!element.owner || element.owner === '' || element.owner === null) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    setIsUpdating(true);
    const payload = [...packingTemplateData];
    if (validateSubmission(payload)) {
      try {
        let payload = packingTemplateData.map(({ id, guidance, owner }: any) => ({
          id,
          guidance,
          owner,
        }));
        payload = {
          tpl_packing_template_skus: payload,
        };

        const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/tpl-packing-templates/${tplCurrentShipmentid}`;
        const { status } = await axios.patch(URL, payload);
        if (status === 200) {
          success('AiStock shipment packaging template saved');
          setIsUpdating(false);
        }
      } catch (err) {
        error('Cannot Save shipment packaging template');
        setIsUpdating(false);
      }
    } else {
      error('Please fill all prep guides and label units');
    }
    setIsUpdating(false);
  };

  const handleNewShipmentTemplateSubmission = async () => {
    if (!(newShippingTempplateName.length > 0)) {
      error('Please enter new template name');
      return;
    }
    try {
      const payload = {
        name: newShippingTempplateName,
      };

      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/tpl-packing-templates`;
      const { status, data } = await axios.post(URL, payload);
      if (status === 201) {
        success('AiStock new shipment packaging template added');
        setIsUpdating(false);
        setIsLoading(true);
        setNewShippingTempplateName('');
        setIsNew(false);
        setShipmentTemplateOptions();
        setTplCurrentShipmentid(data.id);
      }
    } catch (err) {
      error('Cannot Save shipment packaging template');
      setIsUpdating(false);
    }
  };

  const handleReset = () => {
    if (isNew) {
      setIsNew(false);
    } else {
      setPackingTemplateData([...initData]);
    }
  };

  return (
    <>
      <p className={styles.heading}>Set Shipment Packing Template via Webapp</p>
      <section className={styles.filterSection}>
        {isLoading && (
          <BoxContainer className={styles.boxContainer}>
            <Placeholder numberRows={5} numberParagraphs={1} />
          </BoxContainer>
        )}
        {!isLoading && (
          <>
            {isNew ? (
              <ThreePLManagerSettingsHeaderForm
                value={newShippingTempplateName.toString()}
                label={'New Template'}
                placeholder={'Template Name'}
                onChangeHandler={(id: string, value: string | number) => {
                  setNewShippingTempplateName(`${value}`);
                }}
                isNew={true}
                dataKey={'name'}
              />
            ) : (
              <>
                <ThreePLManagerSettingsHeaderForm
                  value={`${tplCurrentShipmentid}`}
                  label={'Select Template'}
                  placeholder={'Template'}
                  onChangeHandler={(id: string, value: string | number) => {
                    setTplCurrentShipmentid(value);
                  }}
                  isNew={false}
                  dataKey={'name'}
                  options={shippingTemplatesOptions}
                  addNewBtnLabel={'+ create new template'}
                  handleAddNewBtn={() => setIsNew(true)}
                />
                <hr className={styles.line} />
              </>
            )}
            {!isNew && (
              <>
                <div className={styles.columnWrapper}>
                  {packingTemplateData &&
                    COLUMNS_DATA &&
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
                        </div>
                      );
                    })}
                </div>
                <div>
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
                        prep_inst_list,
                        owner,
                        carton_count,
                      } = packingTemplate;
                      const prepGuidanceOptions = PROP_GUIDANCE_OPTIONS.filter(
                        propGuidanceOption => prep_inst_list.indexOf(propGuidanceOption.value) >= 0
                      );
                      prepGuidanceOptions.push({
                        key: 'NONE',
                        text: 'No prep needed',
                        value: 'NONE',
                      });
                      return (
                        <div key={index} className={styles.columnWrapper}>
                          <div
                            className={styles.productInformation}
                            style={{
                              width: `${COLUMNS_DATA[0].width}px`,
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
                              width: `${COLUMNS_DATA[1].width}px`,
                              marginRight: '40px',
                            }}
                          >
                            <p
                              style={{
                                width: '100%',
                                textAlign: 'center',
                                margin: '0 auto',
                              }}
                            >
                              {carton_count}
                            </p>
                          </div>
                          <div
                            style={{
                              width: `${COLUMNS_DATA[2].width}px`,
                              marginRight: '40px',
                            }}
                          >
                            <p
                              style={{
                                width: '100%',
                                textAlign: 'center',
                                margin: '0 auto',
                              }}
                            >
                              {length} x {width} x {height}
                            </p>
                          </div>
                          <div
                            style={{
                              width: `${COLUMNS_DATA[3].width}px`,
                              marginRight: '40px',
                            }}
                          >
                            <p
                              style={{
                                width: '100%',
                                textAlign: 'center',
                                margin: '0 auto',
                              }}
                            >
                              {weight}
                            </p>
                          </div>
                          <div
                            style={{
                              width: `${COLUMNS_DATA[4].width}px`,
                              marginRight: '40px',
                            }}
                          >
                            <SelectionFilter
                              placeholder={'Prep Guidance'}
                              filterOptions={prepGuidanceOptions}
                              value={guidance ? `${guidance}` : ''}
                              handleChange={(value: string) =>
                                updateSellerDatabaseFilter('guidance', value, index)
                              }
                              className={`${styles.inputFilter}`}
                            />
                          </div>
                          <div
                            style={{
                              width: `${COLUMNS_DATA[5].width}px`,
                              marginRight: '40px',
                            }}
                          >
                            <SelectionFilter
                              placeholder={'Choose Owner'}
                              filterOptions={OWNER_OPTIONS}
                              value={owner ? `${owner}` : ''}
                              handleChange={(value: string) =>
                                updateSellerDatabaseFilter('owner', value, index)
                              }
                              className={`${styles.inputFilter}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
            {(isNew || packingTemplateData) && (
              <div className={styles.buttonsRow}>
                {shippingTemplatesOptions && shippingTemplatesOptions.length > 0 && (
                  <ActionButton
                    variant="reset"
                    size="md"
                    className={styles.resetButton}
                    onClick={() => {
                      handleReset();
                    }}
                  >
                    Cancel
                  </ActionButton>
                )}
                <ActionButton
                  className={styles.applyButton}
                  variant="secondary"
                  type="purpleGradient"
                  size="md"
                  onClick={() => {
                    if (isNew) {
                      handleNewShipmentTemplateSubmission();
                    } else {
                      handleSubmit();
                    }
                  }}
                  disabled={isUpdating}
                  loading={isUpdating}
                >
                  Save
                </ActionButton>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default ShipmentPackingCore;
