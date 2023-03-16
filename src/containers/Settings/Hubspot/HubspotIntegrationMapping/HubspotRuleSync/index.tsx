/* eslint-disable max-len */
import React, { useState } from 'react';
import axios from 'axios';
import { Checkbox, Radio } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';

/* Selectors */
import { sellerIDSelector } from '../../../../../selectors/Seller';

/* Utils */
import history from '../../../../../history';
import { AppConfig } from '../../../../../config';
import { success } from '../../../../../utils/notifications';

/* Constants */

interface Props {
  setStep: (a: number) => void;
}

const HubSpotRulesSync = (props: Props) => {
  const { setStep } = props;
  const [isOneTimeSync, setIsOneTimeSync] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompaniesSelected, setIsCompaniesSelected] = useState<boolean>(false);
  const [isContactsSelected, setIsContactsSelected] = useState<boolean>(false);

  const handleBackClick = () => {
    setStep(1);
  };
  const handlePushContactsTohubspot = async () => {
    const sellerID = sellerIDSelector();

    // eslint-disable-next-line max-len
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchants-employees?is_looked_up=true&is_hubspot_export=true`;
    try {
      const { status, data } = await axios.get(URL);
      if (status === 200) {
        success(data.message);
      }
    } catch (err) {
      console.log('error: ', err);
    }
  };
  const handlePushCompaniesTohubspot = async () => {
    const sellerID = sellerIDSelector();

    // eslint-disable-next-line max-len
    const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/merchants-database?is_hubspot_export=true`;
    try {
      const { status, data } = await axios.get(URL);
      if (status === 200) {
        success(data.message);
      }
    } catch (err) {
      console.log('error: ', err);
    }
  };
  const handleSubmit = async () => {
    if (!isOneTimeSync) {
      history.push('/seller-research/collection');
      return;
    }
    setIsSubmitting(true);
    if (isCompaniesSelected) {
      await handlePushCompaniesTohubspot();
    }
    if (isContactsSelected) {
      await handlePushContactsTohubspot();
    }
    setTimeout(() => {
      setIsSubmitting(false);
      history.push('/seller-research/collection');
    }, 1000);

    return;
  };

  return (
    <div className={styles.hubspotCore}>
      <div className={styles.hubspotCore__details}>
        <p className={styles.hubspotCore__label}>Sync Rules</p>
        <div
          className={`${styles.syncRules__wrapper} ${isOneTimeSync &&
            styles.syncRules__wrapper_active}`}
        >
          <Radio checked={isOneTimeSync} onClick={() => setIsOneTimeSync(true)} />
          <div className={styles.syncRules__descriptionBox}>
            <p className={styles.syncRules__descriptionBox_details}>One time sync</p>
            <Checkbox
              label="Companies"
              checked={isCompaniesSelected}
              onClick={() => setIsCompaniesSelected(true)}
              className={styles.syncRules__descriptionBox_details}
            />
            <Checkbox
              label="Contacts"
              checked={isContactsSelected}
              onClick={() => setIsContactsSelected(true)}
              className={styles.syncRules__descriptionBox_details}
            />
            <p className={styles.syncRules__descriptionBox_details}>
              Hubspot will be updated for one time.
            </p>
          </div>
        </div>
        <div
          className={`${styles.syncRules__wrapper} ${!isOneTimeSync &&
            styles.syncRules__wrapper_active}`}
        >
          <Radio checked={!isOneTimeSync} onClick={() => setIsOneTimeSync(false)} />
          <div className={styles.syncRules__descriptionBox}>
            <p>Don’t sync now</p>
            <p>Changes to this property in Sellgo will not be detected or updated in Hubspot.</p>
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
          onClick={handleSubmit}
          loading={isSubmitting}
          className={styles.submitButton}
        >
          {'Continue'}
        </ActionButton>
      </div>
    </div>
  );
};

export default HubSpotRulesSync;
