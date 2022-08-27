import React from 'react';
import axios from 'axios';
import { Radio, Checkbox } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import ActionButton from '../../../../../components/ActionButton';

/* Constants */
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { error, success } from '../../../../../utils/notifications';

const DaysOfInventoryCore = () => {
  const [daysOfInventory, setDaysOfInventory] = React.useState('');
  const [isRoundUp, setIsRoundUp] = React.useState<boolean | undefined>(false);
  const sellerID = localStorage.getItem('userId');

  /* Fetches all the triggers from backend */
  const fetchDaysOfInventory = async () => {
    try {
      const { status, data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/perfect-stock/config`
      );

      if (status === 200) {
        setDaysOfInventory(data.expected_sales_days_count || '');
        setIsRoundUp(data.round_up_to_nearest_carton);
      }
    } catch (err) {
      setDaysOfInventory('');
      console.error(err);
    }
    return [];
  };

  const handleSave = async () => {
    if (!daysOfInventory) {
      error('Please enter a valid days of inventory');
      return;
    }
    if (Number(daysOfInventory) < 30) {
      error('Valid days of inventory must be greater than 30');
      return;
    }

    try {
      const payload = {
        expected_sales_days_count: daysOfInventory,
        round_up_to_nearest_carton: isRoundUp,
      };
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/config`;

      const { status } = await axios.patch(url, payload);
      if (status === 200) {
        success('Days of inventory successfully saved');
      }
    } catch (err) {
      error('Failed to save days of inventory');
      console.error(err);
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
          &nbsp; At all times &nbsp;
          <InputFilter
            placeholder={''}
            value={daysOfInventory}
            handleChange={setDaysOfInventory}
            isNumber
            isInteger
            isPositiveOnly
            className={styles.input}
            error={!!(Number(daysOfInventory) < 30)}
          />
          &nbsp; days
        </div>
        <Checkbox
          label="Round up to nearest carton"
          onChange={(_e, data) => setIsRoundUp(data.checked)}
          checked={isRoundUp}
        />
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

export default DaysOfInventoryCore;
