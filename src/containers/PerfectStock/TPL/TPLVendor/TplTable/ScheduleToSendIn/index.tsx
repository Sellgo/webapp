import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { SEND_IN_INTERVALS } from '../../../../../../constants/PerfectStock/Tpl';

/* Interface */
import { RowCell } from '../../../../../../interfaces/Table';
import { UpdateTplSkuPayload } from '../../../../../../interfaces/PerfectStock/Tpl';

/* Components */
import ToggleRadio from '../../../../../../components/ToggleRadio';

/* Actions */
import { updateTplSkuData } from '../../../../../../actions/PerfectStock/Tpl';

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

  const handleInventoryThresholdToggle = (isToggled: boolean) => {
    const payload: UpdateTplSkuPayload = {
      id: rowData.id,
      status: isToggled ? 'active' : 'inactive',
    };
    updateTplSkuData(payload);
  };

  const selectedDisplayText = SEND_IN_INTERVALS.find(
    option => option.value === rowData[dataKey]?.toString()
  )?.text;
  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.scheduleToSendInCell}`}
      >
        <ToggleRadio
          isToggled={rowData.status === 'active' ? true : false}
          handleChange={() => handleInventoryThresholdToggle(!(rowData.status === 'active'))}
          label={'Active'}
          className={styles.toggleButton}
          isRainbow
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
              {SEND_IN_INTERVALS.map(option => (
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
