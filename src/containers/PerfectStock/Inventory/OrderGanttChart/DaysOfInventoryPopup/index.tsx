import React, { useState } from 'react';
import { Modal } from 'semantic-ui-react';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import { ReactComponent as MapleLeaf } from '../../../../../assets/images/mapleLeaf.svg';

/* Components */
import DaysOfInventoryTable from './DaysOfInventoryTable';
import ActionButton from '../../../../../components/ActionButton';

/* Utils */
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { error, success } from '../../../../../utils/notifications';

interface Props {
  open: boolean;
  setOpenPopup: (value: boolean) => void;
}

const DaysOfInventoryPopup = (props: Props) => {
  const { open, setOpenPopup } = props;
  const [daysOfInventory, setDaysOfInventory] = useState<any[]>([]);
  const [isLoadingDaysOfInventory, setIsLoadingDaysOfInventory] = useState<boolean>(false);

  /* Fetch days of inventory */
  const getDaysOfInventory = async () => {
    setIsLoadingDaysOfInventory(true);
    try {
      const sellerId = sellerIDSelector();
      const res = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerId}/days-inventory-config`
      );
      const { data } = res;
      if (data) {
        setDaysOfInventory(data);
      }
    } catch (err) {
      error('Failed to get seasonality settings');
    }
    setIsLoadingDaysOfInventory(false);
  };

  /* Hook called upon typing inside the input fields */
  const handleValueChange = (key: string, value: string, id: number) => {
    const newdaysOfInventory = [...daysOfInventory];
    const index = newdaysOfInventory.findIndex(item => item.id === id);
    newdaysOfInventory[index][key] = value;
    setDaysOfInventory(newdaysOfInventory);
  };

  /* Handler to create new setting */
  const handleAddNewDayOfInventory = async () => {
    const newDaysOfInventory = {
      name: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0],
      status: 'pending',
      value: 0,
    };

    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/days-inventory-config`;
      const payload = [newDaysOfInventory];
      const res = await axios.post(url, payload);
      const { data } = res;
      if (data) {
        setDaysOfInventory([...daysOfInventory, data]);
      }
    } catch (err) {
      error('Failed to add setting.');
    }
  };

  const handleDelete = async (id: number) => {
    const newdaysOfInventory = daysOfInventory.map(item => {
      if (item.id === id) {
        item.status = 'inactive';
      }
      return item;
    });
    setDaysOfInventory(newdaysOfInventory);
  };

  /* Saving of seasonality settings, triggered upon clicking of Save button */
  const handleSaveDaysOfInventory = async () => {
    const saveddaysOfInventory = daysOfInventory.map(setting => {
      if (setting.status === 'pending' && setting.name !== '' && setting.value !== '') {
        setting.status = 'active';
      }
      return setting;
    });
    const sellerId = sellerIDSelector();
    const res = await axios.patch(
      `${AppConfig.BASE_URL_API}sellers/${sellerId}/days-inventory-config`,
      saveddaysOfInventory
    );
    const { status } = res;
    if (status === 200) {
      setOpenPopup(false);
      success('Days of inventory settings saved successfully');
    }
    setOpenPopup(false);
  };

  /* On component launch, reset days of inventory settings and fetch latest settings */
  React.useEffect(() => {
    if (open) {
      setDaysOfInventory([]);
      getDaysOfInventory();
    }
  }, [open]);

  return (
    <Modal
      className={styles.modalWrapper}
      onOpen={e => {
        e.preventDefault();
        e.stopPropagation();
        setOpenPopup(true);
      }}
      position="bottom right"
      offset="-15"
      onClose={() => setOpenPopup(false)}
      open={open}
      content={
        <div className={styles.modalWrapper}>
          <h2 className={styles.modalHeader}>
            <MapleLeaf />
            &nbsp; DAYS OF INVENTORY
          </h2>
          <div className={styles.modalContent}>
            <div className={styles.seasonalityTitle}>
              LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR
              INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM VENIAM, QUIS NOSTRUD
              EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA COMMODO CONSEQUAT. DUIS AUTE IRURE
              DOLOR IN REPREHENDERIT IN VOLUPTATE VELIT ESSE CILLUM DOLORE EU FUGIAT NULLA PARIATUR.
              EXCEPTEUR SINT OCCAECAT CUPIDATAT NON PROIDENT, SUNT IN CULPA QUI OFFICIA DESERUNT
              MOLLIT ANIM ID EST LABORUM.
            </div>
            <DaysOfInventoryTable
              daysOfInventory={daysOfInventory}
              handleValueChange={handleValueChange}
              handleDelete={handleDelete}
              isLoadingDaysOfInventory={isLoadingDaysOfInventory}
            />
            <button onClick={handleAddNewDayOfInventory} className={styles.addNewSetting}>
              Add New
            </button>
            <div className={styles.buttonRow}>
              <ActionButton
                variant="reset"
                type="grey"
                size="md"
                onClick={() => setOpenPopup(false)}
              >
                Cancel
              </ActionButton>
              <ActionButton
                variant="secondary"
                type="purpleGradient"
                size="md"
                onClick={handleSaveDaysOfInventory}
              >
                Apply
              </ActionButton>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default DaysOfInventoryPopup;
