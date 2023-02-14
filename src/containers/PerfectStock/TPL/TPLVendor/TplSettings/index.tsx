import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { TplVendor } from '../../../../../interfaces/PerfectStock/Tpl';

/* Constants */
import {
  DEFAULT_US_MARKET,
  SELLER_DB_MARKETPLACE,
} from '../../../../../constants/SellerResearch/SellerDatabase';
import { DEFAULT_NEW_TPL_VENDOR, TPL_STATUSES } from '../../../../../constants/PerfectStock/Tpl';
import {
  COUNTRY_DROPDOWN_LIST,
  STATES_DROPDOWN_LIST,
} from '../../../../../constants/SellerResearch/SellerMap';

/* Actions */
import { createUpdateTplVendor } from '../../../../../actions/PerfectStock/Tpl';
import { updateCashflowOnboardingStatus } from '../../../../../actions/PerfectStock/Home';

/* Components */
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import FormFilterActions from '../../../../../components/FormFilters/FormFilterActions';
import MarketPlaceFilter from '../../../../../components/FormFilters/MarketPlaceFilter';
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';
import DisplayToggle from '../../../../../components/DisplayToggle';
import { ReactComponent as ExclaimationIcon } from '../../../../../assets/images/circle-exclamation-solid.svg';

/* Selectors */
import { getTplActiveVendor } from '../../../../../selectors/PerfectStock/Tpl';
import { getCashflowOnboardingStatus } from '../../../../../selectors/PerfectStock/Cashflow';

/* Utils */

import { validateNumberField } from '../../../../../utils/numberFieldValidation';

interface Props {
  createUpdateTplVendor: (payload: TplVendor) => void;
  activeTplVendor: TplVendor;

  cashflowOnboardingStatus: any[];
  updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) => void;
}

