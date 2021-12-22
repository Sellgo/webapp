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

interface Props {
  open: boolean;
  setOpenPopup: (value: boolean) => void;
  id: number;
}

const EditSeasonalityPopup = (props: Props) => {
  const { open, setOpenPopup, id } = props;
  const [seasonalitySettings, setSeasonalitySettings] = useState<any[]>([]);

  const getSeasonalitySettings = async () => {
    const sellerId = sellerIDSelector();
    const res = await axios.get(
      `${AppConfig.BASE_URL_API}sellers/${sellerId}/sales-adjustment?sales_projection_id=${id}`
    );
    const { data } = res;
    console.log(data);
    if (data) {
      setSeasonalitySettings(data);
    }
    return data;
  };

  const handleValueChange = (key: string, value: string, id: number) => {
    const newSeasonalitySettings = [...seasonalitySettings];
    const index = newSeasonalitySettings.findIndex(item => item.id === id);
    newSeasonalitySettings[index][key] = value;
    setSeasonalitySettings(newSeasonalitySettings);
  };

  const handleDelete = async (id: number) => {
    const newSeasonalitySettings = seasonalitySettings.filter(item => item.id !== id);
    setSeasonalitySettings(newSeasonalitySettings);
  };

  const handleSaveSeasonalitySettings = async () => {
    // const sellerId = sellerIDSelector();
    // const res = await axios.put(`${AppConfig.BASE_URL_API}sellers/${sellerId}/sales-adjustment`, {
    //   sales_adjustment_id: id,
    //   sales_adjustment: seasonalitySettings
    // });
    // const { status } = res;
    // if (status === 200) {
    //   setOpenPopup(false);
    //   success("Seasonality settings saved successfully");
    // }
    setOpenPopup(false);
  };

  React.useEffect(() => {
    if (open) {
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
            />
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
