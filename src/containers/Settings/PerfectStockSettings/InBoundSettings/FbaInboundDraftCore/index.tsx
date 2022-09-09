import React from 'react';
import axios from 'axios';

/* Styles */
import styles from './index.module.scss';

/* Components */
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import ActionButton from '../../../../../components/ActionButton';

/* Constants */
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { error, success } from '../../../../../utils/notifications';

const FbaInboundDraftCore = () => {
  const [inboundBufferDays, setInboundBufferDays] = React.useState('');
  const sellerID = localStorage.getItem('userId');

  /* Fetches all the triggers from backend */
  const fetchFbaInboundDraft = async () => {
    try {
      const { status, data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/perfect-stock/config`
      );

      if (status === 200) {
        setInboundBufferDays(data.inbound_buffer_days || '');
      }
    } catch (err) {
      setInboundBufferDays('');
      console.error(err);
    }
    return [];
  };

  const handleSave = async () => {
    if (!inboundBufferDays) {
      error('Please enter a valid days for inbound draft');
      return;
    }

    try {
      const payload = {
        inbound_buffer_days: inboundBufferDays,
      };
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/config`;

      const { status } = await axios.patch(url, payload);
      if (status === 200) {
        success('Inbound draft days successfully saved');
      }
    } catch (err) {
      error('Failed to update inbound draft days');
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchFbaInboundDraft();
  }, []);

  return (
    <div className={styles.settingsTableRow}>
      <div className={styles.daysOfInventorySettingsBox}>
        <div className={styles.daysOfInventoryRow}>
          &nbsp; Create FBA inbound draft &nbsp; &nbsp;
          <InputFilter
            placeholder={''}
            value={inboundBufferDays}
            handleChange={setInboundBufferDays}
            isNumber
            isInteger
            isPositiveOnly
            className={styles.input}
          />
          &nbsp; days before the replenishment date
        </div>
        <ActionButton
          className={styles.applyButton}
          variant="secondary"
          type="purpleGradient"
          size="md"
          onClick={handleSave}
          disabled={false}
        >
          Apply
        </ActionButton>
      </div>
    </div>
  );
};

export default FbaInboundDraftCore;