const TplSettings = (props: Props) => {
  const {
    createUpdateTplVendor,
    activeTplVendor,
    cashflowOnboardingStatus,
    updateCashflowOnboardingStatus,
  } = props;
  const [tplSettings, setTplSettings] = useState<TplVendor>(
    activeTplVendor || DEFAULT_NEW_TPL_VENDOR
  );
  const [showTplMetaSettings, setShowTplMetaSettings] = useState(false);
  const [showTplMonthlyStorageCost, setShowTplMonthlyStorageCost] = useState(false);
  const [storageCostError, setSetStorageCostError] = useState(false);
  const tplOnboardingStatusId = cashflowOnboardingStatus.find(status => {
    return status.step_name === 'tpl_storage_fee' && !status.is_completed;
  })?.id;

  React.useEffect(() => {
    setTplSettings(activeTplVendor || DEFAULT_NEW_TPL_VENDOR);
  }, [activeTplVendor]);

  React.useEffect(() => {
    if (
      !tplSettings.monthly_cost_q1 ||
      !tplSettings.monthly_cost_q2 ||
      !tplSettings.monthly_cost_q3 ||
      !tplSettings.monthly_cost_q4
    ) {
      setSetStorageCostError(true);
    } else {
      setSetStorageCostError(false);
    }
  }, [
    tplSettings.monthly_cost_q1,
    tplSettings.monthly_cost_q2,
    tplSettings.monthly_cost_q3,
    tplSettings.monthly_cost_q4,
  ]);

  const updateSellerDatabaseFilter = (key: string, value: any) => {
    setTplSettings({
      ...tplSettings,
      [key]: value,
    });
  };

  /* Handlers */
  const handleSubmit = () => {
    createUpdateTplVendor({
      ...tplSettings,
    });
    if (tplOnboardingStatusId) {
      updateCashflowOnboardingStatus(tplOnboardingStatusId, true);
    }
  };

  const handleReset = (resetSettings: { resetDetails?: boolean; resetStorageCost?: boolean }) => {
    const { resetDetails } = resetSettings;
    let resetedTplVendor;

    if (resetDetails) {
      resetedTplVendor = {
        ...activeTplVendor,
        monthly_cost_q1: tplSettings.monthly_cost_q1,
        monthly_cost_q2: tplSettings.monthly_cost_q2,
        monthly_cost_q3: tplSettings.monthly_cost_q3,
        monthly_cost_q4: tplSettings.monthly_cost_q4,
      };
    } else {
      resetedTplVendor = {
        ...tplSettings,
        monthly_cost_q1: activeTplVendor.monthly_cost_q1,
        monthly_cost_q2: activeTplVendor.monthly_cost_q2,
        monthly_cost_q3: activeTplVendor.monthly_cost_q3,
        monthly_cost_q4: activeTplVendor.monthly_cost_q4,
      };
    }
    setTplSettings(resetedTplVendor);
  };

  return (
    <>
      <section className={styles.filterSection}>
        <DisplayToggle
          title="DETAIL"
          collapsed={!showTplMetaSettings}
          handleClick={() => setShowTplMetaSettings(!showTplMetaSettings)}
          collapsedColor="#F7F7F7"
          expandedColor="#CED4D9"
          collapsedFontColor="#636D76"
          expandedFontColor="#1E1E1E"
          collapsedArrowColor="#636D76"
          expandedArrowColor="#1E1E1E"
        />
        {showTplMetaSettings && (
          <div className={styles.basicFilters}>
            <div className={styles.firstRow}>
              {/* 3PL NAME */}
              <InputFilter
                label="3PL Name"
                placeholder="3PL Name"
                value={tplSettings.name || ''}
                handleChange={(value: string) => updateSellerDatabaseFilter('name', value)}
                className={`
                  ${styles.inputFilter}
                  ${styles.inputFilter__name}
                `}
              />

              {/* STATUS */}
              <SelectionFilter
                label="Status"
                placeholder="STATUS"
                filterOptions={TPL_STATUSES}
                value={tplSettings.status || ''}
                handleChange={(value: string) => updateSellerDatabaseFilter('status', value)}
                className={`
                  ${styles.inputFilter}
                  ${styles.inputFilter__short}
                `}
              />

              {/* Marketplace */}
              <div
                className={`
                ${styles.inputFilter}
                ${styles.inputFilter__marketplace}
              `}
              >
                <MarketPlaceFilter
                  label="Choose Marketplace"
                  marketplaceDetails={DEFAULT_US_MARKET}
                  marketPlaceChoices={SELLER_DB_MARKETPLACE}
                  handleChange={() => null}
                />
              </div>

              {/* ACCOUNT NUMBER */}
              <InputFilter
                label="Account Number"
                placeholder="Account Number"
                value={tplSettings.account_number || ''}
                handleChange={(value: string) =>
                  updateSellerDatabaseFilter('account_number', value)
                }
                className={`
                  ${styles.inputFilter}
                `}
              />
            </div>

            <div className={styles.secondRow}>
              {/* Address */}
              <InputFilter
                label="Address"
                placeholder="Address"
                value={tplSettings.address || ''}
                handleChange={(value: string) => updateSellerDatabaseFilter('address', value)}
                className={`
                  ${styles.inputFilter}
                  ${styles.inputFilter__long}
                `}
              />

              {/* City */}
              <InputFilter
                label="City"
                placeholder="City"
                value={tplSettings.city || ''}
                handleChange={(value: string) => updateSellerDatabaseFilter('city', value)}
                className={`
                  ${styles.inputFilter}
                `}
              />

              {/* All States */}
              <SelectionFilter
                label="U.S. States"
                placeholder="All States"
                filterOptions={STATES_DROPDOWN_LIST}
                value={tplSettings.state || ''}
                handleChange={(value: string) => updateSellerDatabaseFilter('state', value)}
                disabled={tplSettings.country !== 'US'}
                className={`
                  ${styles.inputFilter}
                  ${styles.inputFilter__short}
                `}
              />

              {/* Zip code */}
              <InputFilter
                label="Zip code"
                placeholder="Zip code"
                value={tplSettings.zip_code?.toString() || ''}
                handleChange={(value: string) => updateSellerDatabaseFilter('zip_code', value)}
                isNumber
                isPositiveOnly
                className={`
                  ${styles.inputFilter}
                  ${styles.inputFilter__short}
                `}
              />

              {/* Country */}
              <SelectionFilter
                label="Country"
                placeholder="Country"
                filterOptions={COUNTRY_DROPDOWN_LIST}
                value={tplSettings.country || ''}
                handleChange={(value: string) => {
                  updateSellerDatabaseFilter('country', value);
                }}
                className={`
                  ${styles.inputFilter}
                `}
              />
            </div>
            <FormFilterActions
              isBlack
              onFind={handleSubmit}
              onReset={() => handleReset({ resetDetails: true })}
              disabled={false}
              submitLabel={'Apply'}
            />
          </div>
        )}
        <br />
        <DisplayToggle
          title="MONTHLY STORAGE COST"
          collapsed={!showTplMonthlyStorageCost}
          handleClick={() => setShowTplMonthlyStorageCost(!showTplMonthlyStorageCost)}
          collapsedColor="#F7F7F7"
          expandedColor="#CED4D9"
          collapsedFontColor="#636D76"
          expandedFontColor="#1E1E1E"
          collapsedArrowColor="#636D76"
          expandedArrowColor="#1E1E1E"
          collapsedIcon={storageCostError ? <ExclaimationIcon /> : <div />}
          expandedIcon={storageCostError ? <ExclaimationIcon /> : <div />}
        />
        {showTplMonthlyStorageCost && (
          <div className={styles.advancedFiltersWrapper}>
            <p>MONTHLY STORAGE COST PER CBM</p>
            <div className={styles.advancedFilters}>
              {/* MONTHLY STORAGE COST PER PALLET */}
              <div>
                <p>Q1: </p>
                <Input
                  placeholder="Q1"
                  value={tplSettings.monthly_cost_q1?.toString() || ''}
                  onChange={(e: any) => {
                    const value = e.target.value;
                    if (validateNumberField(value, true, false, true, true)) {
                      updateSellerDatabaseFilter('monthly_cost_q1', value);
                    }
                  }}
                  className={`
                  ${styles.inputFilter}
                  ${styles.inputFilter__storageCost}
                `}
                />
                {!tplSettings.monthly_cost_q1 && (
                  <ExclaimationIcon className={styles.exclaimationIcon} />
                )}
              </div>
              <div>
                <p>Q2: </p>
                <Input
                  placeholder="Q2"
                  value={tplSettings.monthly_cost_q2?.toString() || ''}
                  onChange={(e: any) => {
                    const value = e.target.value;
                    if (validateNumberField(value, true, false, true, true)) {
                      updateSellerDatabaseFilter('monthly_cost_q2', value);
                    }
                  }}
                  className={`
                  ${styles.inputFilter}
                  ${styles.inputFilter__storageCost}
                `}
                />
                {!tplSettings.monthly_cost_q2 && (
                  <ExclaimationIcon className={styles.exclaimationIcon} />
                )}
              </div>
              <div>
                <p>Q3: </p>
                <Input
                  placeholder="Q3"
                  value={tplSettings.monthly_cost_q3?.toString() || ''}
                  onChange={(e: any) => {
                    const value = e.target.value;
                    if (validateNumberField(value, true, false, true, true)) {
                      updateSellerDatabaseFilter('monthly_cost_q3', value);
                    }
                  }}
                  className={`
                  ${styles.inputFilter}
                  ${styles.inputFilter__storageCost}
                `}
                />

                {!tplSettings.monthly_cost_q3 && (
                  <ExclaimationIcon className={styles.exclaimationIcon} />
                )}
              </div>
              <div>
                <p>Q4: </p>
                <Input
                  placeholder="Q4"
                  value={tplSettings.monthly_cost_q4?.toString() || ''}
                  onChange={(e: any) => {
                    const value = e.target.value;
                    if (validateNumberField(value, true, false, true, true)) {
                      updateSellerDatabaseFilter('monthly_cost_q4', value);
                    }
                  }}
                  className={`
                  ${styles.inputFilter}
                  ${styles.inputFilter__storageCost}
                `}
                />
                {!tplSettings.monthly_cost_q4 && (
                  <ExclaimationIcon className={styles.exclaimationIcon} />
                )}
              </div>
            </div>
            <FormFilterActions
              isBlack
              onFind={handleSubmit}
              onReset={() => handleReset({ resetStorageCost: true })}
              disabled={false}
              submitLabel={'Apply'}
            />
          </div>
        )}
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    activeTplVendor: getTplActiveVendor(state),
    cashflowOnboardingStatus: getCashflowOnboardingStatus(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createUpdateTplVendor: (payload: TplVendor) => dispatch(createUpdateTplVendor(payload)),
    updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) =>
      dispatch(updateCashflowOnboardingStatus(onboardingCostId, newStatus)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TplSettings);
