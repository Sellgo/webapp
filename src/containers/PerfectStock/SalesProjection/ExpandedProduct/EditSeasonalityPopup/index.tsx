import React, { useState } from 'react';
import { Modal } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import { ReactComponent as MapleLeaf } from '../../../../../assets/images/mapleLeaf.svg';
import SeasonalityTable from './SeasonalityTable';
import axios from 'axios';
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import ActionButton from '../../../../../components/ActionButton';
import { error, success } from '../../../../../utils/notifications';

interface Props {
  open: boolean;
  setOpenPopup: (value: boolean) => void;
  id: number;
}

const EditSeasonalityPopup = (props: Props) => {
  const { open, setOpenPopup, id } = props;
  const [seasonalitySettings, setSeasonalitySettings] = useState<any[]>([]);
  const [isLoadingSeasonalitySettings, setIsLoadingSeasonalitySettings] = useState<boolean>(false);

  /* Fetch seasonality settings */
  const getSeasonalitySettings = async () => {
    setIsLoadingSeasonalitySettings(true);
    try {
      const sellerId = sellerIDSelector();
      const res = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerId}/sales-adjustment?sales_projection_id=${id}`
      );
      const { data } = res;
      if (data) {
        setSeasonalitySettings(data);
      }
    } catch (err) {
      error('Failed to get seasonality settings');
    }
    setIsLoadingSeasonalitySettings(false);
  };

  /* Hook called upon typing inside the input fields */
  const handleValueChange = (key: string, value: string, id: number) => {
    const newSeasonalitySettings = [...seasonalitySettings];
    const index = newSeasonalitySettings.findIndex(item => item.id === id);
    newSeasonalitySettings[index][key] = value;
    setSeasonalitySettings(newSeasonalitySettings);
  };

  /* Handler to create new seasonality setting */
  const handleAddNewSeasonalitySetting = async () => {
    const newSeasonalitySetting = {
      name: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0],
      sales_projection_id: id,
      type: 'seasonal_trends',
      status: 'pending',
    };

    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/sales-adjustment`;
      const payload = [newSeasonalitySetting];
      const res = await axios.post(url, payload);
      const { data } = res;
      if (data) {
        setSeasonalitySettings([...seasonalitySettings, data]);
      }
    } catch (err) {
      error('Failed to add setting.');
    }
  };

  const handleDelete = async (id: number) => {
    const newSeasonalitySettings = seasonalitySettings.map(item => {
      if (item.id === id) {
        item.status = 'inactive';
      }
      return item;
    });
    setSeasonalitySettings(newSeasonalitySettings);
  };

  /* Saving of seasonality settings, triggered upon clicking of Save button */
  const handleSaveSeasonalitySettings = async () => {
    const savedSeasonalitySettings = seasonalitySettings.map(setting => {
      if (setting.status === 'pending' && setting.name !== '' && setting.value !== '') {
        setting.status = 'active';
      }
      return setting;
    });
    const sellerId = sellerIDSelector();
    const res = await axios.patch(
      `${AppConfig.BASE_URL_API}sellers/${sellerId}/sales-adjustment`,
      savedSeasonalitySettings
    );
    const { status } = res;
    if (status === 200) {
      setOpenPopup(false);
      success('Seasonality settings saved successfully');
    }
    setOpenPopup(false);
  };

  /* On component launch, reset seasonality settings and fetch latest settings */
  React.useEffect(() => {
    if (open) {
      setSeasonalitySettings([]);
      getSeasonalitySettings();
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
            &nbsp; SEASONALITY ADJUSTOR
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
            <SeasonalityTable
              seasonalitySettings={seasonalitySettings}
              handleValueChange={handleValueChange}
              handleDelete={handleDelete}
              isLoadingSeasonalitySettings={isLoadingSeasonalitySettings}
            />
            <button onClick={handleAddNewSeasonalitySetting} className={styles.addNewSetting}>
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
                onClick={handleSaveSeasonalitySettings}
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

export default EditSeasonalityPopup;
