import React from 'react';
import { Table } from 'rsuite';
import { Button, Icon, Popup } from 'semantic-ui-react';
import numeral from 'numeral';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { RowCell } from '../../../../../interfaces/Table';

/* Utils */
import { parseKpiLists, prettyPrintNumber, removeSpecialChars } from '../../../../../utils/format';
import { copyToClipboard } from '../../../../../utils/file';
import { success } from '../../../../../utils/notifications';

/* Assets */
import { ReactComponent as CheckInventoryIcon } from '../../../../../assets/images/sellerFinder.svg';

/* Hooks */
import { useCheckInventory } from '../../SocketProviders/CheckInventory';

const SellerActions = (props: RowCell) => {
  const { rowData } = props;

  const { handleCheckInventory } = useCheckInventory();

  const asinList = rowData.asins;

  const merchantId = rowData.merchant_id;

  const hasInventory = rowData.has_inventory || false;

  const inventoryCount = rowData.inventory_count;

  const parsedAsinList = parseKpiLists(asinList);

  /* Track seller */
  const checkInventory = () => {
    handleCheckInventory(merchantId);
    console.log('Called progress API, check inventory');
  };

  /* Copy Asins */
  const handleCopyAsins = (deliminator?: string) => {
    const prepareAsinStringCopy = removeSpecialChars(parsedAsinList, deliminator);
    copyToClipboard(prepareAsinStringCopy).then(() => {
      success('ASINs successfully copied');
    });
  };

  return (
    <>
      <Table.Cell {...props}>
        <div className={styles.actionCellWrapper}>
          <div className={styles.actionCell}>
            <button
              className={styles.actionButton}
              onClick={checkInventory}
              style={{
                color: hasInventory ? '#3b4557' : '#636d76',
                fontWeight: hasInventory ? 500 : 400,
              }}
            >
              {numeral(parsedAsinList.length).format('00')}
            </button>
            <Popup
              on="click"
              position="bottom left"
              offset="-40"
              closeOnDocumentClick
              closeOnEscape
              className={styles.actionsPopover}
              trigger={
                <Button
                  icon="chevron down"
                  className={`${styles.iconButton} iconButtonResetGlobal`}
                />
              }
              content={
                <>
                  <div className={styles.actionOptions}>
                    <p>ASIN</p>
                    <button onClick={checkInventory}>
                      <CheckInventoryIcon />
                      <span>Check Inventory</span>
                    </button>

                    <button onClick={() => handleCopyAsins(',')}>
                      <Icon name="copy outline" />
                      <span>Copy ASINs in rows with comma</span>
                    </button>

                    <button onClick={() => handleCopyAsins('\n')}>
                      <Icon name="copy outline" />
                      <span>Copy ASINs in columns</span>
                    </button>
                  </div>
                </>
              }
            />
          </div>
          <span style={{ marginLeft: '10px' }}>out of {prettyPrintNumber(inventoryCount)}</span>
        </div>
      </Table.Cell>
    </>
  );
};

export default SellerActions;
