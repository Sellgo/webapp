import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import axios from 'axios';

/* Components */
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import SaveCancelOptions from '../../../../../components/SaveCancelOptions';

/* Styles */
import styles from './index.module.scss';

/* Utils */
import { success, error } from '../../../../../utils/notifications';
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';

/* Constants */
import { SIDE_SETTING_WIDTH } from '../../../../../constants/PerfectStock/OrderPlanning';
import DaysOfInventoryPopup from '../DaysOfInventoryPopup';

const GlobalVariableSettingsPopup = () => {
  const [daysOfInventory, setDaysOfInventory] = React.useState<number>(0);
  const [defaultDaysOfInventory, setDefaultDaysOfInventory] = React.useState<number>(0);
  const [isEditingDaysOfInventory, setIsEditingDaysOfInventory] = React.useState<boolean>(false);

  /* State for mini action box popup for days of inventory */
  const [isDaysOfInventoryEditOptionsOpen, setDaysOfInventoryEditOptionsOpen] = React.useState(
    false
  );

  /* State for main pop up for days of inventory edits */
  const [daysOfInventoryPopupOpen, setDaysOfInventoryPopupOpen] = React.useState<boolean>(false);

  /* ===================================== */
  /* Days of inventory settings handlers */
  /* ===================================== */
  const fetchDaysOfInventoryConfig = async () => {
    try {
      const { status, data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/config`
      );
      if (status === 200) {
        setDaysOfInventory(data.stockout_threshold_inventory);
        setDefaultDaysOfInventory(data.stockout_threshold_inventory);
      }
    } catch (error) {
      console.error(error);
      setDaysOfInventory(0);
      setDefaultDaysOfInventory(0);
    }
  };

  const handleDaysOfInventoryChange = (value: string) => {
    if (parseInt(value) === defaultDaysOfInventory) {
      setIsEditingDaysOfInventory(false);
    } else {
      setIsEditingDaysOfInventory(true);
    }
    setDaysOfInventory(parseInt(value));
  };

  const handleUpdateDaysOfInventorySave = async () => {
    try {
      const { status } = await axios.patch(
        `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/config`,
        {
          stockout_threshold_inventory: daysOfInventory,
        }
      );
      setIsEditingDaysOfInventory(false);
      if (status === 200) {
        setDefaultDaysOfInventory(daysOfInventory);
        success('Successfully updated days of inventory setting.');
      }
    } catch (err) {
      console.error(err);
      setDaysOfInventory(defaultDaysOfInventory);
      error('Failed to update days of inventory setting.');
    }
  };

  const handleUpdateDaysOfInventoryCancel = () => {
    setIsEditingDaysOfInventory(false);
    setDaysOfInventory(defaultDaysOfInventory);
  };

  React.useEffect(() => {
    fetchDaysOfInventoryConfig();
  }, []);

  return (
    <>
      <div className={styles.ganttChartWrapper}>
        <div className={styles.ganttChartSettings} style={{ minWidth: SIDE_SETTING_WIDTH }}>
          <div className={styles.daysOfInventoryEdit}>
            <InputFilter
              label="Days of Inventory"
              placeholder="100"
              isNumber
              value={daysOfInventory?.toString() || ''}
              handleChange={handleDaysOfInventoryChange}
              className={styles.settingInput}
            />
            <Popup
              open={isDaysOfInventoryEditOptionsOpen}
              onClose={() => setDaysOfInventoryEditOptionsOpen(false)}
              on="click"
              position="bottom left"
              className="timeLine-actionsPopover"
              basic
              content={
                <>
                  <div className="timeLine-actionOptions">
                    <p>EDIT</p>
                    <button
                      onClick={() => {
                        setDaysOfInventoryPopupOpen(true);
                        setDaysOfInventoryEditOptionsOpen(false);
                      }}
                    >
                      <Icon name="pencil" />
                      <span>Edit Days Of Inventory</span>
                    </button>
                  </div>
                </>
              }
              trigger={
                <button
                  className={'timeLine-triggerButton'}
                  onClick={() => setDaysOfInventoryEditOptionsOpen(true)}
                >
                  <Icon name="ellipsis vertical" />
                </button>
              }
            />
          </div>
          {isEditingDaysOfInventory && (
            <SaveCancelOptions
              className={styles.saveCancelOptions}
              handleSave={handleUpdateDaysOfInventorySave}
              handleCancel={handleUpdateDaysOfInventoryCancel}
            />
          )}
        </div>
      </div>

      <DaysOfInventoryPopup
        open={daysOfInventoryPopupOpen}
        setOpenPopup={setDaysOfInventoryPopupOpen}
      />
    </>
  );
};

export default GlobalVariableSettingsPopup;
