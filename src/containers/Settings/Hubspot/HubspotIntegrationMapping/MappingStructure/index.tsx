import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';
import ActionButton from '../../../../../components/ActionButton';

/* Selectors */
import { sellerIDSelector } from '../../../../../selectors/Seller';

/* Assets */
import SellgoLogo from '../../../../../assets/images/sellgo_logo.svg';
import MappingLogo from '../../../../../assets/images/link-simple-solid.svg';
import HubspotLogo from '../../../../../assets/images/hubspot.svg';

/* Utils */
import { error, success } from '../../../../../utils/notifications';
import history from '../../../../../history';
import { AppConfig } from '../../../../../config';

/* Constants */
import { NON_EDITABLE_FIELDS, canSubmitHubspotMappings } from '../../../../../constants/Hubspot';

type IOption = {
  key: string;
  value: string;
  text: string;
};

interface Props {
  mappingType: 'companies' | 'contacts';
  hubspotProperties: IOption[];
  step: number;
  setStep: (a: number) => void;
  hubspotPropertiesType: any;
}

const HubSpotIntegrationMappingStructure = (props: Props) => {
  const { mappingType, hubspotProperties, step, setStep, hubspotPropertiesType } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hubspotFilterOptions, sethubspotFilterOptions] = useState<IOption[]>([]);
  const [properties, setProperties] = useState([
    { id: 0, sellgo_prop: '', hubspot_prop: '', sellgo_prop_type: '' },
  ]);
  const [errorIndex, setErrorIndex] = useState<number[]>([-1]);
  const getHubspotMapping = async () => {
    setIsLoading(true);
    try {
      const sellerId = sellerIDSelector();
      const res = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerId}/hubspot-mappings/${mappingType}`
      );
      if (res.status === 200) {
        const { data } = res;
        setProperties(data);
        const hubspotMappedProperties = data.map(
          (hubspotMappedProperty: any) => hubspotMappedProperty.hubspot_prop
        );
        const filteredProperties = hubspotProperties.filter(
          hubspotMappedProperty =>
            hubspotMappedProperties.indexOf(hubspotMappedProperty.value) === -1
        );
        sethubspotFilterOptions([...filteredProperties]);
        setIsLoading(false);
      }
    } catch (e) {
      if (e.response && e.response.data) {
        error(e.response.data.message);
      }
    }
  };

  useEffect(() => {
    getHubspotMapping();
  }, [step]);

  //   useEffect(() => {
  //     if (isConnectedToHubspot) {
  //       setTimeout(() => {
  //         history.push('/settings/hb-mapping');
  //       }, 3000);
  //     }
  //   }, [isConnectedToHubspot]);

  const updateHubspotPropertyValue = (index: number, value: string) => {
    const tempHubSpotFilters = hubspotFilterOptions.filter(
      hubspotFilterOption => hubspotFilterOption.value !== value
    );

    const tempProperties = properties;
    const isError =
      value &&
      hubspotPropertiesType[value] &&
      hubspotPropertiesType[value] !== tempProperties[index].sellgo_prop_type;

    tempProperties[index].hubspot_prop = value;
    sethubspotFilterOptions([...tempHubSpotFilters]);
    setProperties([...tempProperties]);
    if (isError) {
      setErrorIndex([...errorIndex, index]);
    } else {
      const errIndex = errorIndex.indexOf(index);
      if (errIndex > -1) {
        const tempErrIndexes = errorIndex;
        tempErrIndexes.splice(errIndex, 1);
        setErrorIndex([...tempErrIndexes]);
      }
    }
  };

  const submitHubspotProperties = async () => {
    setIsSubmitting(true);
    const errMsg = canSubmitHubspotMappings(properties, hubspotPropertiesType);
    if (errMsg) {
      error(errMsg);
      setIsSubmitting(false);
      return;
    }
    try {
      const sellerId = sellerIDSelector();
      const res = await axios.post(
        `${AppConfig.BASE_URL_API}sellers/${sellerId}/hubspot-mappings/${mappingType}`,
        {
          mappings: properties,
        }
      );
      if (res.status === 201) {
        success(`${mappingType} hubspot properties updated successfully`);
        setIsSubmitting(false);
        if (step === 0) {
          setStep(1);
        } else if (step === 1) {
          setStep(2);
        }
      }
    } catch (e) {
      if (e.response && e.response.data) {
        error(e.response.data.message);
      }
    }
  };

  const handleBackClick = () => {
    if (step === 0) {
      history.push('/settings/integration/hubspot');
    }
    if (step === 1) {
      setStep(0);
    }
  };

  return (
    <div className={styles.mappingPage}>
      {!isLoading && (
        <>
          <div className={styles.mappingWrapper}>
            <div className={styles.sellgoProperties}>
              <div className={styles.labelWrapper}>
                <Image src={SellgoLogo} />
                <p className={styles.labelWrapper__label}>Sellgo property</p>
              </div>
              <div className={styles.sellgoProperties__box}>
                {properties.map(property => (
                  <div
                    key={property.sellgo_prop}
                    className={styles.sellgoProperties__propertyWrapper}
                  >
                    <p className={styles.sellgoProperties__name}>{property.sellgo_prop}</p>
                    <p className={styles.sellgoProperties__dataType}>{property.sellgo_prop_type}</p>
                  </div>
                ))}
              </div>
            </div>
            <Image src={MappingLogo} className={styles.mappingLinkLogo} />
            <div className={styles.hubspotProperties}>
              <div className={styles.labelWrapper}>
                <Image src={HubspotLogo} />
                <p className={styles.labelWrapper__label}>Hubspot property</p>
              </div>
              <div className={styles.hubspotProperties__box}>
                {properties.map((property, index) => {
                  const { sellgo_prop, hubspot_prop } = property;
                  const isDisabled = step === 1 && NON_EDITABLE_FIELDS.indexOf(sellgo_prop) >= 0;
                  const filteringOptions = [
                    { key: '', value: '', text: '-' },
                    ...hubspotFilterOptions,
                  ];
                  const currentFilter = hubspotProperties.find(
                    hubspotProperty => hubspotProperty.value === property.hubspot_prop
                  );
                  if (currentFilter) {
                    filteringOptions.unshift(currentFilter);
                  }
                  return (
                    <div key={index} className={styles.hubspotProperties__propertyWrapper}>
                      <SelectionFilter
                        label=""
                        placeholder="-"
                        key={index}
                        filterOptions={filteringOptions}
                        value={hubspot_prop}
                        handleChange={(value: string) => {
                          updateHubspotPropertyValue(index, value);
                        }}
                        className={`${styles.hubspotProperties__name} ${isDisabled &&
                          styles.hubspotProperties__name_disabled}`}
                        disabled={isDisabled}
                        textStyleEllipsis={true}
                        error={errorIndex.indexOf(index) >= 0}
                      />
                      <p className={styles.hubspotProperties__dataType}>
                        {hubspot_prop ? hubspotPropertiesType[hubspot_prop] : '-'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.formSearchAndReset}>
            <ActionButton variant="reset" size="md" onClick={handleBackClick}>
              {'back'}
            </ActionButton>

            <ActionButton
              variant={'secondary'}
              type={'black'}
              size="md"
              onClick={submitHubspotProperties}
              loading={isSubmitting}
              className={styles.submitButton}
            >
              {'Continue'}
            </ActionButton>
          </div>
        </>
      )}
    </div>
  );
};

export default HubSpotIntegrationMappingStructure;
