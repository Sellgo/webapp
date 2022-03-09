import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';
import { UpdateTplSkuPayload } from '../../../../../interfaces/PerfectStock/Tpl';

/* Components */
import ToggleRadio from '../../../../../components/ToggleRadio';

/* Actions */
import { updateTplSkuData } from '../../../../../actions/PerfectStock/Tpl';

interface Props extends RowCell {
  updateTplSkuData: (payload: UpdateTplSkuPayload) => void;
}

const ScheduleToSendIn = (props: Props) => {
  const { updateTplSkuData, ...otherProps } = props;
  const { rowData, dataKey } = otherProps;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleSaveInventoryThreshold = (updatedInventoryThreshold: string) => {
    const payload: UpdateTplSkuPayload = {
      id: rowData.id,
      interval: parseFloat(updatedInventoryThreshold),
    };
    updateTplSkuData(payload);
  };

  const handleInventoryThresholdToggle = (stockoutThresholdInventory: boolean) => {
    console.log('Toggle', stockoutThresholdInventory);
    // updateSalesProjectionProduct({
    //   id: rowData.id,
    //   updatePayload: {
    //     stockout_threshold_inventory_included: stockoutThresholdInventory ? 'true' : 'false',
    //   },
    // });
  };

  const options = [
    {
      key: '1',
      value: '1',
      text: 'Daily',
    },
    {
      key: '7',
      value: '7',
      text: 'Weekly',
    },
  ];

  const selectedDisplayText = options.find(option => option.value === rowData[dataKey]?.toString())
    ?.text;
  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.inventoryThresholdCell}`}
      >
        <ToggleRadio
          isToggled={rowData.stockout_threshold_inventory_included ? true : false}
          handleChange={() =>
            handleInventoryThresholdToggle(!rowData.stockout_threshold_inventory_included)
          }
          label={'Active'}
          className={styles.toggleButton}
        />
        <Popup
          on="click"
          open={isOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          trigger={
            <button className={`${styles.selectionButton}`}>
              <span>{selectedDisplayText || ''}</span>
              <Icon name="angle down" />
            </button>
          }
          logo="dropdown"
          basic
          className={styles.popupWrapper}
          position="bottom center"
          content={
            <div className={styles.optionsWrapper}>
              {options.map(option => (
                <div
                  className={styles.option}
                  key={option.key}
                  onClick={() => {
                    handleSaveInventoryThreshold(option.value);
                    handleClose();
                  }}
                >
                  <span>{option.text}</span>
                </div>
              ))}
            </div>
          }
        />
      </div>
    </Table.Cell>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTplSkuData: (payload: UpdateTplSkuPayload) => dispatch(updateTplSkuData(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ScheduleToSendIn);
