import React from 'react';
import axios from 'axios';
import { Checkbox } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Components */
// import InputFilter from '../../../../../components/FormFilters/InputFilter';
import ActionButton from '../../../../../components/ActionButton';
// import SettingsInputTable from '../../../../../components/containerTable';
import BoxContainer from '../../../../../components/BoxContainer';
import InputTable from '../../../../../components/containerTable/';
import Placeholder from '../../../../../components/Placeholder';

/* Constants */
import { AppConfig } from '../../../../../config';
import { error, success } from '../../../../../utils/notifications';
import { CONTAINERS_SETTINGS_COLUMNS } from '../../../../../constants/Containers/defaultContainer';

/* data */
// import { data } from './data';

const ContainersCore = () => {
  const [containersConfig, setContainersConfig] = React.useState<any>({
    floor: [],
    nonFloor: [],
  });
  const [selectedTable, setSelectedTable] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const sellerID = localStorage.getItem('userId');

  /* Fetches all the triggers from backend */

  const setContainersConfigData = (data: any) => {
    setSelectedTable(0);
    const floor: any[] = [];
    const nonFloor: any[] = [];
    data.forEach((containerConfigData: any) => {
      const tempName = containerConfigData.container_name.split(' ');
      let pushName = [];
      if (tempName[0].toLowerCase() === 'floor') {
        pushName = floor;
        if (containerConfigData.is_default) {
          setSelectedTable(0);
        }
      } else if (tempName[0].toLowerCase() === 'non-floor') {
        pushName = nonFloor;
        if (containerConfigData.is_default) {
          setSelectedTable(1);
        }
      }
      const maxOrderCdm =
        (Number(containerConfigData.container_size_cbm) *
          Number(containerConfigData.max_size_perc)) /
        100;
      pushName &&
        pushName.push({
          ...containerConfigData,
          name: containerConfigData.is_default
            ? `${tempName.slice(1).join(' ')} (default)`
            : `${tempName.slice(1).join(' ')}`,
          max_order_cbm:
            containerConfigData.container_size_cbm && containerConfigData.max_size_perc
              ? maxOrderCdm.toFixed(2)
              : null,
          id: pushName.length + 1,
          _id: containerConfigData.id,
          isRowSelected: !!containerConfigData.is_default,
          isMarketPriceSelected: !!containerConfigData.market_price,
          isCustomPriceSelected: !containerConfigData.market_price,
          errors: {
            container_size_cbm: false,
            max_size_perc: false,
            price: false,
          },
          maxValues: {
            max_size_perc: 100,
          },
          disabled: !containerConfigData.is_default,
        });
    });
    setContainersConfig({
      floor: floor,
      nonFloor: nonFloor,
    });

    return [];
  };

  const fetchContainersConfig = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/shipping-container-configs`
      );

      if (status === 200) {
        setContainersConfigData(data);
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
    return [];
  };

  const handleEditRow = (dataKey: string, value: number, id: number, selectedType: string) => {
    let tempData;
    if (selectedType === 'floor') {
      tempData = containersConfig.floor;
    } else if (selectedType === 'nonFloor') {
      tempData = containersConfig.nonFloor;
    }
    tempData[id - 1][`${dataKey}`] = value;
    if (!value || Number(value) === 0) {
      tempData[id - 1].errors[`${dataKey}`] = true;
    } else {
      tempData[id - 1].errors[`${dataKey}`] = false;
    }
    if (dataKey === 'max_size_perc') {
      tempData[id - 1].max_order_cbm = (
        (tempData[id - 1].container_size_cbm * value) /
        100
      ).toFixed(2);
    }
    if (selectedType === 'floor') {
      setContainersConfig({
        floor: tempData,
        nonFloor: containersConfig.nonFloor,
      });
    } else if (selectedType === 'nonFloor') {
      setContainersConfig({
        floor: containersConfig.floor,
        nonFloor: tempData,
      });
    }
  };

  const validateSave = (data: any) => {
    if (!data.container_size_cbm || Number(data.container_size_cbm) === 0) {
      error('Volume CBM is required and must be greater than 0');
      return false;
    }
    if (!data.max_size_perc || Number(data.max_size_perc) === 0) {
      error('Max order efficiency is required and must be greater than 0');
      return false;
    }
    if (data.isCustomPriceSelected && (!data.price || Number(data.price) === 0)) {
      error('Manual container price must be greater than 0');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    let tempData;
    if (selectedTable === 0) {
      tempData = containersConfig.floor;
    } else if (selectedTable === 1) {
      tempData = containersConfig.nonFloor;
    }
    const current = tempData.find((data: any) => {
      return !!data.isRowSelected;
    });
    if (current) {
      if (validateSave(current)) {
        try {
          const payload: { [key: string]: any } = {
            // container_size_cbm: current.container_size_cbm,
            is_default: current.isRowSelected,
            max_size_perc: current.max_size_perc,
          };
          if (current.isCustomPriceSelected) {
            payload.price = Number(current.price);
          }
          const url = `${AppConfig.BASE_URL_API}sellers/${sellerID}/shipping-container-configs/${current._id}`;
          const { status } = await axios.patch(url, payload);
          if (status === 200) {
            success('Default Container updated successfully');
            fetchContainersConfig();
          }
        } catch (err) {
          error('Failed to update default container');
          console.error(err);
        }
      }
    } else {
      error('Please select a container of the selected group of containers');
    }
  };

  const handleCancel = () => {
    fetchContainersConfig();
  };

  const hanleRadioClick = (dataKey: string, id: number, tableClicked: string) => {
    let tempData;
    if (tableClicked === 'floor') {
      tempData = containersConfig.floor;
    } else if (tableClicked === 'nonFloor') {
      tempData = containersConfig.nonFloor;
    }
    if (dataKey === 'isRowSelected') {
      if (!tempData[id - 1].isRowSelected) {
        for (let i = 0; i < tempData.length; i++) {
          const temp = tempData[i];
          if (temp.id === id) {
            temp.isRowSelected = true;
            temp.disabled = false;
          } else {
            temp.isRowSelected = false;
            temp.disabled = true;
          }
          tempData[i] = temp;
        }
      }
    } else {
      if (dataKey === 'isMarketPriceSelected') {
        if (!tempData[id - 1].isMarketPriceSelected) {
          tempData[id - 1].isMarketPriceSelected = true;
          tempData[id - 1].isCustomPriceSelected = false;
        }
      } else if (dataKey === 'isCustomPriceSelected') {
        if (!tempData[id - 1].isCustomPriceSelected) {
          tempData[id - 1].isMarketPriceSelected = false;
          tempData[id - 1].isCustomPriceSelected = true;
        }
      }
    }
    if (tableClicked === 'floor') {
      setContainersConfig({
        floor: tempData,
        nonFloor: containersConfig.nonFloor,
      });
    } else if (tableClicked === 'nonFloor') {
      setContainersConfig({
        floor: containersConfig.floor,
        nonFloor: tempData,
      });
    }
  };

  React.useEffect(() => {
    fetchContainersConfig();
  }, []);

  return (
    <div className={styles.settingsTableRow}>
      {isLoading && (
        <BoxContainer className={styles.boxContainer}>
          <Placeholder numberRows={5} numberParagraphs={1} />
        </BoxContainer>
      )}
      {!isLoading && (
        <div className={styles.daysOfInventorySettingsBox}>
          <p>Select your default container</p>
          <div className={styles.inputTableWrapper}>
            <div className={`${styles.inputTable}`}>
              <Checkbox
                radio
                checked={!!(selectedTable === 0)}
                label="Floor Loaded Container"
                onChange={() => {
                  if (selectedTable === 1) setSelectedTable(0);
                }}
              />
              <InputTable
                data={containersConfig.floor}
                tableColumns={CONTAINERS_SETTINGS_COLUMNS}
                handleEditRow={(dataKey, value, id) => {
                  handleEditRow(dataKey, value, id, 'floor');
                }}
                handleRadioClick={(dataKey, dataRow) => {
                  hanleRadioClick(dataKey, dataRow.id, 'floor');
                }}
                className={`${selectedTable !== 0 && styles.disabledTable}`}
              />
            </div>
            <div className={`${styles.inputTable}`}>
              <Checkbox
                radio
                checked={!!(selectedTable === 1)}
                label="Non-Floor Loaded Container"
                onChange={() => {
                  if (selectedTable === 0) setSelectedTable(1);
                }}
              />
              <InputTable
                data={containersConfig.nonFloor}
                tableColumns={CONTAINERS_SETTINGS_COLUMNS}
                handleEditRow={(dataKey, value, id) => {
                  handleEditRow(dataKey, value, id, 'nonFloor');
                }}
                handleRadioClick={(dataKey, dataRow) => {
                  hanleRadioClick(dataKey, dataRow.id, 'nonFloor');
                }}
                className={`${selectedTable !== 1 && styles.disabledTable}`}
              />
            </div>
          </div>
          <div className={styles.buttonsRow}>
            <ActionButton
              variant="reset"
              size="md"
              className={styles.resetButton}
              onClick={handleCancel}
            >
              Cancel
            </ActionButton>
            <ActionButton
              className={styles.applyButton}
              variant="secondary"
              type="purpleGradient"
              size="md"
              onClick={handleSave}
              disabled={false}
            >
              Save
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContainersCore;
