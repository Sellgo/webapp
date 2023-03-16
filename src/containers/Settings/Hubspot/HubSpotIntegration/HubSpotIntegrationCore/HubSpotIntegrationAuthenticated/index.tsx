/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Image, Placeholder } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Selectors */
import { sellerIDSelector } from '../../../../../../selectors/Seller';

/* Components */
import ActionButton from '../../../../../../components/ActionButton';
import axios from 'axios';

/* Utils */
import { error, success } from '../../../../../../utils/notifications';

/* Assets */
import MappingLogo from '../../../../../../assets/images/link-simple-solid.svg';
import SellgoLogo from '../../../../../../assets/images/sellgo_logo.svg';

/* Constants */
import history from '../../../../../../history';
import { AppConfig } from '../../../../../../config';

interface Props {
  hubspotAuthId: string;
  setIsAuthenticated: (a: boolean) => void;
}
const HubSpotIntegrationAuthenticated = (props: Props) => {
  const { hubspotAuthId, setIsAuthenticated } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [properties, setProperties] = useState([{ id: 0, sellgo_prop: '', hubspot_prop: '' }]);

  const disconnectHubspotAuth = async () => {
    setIsSubmitting(true);
    const formData = new FormData();

    formData.set('status', 'inactive');

    try {
      const sellerId = sellerIDSelector();
      const res = await axios.patch(
        `${AppConfig.BASE_URL_API}sellers/${sellerId}/hubspot-auth/${hubspotAuthId}`,
        formData
      );
      if (res.status === 200) {
        // const { data } = res;
        console.log(res);
        success(`Hubspot disconnected successfully`);
        setIsAuthenticated(false);
        setIsSubmitting(false);
      }
    } catch (e) {
      if (e.response && e.response.data) {
        error(e.response.data.message);
      }
    }
  };

  const getHubspotMapping = async () => {
    setIsLoading(true);
    let mappingType;
    if (step === 0) {
      mappingType = 'companies';
    } else {
      mappingType = 'contacts';
    }
    try {
      const sellerId = sellerIDSelector();
      const res = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerId}/hubspot-mappings/${mappingType}`
      );
      if (res.status === 200) {
        const { data } = res;
        setProperties(data);
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

  return (
    <div className={styles.hubspotCore}>
      <>
        <div className={styles.hubspotCore__details}>
          <div className={styles.options}>
            <p className={styles.hubspotCore__label}>Status: CONNECTED</p>
            <ActionButton
              variant={'secondary'}
              type={'grey'}
              size="md"
              onClick={disconnectHubspotAuth}
              loading={isSubmitting}
              className={styles.submitButton}
            >
              {'Disconnect'}
            </ActionButton>
          </div>
          <div className={styles.options}>
            <p className={styles.hubspotCore__label}>Current mapping</p>
            <ActionButton
              variant={'primary'}
              type={'grey'}
              size="md"
              onClick={() => history.push('/settings/hs-mapping')}
              loading={isSubmitting}
              className={styles.submitButton}
            >
              {'Edit Mapping'}
            </ActionButton>
          </div>
        </div>
        <div className={styles.tabs}>
          <p className={`${styles.tab} ${step === 0 && styles.active}`} onClick={() => setStep(0)}>
            Companies
          </p>
          <p
            className={`${styles.tab} ${styles.tab_last} ${step === 1 && styles.active}`}
            onClick={() => setStep(1)}
          >
            Contacts
          </p>
        </div>
        {isLoading && (
          <div className={styles.loader}>
            <Placeholder numberRows={3} numberParagraphs={1} />
          </div>
        )}
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
                  {properties.map(property => (
                    <p key={property.sellgo_prop} className={styles.sellgoProperties__name}>
                      {property.hubspot_prop ? property.hubspot_prop : '-'}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default HubSpotIntegrationAuthenticated;
