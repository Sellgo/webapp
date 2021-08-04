import React, { useState } from 'react';
import { Table } from 'rsuite';
import { Button, Icon, Popup } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { RowCell } from '../../../../../interfaces/Table';

/* Assets */
import CheckInventory from '../../../../../assets/images/checkInventory.svg';
import { removeSpecialChars } from '../../../../../utils/format';
import { copyToClipboard } from '../../../../../utils/file';
import { success } from '../../../../../utils/notifications';

const SellerActions = (props: RowCell) => {
  const { rowData } = props;

  const [isOpen, setIsOpen] = useState(false);

  const isSellerTracked = rowData.tracking_status === true ? true : false;

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  /* Track seller */
  const handleSellerTrack = () => {
    handleClosePopup();
  };

  /* Copy Asins */
  const handleCopyAsins = () => {
    const asinList = rowData.asins;
    const parsedAsinList = JSON.parse(JSON.stringify(asinList));
    const prepareAsinStringCopy = removeSpecialChars(parsedAsinList);
    copyToClipboard(prepareAsinStringCopy).then(() => {
      success('ASINs successfully copied');
      handleClosePopup();
    });
  };

  return (
    <>
      <Table.Cell {...props}>
        <div className={`${isSellerTracked ? styles.actionCellActive : styles.actionCellInActive}`}>
          <button className={styles.actionButton} onClick={handleSellerTrack}>
            77
          </button>
          <Popup
            open={isOpen}
            on="click"
            position="bottom left"
            offset="-40"
            className={styles.actionsPopover}
            content={
              <>
                <div className={styles.actionOptions}>
                  <p>ASIN</p>
                  <button>
                    <img src={CheckInventory} alt="CheckInventory" />
                    <span>Check Inventory</span>
                  </button>
                  <button>
                    <Icon name="download" />
                    <span>Export</span>
                  </button>
                  <button onClick={handleCopyAsins}>
                    <Icon name="copy outline" />
                    <span>Copy ASINs</span>
                  </button>
                </div>
              </>
            }
            trigger={
              <Button icon="chevron down" className={styles.iconButton} onClick={handleOpenPopup} />
            }
          />
        </div>
      </Table.Cell>
    </>
  );
};

export default SellerActions;
