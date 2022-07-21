import React, { useState } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { TplVendor } from '../../../../../interfaces/PerfectStock/Tpl';

/* Constants */
import {
  DEFAULT_NEW_TPL_VENDOR,
  TPL_META_SETTINGS_FORM,
  TPL_MONTHLY_STORAGE_COST_FORM,
} from '../../../../../constants/PerfectStock/Tpl';

/* Actions */
import { createUpdateTplVendor, setTplActiveVendor } from '../../../../../actions/PerfectStock/Tpl';

/* Components */
import ThreePLManagerSettingsHeaderForm from '../../../../../components/ThreePLManagerSettingsHeaderForm';
import FormTemplate from '../../../../../components/FormTemplate';
import ActionButton from '../../../../../components/ActionButton';
import BoxContainer from '../../../../../components/BoxContainer';
import Placeholder from '../../../../../components/Placeholder';

/* Selectors */
import {
  getTplActiveVendor,
  getTplVendors,
  getIsLoadingTplVendors,
} from '../../../../../selectors/PerfectStock/Tpl';
import { error } from '../../../../../utils/notifications';

interface Props {
  createUpdateTplVendor: (payload: TplVendor) => void;
  tplVendors: TplVendor[];
  isLoadingTplVendors: boolean;
  activeTplVendor: TplVendor;
  setTplActiveVendor: (vendor: TplVendor) => void;
}

const TplSettingsCore = (props: Props) => {
  const { tplVendors, isLoadingTplVendors, createUpdateTplVendor } = props;
  const [tplSettings, setTplSettings] = useState<TplVendor>(DEFAULT_NEW_TPL_VENDOR);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [tplVendorsOptions, setTplVendorsOptions] = useState<any>([]);

  const setTplVendorNameValue = () => {
    const temp: any = [];
    tplVendors.forEach(vendor => {
      temp.push({
        value: `${vendor.id}`,
        key: vendor.name,
        text: vendor.name,
      });
    });
    setTplVendorsOptions([...temp]);
  };

  const handleStateManagement = (isDisabled: boolean) => {
    vendorIdOptions: for (const formRows of TPL_META_SETTINGS_FORM.formInputs) {
      for (const obj of formRows.formRow) {
        if (obj.id === 'state') {
          obj.disabled = isDisabled;
          break vendorIdOptions;
        }
      }
    }
  };

  React.useEffect(() => {
    if (!(tplVendors && tplVendors.length > 0)) {
      setIsNew(true);
    } else {
      setTplSettings(tplVendors[0]);
      setTplVendorNameValue();
      setIsNew(false);
    }
  }, [tplVendors]);

  React.useEffect(() => {
    if (isNew) {
      setTplSettings(DEFAULT_NEW_TPL_VENDOR);
    }
  }, [isNew]);

  const updateSellerDatabaseFilter = (key: string, value: any) => {
    if (key === 'country') {
      if (value !== 'US') {
        handleStateManagement(true);
      } else {
        handleStateManagement(false);
      }
    }
    setTplSettings({
      ...tplSettings,
      [key]: value,
    });
  };
  /* Handlers */
  const validateSubmission = () => {
    if (!(tplSettings && tplSettings.name && tplSettings.name !== '')) {
      return false;
    }
    if (!(tplSettings && tplSettings.state && tplSettings.state !== '')) {
      return false;
    }
    if (!(tplSettings && tplSettings.address && tplSettings.address !== '')) {
      return false;
    }
    if (!(tplSettings && tplSettings.city && tplSettings.city !== '')) {
      return false;
    }
    if (!(tplSettings && tplSettings.state && tplSettings.state !== '')) {
      if (tplSettings.country === 'US') {
        return false;
      }
    }
    if (!(tplSettings && tplSettings.zip_code && tplSettings.zip_code.toString() !== '')) {
      return false;
    }
    if (!(tplSettings && tplSettings.country && tplSettings.country !== '')) {
      return false;
    }
    if (!(tplSettings && tplSettings.monthly_cost_q1 && tplSettings.monthly_cost_q1 !== '')) {
      return false;
    }
    if (!(tplSettings && tplSettings.monthly_cost_q2 && tplSettings.monthly_cost_q2 !== '')) {
      return false;
    }
    if (!(tplSettings && tplSettings.monthly_cost_q3 && tplSettings.monthly_cost_q3 !== '')) {
      return false;
    }
    if (!(tplSettings && tplSettings.monthly_cost_q4 && tplSettings.monthly_cost_q4 !== '')) {
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateSubmission()) {
      const payload = {
        ...tplSettings,
        marketplace_id: 'ATVPDKIKX0DER',
      };
      if (tplSettings.country === 'US') {
        payload.state = '';
      }
      createUpdateTplVendor({
        ...payload,
      });
    } else {
      error('Please fill the required fields');
    }
  };

  const handleReset = () => {
    const tempTplVendor = tplVendors.find(tplVendor => tplVendor.id === tplSettings.id);
    if (tempTplVendor) {
      setTplSettings(tempTplVendor);
    }
  };

  return (
    <>
      <p className={styles.heading}>Set Shipment Packing Template via Webapp</p>
      {isLoadingTplVendors && (
        <BoxContainer className={styles.boxContainer}>
          <Placeholder numberRows={5} numberParagraphs={1} />
        </BoxContainer>
      )}
      {!isLoadingTplVendors && (
        <section className={styles.filterSection}>
          {isNew && (
            <ThreePLManagerSettingsHeaderForm
              value={tplSettings?.name}
              label={'New Vendor name'}
              placeholder={'New Vendor'}
              onChangeHandler={(id: string, value: string | number) => {
                updateSellerDatabaseFilter(id, value);
              }}
              isNew={true}
              dataKey={'name'}
            />
          )}
          {!isNew && (
            <ThreePLManagerSettingsHeaderForm
              value={`${tplSettings?.id}`}
              label={'Select 3PL'}
              placeholder={'3PL Name'}
              onChangeHandler={(id: string, value: string | number) => {
                const tempTplVendor = tplVendors.find(tplVendor => tplVendor.id === Number(value));
                if (tempTplVendor) {
                  setTplSettings(tempTplVendor);
                }
              }}
              isNew={false}
              dataKey={'name'}
              options={tplVendorsOptions}
              addNewBtnLabel={'+ add new vendor'}
              handleAddNewBtn={() => {
                setIsNew(true);
              }}
            />
          )}
          <hr />
          <FormTemplate
            onChangeHandler={(id: string, value: string | number) => {
              updateSellerDatabaseFilter(id, value);
            }}
            formInputs={TPL_META_SETTINGS_FORM.formInputs}
            formData={tplSettings}
          />
          <hr />
          <FormTemplate
            onChangeHandler={(id: string, value: string | number) => {
              updateSellerDatabaseFilter(id, value);
            }}
            formInputs={TPL_MONTHLY_STORAGE_COST_FORM.formInputs}
            formData={tplSettings || DEFAULT_NEW_TPL_VENDOR}
          />
          <div className={styles.buttonsRow}>
            <ActionButton
              variant="reset"
              size="md"
              className={styles.resetButton}
              onClick={() => {
                if (isNew) {
                  setTplSettings(tplVendors[0]);
                  setTplVendorNameValue();
                  setIsNew(false);
                } else {
                  handleReset();
                }
              }}
              disabled={isNew && !(tplVendors.length > 0)}
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
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingTplVendors: getIsLoadingTplVendors(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(TplSettingsCore);
