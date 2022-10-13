import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* Configs */
import { AppConfig } from '../../../../../config';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { TplVendor } from '../../../../../interfaces/PerfectStock/Tpl';
import { ReplenishmentFBA } from '../../../../../interfaces/PerfectStock/Replenishments';

/* Constants */
import {
  DEFAULT_NEW_REPLENISHMENT_TEMPLATE,
  NON_AMAZAON_PARTNERED_CARRIERS,
  REPLENISHMENT_SETTINGS_FORM,
  // NON_AMAZAON_PARTNERED_CARRIERS,
} from '../../../../../constants/PerfectStock/Replenishment';

/* Actions */
import { createUpdateTplVendor, setTplActiveVendor } from '../../../../../actions/PerfectStock/Tpl';

/* Components */
// import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';
import ThreePLManagerSettingsHeaderForm from '../../../../../components/ThreePLManagerSettingsHeaderForm';
import FormTemplate from '../../../../../components/FormTemplate';
import BoxContainer from '../../../../../components/BoxContainer';
import Placeholder from '../../../../../components/Placeholder';
import ActionButton from '../../../../../components/ActionButton';

/* Selectors */
import { getTplActiveVendor, getTplVendors } from '../../../../../selectors/PerfectStock/Tpl';
import { Checkbox } from 'semantic-ui-react';
import { success, error } from '../../../../../utils/notifications';
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';

interface Props {
  createUpdateTplVendor: (payload: TplVendor) => void;
  tplVendors: TplVendor[];
  activeTplVendor: TplVendor;
  setTplActiveVendor: (vendor: TplVendor) => void;
}

