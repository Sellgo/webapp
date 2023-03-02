import React, { useState, useEffect } from 'react';
import axios from 'axios';

/* Styles */
import styles from './index.module.scss';

/* Components */
// import SettingsNav from '../../SettingsNav';
// import PageHeader from '../../../../components/PageHeader';
import { error, success } from '../../../../../utils/notifications';
// import history from '../../../../../history';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';
import { Image } from 'semantic-ui-react';
import SellgoLogo from '../../../../../assets/images/sellgo_logo.svg';
import MappingLogo from '../../../../../assets/images/link-simple-solid.svg';
import ActionButton from '../../../../../components/ActionButton';
import history from '../../../../../history';

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
}

const HubSpotIntegrationMappingStructure = (props: Props) => {
  const { mappingType, hubspotProperties, step, setStep } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hubspotFilterOptions, sethubspotFilterOptions] = useState<IOption[]>([]);
  const [properties, setProperties] = useState([{ is: 0, sellgo_prop: '', hubspot_prop: '' }]);
  const getHubspotMapping = async () => {
    setIsLoading(true);
    try {
      const sellerId = sellerIDSelector();
      const res = await axios.get(
        `http://3.230.118.67/api/sellers/${sellerId}/hubspot-mappings/${mappingType}`
      );
      if (res.status === 200) {
        const { data } = res;
        setProperties(data);
        console.log(isLoading);
        const hubspotMappedProperties = data.map(
          (hubspotMappedProperty: any) => hubspotMappedProperty.hubspot_prop
        );
        console.log('hubspotMappedProperties', hubspotMappedProperties);
        const filteredProperties = hubspotProperties.filter(
          hubspotMappedProperty =>
            hubspotMappedProperties.indexOf(hubspotMappedProperty.value) === -1
        );
        console.log('filteredProperties', filteredProperties);
        sethubspotFilterOptions([...filteredProperties, { key: '', value: '', text: '-' }]);
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
    console.log('index', index);
    const tempHubSpotFilters = hubspotFilterOptions.filter(
      hubspotFilterOption => hubspotFilterOption.value !== value
    );
    const tempProperties = properties;
    tempProperties[index].hubspot_prop = value;
    sethubspotFilterOptions([...tempHubSpotFilters]);
    setProperties([...tempProperties]);
  };

  const submitHubspotProperties = async () => {
    setIsSubmitting(true);
    try {
      const sellerId = sellerIDSelector();
      const res = await axios.post(
        `http://3.230.118.67/api/sellers/${sellerId}/hubspot-mappings/${mappingType}`,
        {
          mappings: properties,
        }
      );
      if (res.status === 201) {
        // const { data } = res;
        console.log(res);
        success(`${mappingType} hubspot properties updated successfully`);
        setIsSubmitting(false);
        if (step === 0) {
          setStep(1);
        } else if (step === 1) {
          history.push('/new');
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
                <p className={styles.labelWrapper__label}>Sellgo property for Company</p>
              </div>
              <div className={styles.sellgoProperties__box}>
                {console.log('proper', properties)}
                {properties.map(property => (
                  <p key={property.sellgo_prop} className={styles.sellgoProperties__name}>
                    {property.sellgo_prop}
                  </p>
                ))}
              </div>
            </div>
            <Image src={MappingLogo} className={styles.mappingLinkLogo} />
            <div className={styles.hubspotProperties}>
              <div className={styles.labelWrapper}>
                <Image src={SellgoLogo} />
                <p className={styles.labelWrapper__label}>Hubspot property</p>
              </div>
              <div className={styles.hubspotProperties__box}>
                {properties.map((property, index) => {
                  const filteringOptions = [...hubspotFilterOptions];
                  const currentFilter = hubspotProperties.find(
                    hubspotProperty => hubspotProperty.value === property.hubspot_prop
                  );
                  if (currentFilter) {
                    filteringOptions.push(currentFilter);
                  }
                  return (
                    <SelectionFilter
                      label=""
                      placeholder="-"
                      key={index}
                      filterOptions={filteringOptions}
                      value={property.hubspot_prop}
                      handleChange={(value: string) => {
                        updateHubspotPropertyValue(index, value);
                        console.log(value);
                      }}
                      className={styles.hubspotProperties__name}
                    />
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
              type={'purpleGradient'}
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
