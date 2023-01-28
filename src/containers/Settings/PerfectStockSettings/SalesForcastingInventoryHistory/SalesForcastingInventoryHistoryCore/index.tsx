import React from 'react';
import axios from 'axios';
import { Radio } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import ActionButton from '../../../../../components/ActionButton';

/* Constants */
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { error, success } from '../../../../../utils/notifications';

const SalesForcastingInventoryHistoryCore = () => {
  const [stockoutThresholdSales, setStockoutThresholdSales] = React.useState('');
  const sellerID = localStorage.getItem('userId');

  /* Fetches all the triggers from backend */
  const fetchDaysOfInventory = async () => {
    try {
      const { status, data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/perfect-stock/config`
      );

      if (status === 200) {
        setStockoutThresholdSales(data.stockout_threshold_sales || '');
      }
    } catch (err) {
      setStockoutThresholdSales('');
    }
    return [];
  };

  const handleSave = async () => {
    if (!stockoutThresholdSales) {
      error('Please enter a valid threshold');
      return;
    }

    try {
      const payload = {
        stockout_threshold_sales: stockoutThresholdSales,
      };
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/config`;

      const { status } = await axios.patch(url, payload);
      if (status === 200) {
        success('Threshold successfully saved');
      }
    } catch (err) {
      error('Failed to save threshold');
    }
  };

  React.useEffect(() => {
    fetchDaysOfInventory();
  }, []);

  return (
    <div className={styles.settingsTableRow}>
      <div className={styles.daysOfInventorySettingsBox}>
        <div className={styles.daysOfInventoryRow}>
          <Radio checked />
          &nbsp; When Inventory Historical data is unavailable, assume stockout when sales is lower
          than &nbsp;
          <InputFilter
            placeholder={''}
            value={stockoutThresholdSales}
            handleChange={setStockoutThresholdSales}
            isNumber
            isInteger
            isPositiveOnly
            className={styles.input}
          />
          &nbsp; %
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

export default SalesForcastingInventoryHistoryCore;