const ReplenishmentCore = (props: Props) => {
  const { tplVendors } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tplSettings, setTplSettings] = useState<ReplenishmentFBA>(
    DEFAULT_NEW_REPLENISHMENT_TEMPLATE
  );
  const [isNew, setIsNew] = useState<boolean>(false);
  const [replenishmentTemplates, setReplenishmentTemaplates] = useState<ReplenishmentFBA[]>([]);
  const [replenishmentOptions, setReplenishmentOptions] = useState<any>([]);
  const [isSPD, setIsSPD] = useState<boolean>(true);
  const [isAPC, setIsAPC] = useState<boolean>(true);
  const sellerID = localStorage.getItem('userId');

  const setTplVendorAddressOptions = () => {
    const temp: any = [];
    tplVendors.forEach(vendor => {
      temp.push({
        value: `${vendor.id}`,
        key: `${vendor.name}`,
        text: `${vendor.name}, ${vendor.address}, ${vendor.city}, ${vendor.state}, ${vendor.zip_code}`,
      });
    });
    vendorIdOptions: for (const formRows of REPLENISHMENT_SETTINGS_FORM.formInputs) {
      for (const obj of formRows.formRow) {
        if (obj.id === 'vendor_id') {
          obj.options = temp;
          obj.placeholder = '3PL name, address, city, state, zip';
          break vendorIdOptions;
        }
      }
    }
  };

  const fetchReplishmentTemplates = async () => {
    try {
      const { status, data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/tpl-replenishment-templates`
      );

      if (status === 200) {
        if (!(data && data.length > 0)) {
          setIsNew(true);
          setIsLoading(false);
        } else {
          setTplSettings(data[data.length - 1]);
          if (data[data.length - 1].carrier_type === 'amz') {
            setIsAPC(true);
          } else {
            setIsAPC(false);
          }
          if (data[data.length - 1].method === 'SP') {
            setIsSPD(true);
          } else {
            setIsSPD(false);
          }
          setIsNew(false);
          setReplenishmentTemplatesOptions(data);
          setReplenishmentTemaplates(data);
        }
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  };

  const setReplenishmentTemplatesOptions = (data: any[]) => {
    const temp: any = [];
    data.forEach((replenishment: any) => {
      temp.push({
        value: `${replenishment.id}`,
        key: replenishment.name,
        text: replenishment.name,
      });
    });
    setReplenishmentOptions([...temp]);
    setIsLoading(false);
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetchReplishmentTemplates();
  }, []);

  React.useEffect(() => {
    setTplVendorAddressOptions();
  }, [tplVendors]);

  React.useEffect(() => {
    if (isNew) {
      setTplSettings(DEFAULT_NEW_REPLENISHMENT_TEMPLATE);
    }
  }, [isNew]);

  const updateSellerDatabaseFilter = (key: string, value: any) => {
    setTplSettings({
      ...tplSettings,
      [key]: value,
    });
  };

  /* Handlers */

  const validateSubmission = (data: any) => {
    if (!(data && data.vendor_id && data.vendor_id)) {
      return false;
    }
    if (!(data && data.fulfillment && data.fulfillment)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const payload = {
      ...tplSettings,
      marketplace_id: 'ATVPDKIKX0DER',
    };
    if (validateSubmission(payload)) {
      payload.vendor_id = Number(payload.vendor_id);
      try {
        let data;
        if (payload.id && !payload.isNew) {
          const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/tpl-replenishment-templates/${payload.id}`;
          const res = await axios.patch(URL, payload);
          data = res.data;
        } else {
          const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/tpl-replenishment-templates`;
          const res = await axios.post(URL, payload);
          data = res.data;
        }
        if (data) {
          validateSubmission(data);
          fetchReplishmentTemplates();
          success('AiStock Replenishment template saved');
        }
      } catch (err) {
        setIsLoading(false);
        error('Cannot Save Replenishment template');
      }
    } else {
      error('Please fill all required fields');
    }
  };

  const handleReset = () => {
    const tempReplenishment = replenishmentTemplates.find(
      replenishment => replenishment.id === tplSettings.id
    );
    if (tempReplenishment) {
      if (tempReplenishment.carrier_type === 'amz') {
        setIsAPC(true);
      } else {
        setIsAPC(false);
      }
      if (tempReplenishment.method === 'SP') {
        setIsSPD(true);
      } else {
        setIsSPD(false);
      }
      setTplSettings(tempReplenishment);
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
                value={tplSettings.name}
                label={'New Template'}
                placeholder={'Template Name'}
                onChangeHandler={(id: string, value: string | number) => {
                  updateSellerDatabaseFilter(id, value);
                }}
                isNew={true}
                dataKey={'name'}
              />
            ) : (
              <ThreePLManagerSettingsHeaderForm
                value={`${tplSettings.id}`}
                label={'Select Template'}
                placeholder={'Template'}
                onChangeHandler={(id: string, value: string | number) => {
                  const tempReplenishment = replenishmentTemplates.find(
                    replenishment => replenishment.id === Number(value)
                  );
                  if (tempReplenishment) {
                    if (tempReplenishment.carrier_type === 'amz') {
                      setIsAPC(true);
                    } else {
                      setIsAPC(false);
                    }
                    if (tempReplenishment.method === 'SP') {
                      setIsSPD(true);
                    } else {
                      setIsSPD(false);
                    }
                    setTplSettings(tempReplenishment);
                  }
                }}
                isNew={false}
                dataKey={'name'}
                options={replenishmentOptions}
                addNewBtnLabel={'+ create new template'}
                handleAddNewBtn={() => setIsNew(true)}
              />
            )}
            <hr />
            <FormTemplate
              onChangeHandler={(id: string, value: string | number) => {
                updateSellerDatabaseFilter(id, value);
              }}
              formInputs={REPLENISHMENT_SETTINGS_FORM.formInputs}
              formData={tplSettings}
            />
            <hr />
            <p className={styles.label}>SHIPPING SERVICE</p>
            <div className={styles.shippingSection}>
              <div className={styles.shippingMethod}>
                <p className={styles.label}>Shipping Method</p>
                <Checkbox
                  radio
                  checked={isSPD}
                  label="Small Parcel Delivery (SPD)"
                  onChange={() => {
                    if (!isSPD) {
                      updateSellerDatabaseFilter('method', 'SP');
                      setIsSPD(true);
                    }
                  }}
                  className={!isSPD ? `${styles.label} ${styles.disabled}` : `${styles.label}`}
                />
              </div>
              <div>
                <p className={styles.label}>Shipping Carrier</p>
                <Checkbox
                  radio
                  checked={isAPC}
                  label="Amazon partnered carrier"
                  onChange={() => {
                    if (!isAPC) {
                      updateSellerDatabaseFilter('carrier_type', 'amz');
                      setIsAPC(true);
                    }
                  }}
                  className={
                    !isSPD || !isAPC ? `${styles.label} ${styles.disabled}` : `${styles.label}`
                  }
                  disabled={!isSPD}
                />
                <div>
                  <Checkbox
                    radio
                    // checked={!isAPC}
                    checked={false}
                    label="Non-Amazon partnered carrier"
                    // onChange={() => {
                    //   if (isAPC) {
                    //     updateSellerDatabaseFilter('carrier_type', 'non_amz');
                    //     setIsAPC(false);
                    //   }
                    // }}
                    className={
                      !isSPD || isAPC ? `${styles.label} ${styles.disabled}` : `${styles.label}`
                    }
                    // disabled={!isSPD}
                    disabled={true}
                  />
                  <SelectionFilter
                    placeholder="Non Amazon partnered carrier"
                    filterOptions={NON_AMAZAON_PARTNERED_CARRIERS}
                    value={tplSettings.carrier_name}
                    handleChange={(value: string) => {
                      console.log(value);
                      // updateSellerDatabaseFilter('carrier_name', value);
                    }}
                    // disabled={isAPC}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <Checkbox
              radio
              // checked={!isSPD}
              checked={false}
              label="Less than truckload (LTL)"
              // onChange={() => {
              //   if (isSPD) {
              //     updateSellerDatabaseFilter('method', 'ltl');
              //     setIsSPD(false);
              //   }
              // }}
              disabled={true}
              className={isSPD ? `${styles.label} ${styles.disabled}` : `${styles.label}`}
            />
            <div className={styles.buttonsRow}>
              <ActionButton
                variant="reset"
                size="md"
                className={styles.resetButton}
                onClick={() => {
                  if (isNew) {
                    setIsNew(false);
                    const tempReplenishment = replenishmentTemplates[0];
                    if (tempReplenishment) {
                      if (tempReplenishment.carrier_type === 'amz') {
                        setIsAPC(true);
                      } else {
                        setIsAPC(false);
                      }
                      if (tempReplenishment.method === 'SP') {
                        setIsSPD(true);
                      } else {
                        setIsSPD(false);
                      }
                      setTplSettings(tempReplenishment);
                    }
                  } else {
                    handleReset();
                  }
                }}
                disabled={isNew && !(replenishmentTemplates.length > 0)}
              >
                Cancel
              </ActionButton>
              <ActionButton
                className={styles.applyButton}
                variant="secondary"
                type="purpleGradient"
                size="md"
                onClick={() => {
                  handleSubmit();
                }}
                disabled={false}
              >
                Save
              </ActionButton>
            </div>
          </>
        )}
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    tplVendors: getTplVendors(state),
    activeTplVendor: getTplActiveVendor(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createUpdateTplVendor: (payload: TplVendor) => dispatch(createUpdateTplVendor(payload)),
    setTplActiveVendor: (vendor: TplVendor) => dispatch(setTplActiveVendor(vendor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplenishmentCore);
