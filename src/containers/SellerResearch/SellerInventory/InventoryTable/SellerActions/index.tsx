import React, { useState } from 'react';
import { Table } from 'rsuite';
import { Button, Icon, Popup } from 'semantic-ui-react';
import numeral from 'numeral';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import { getAllowLiveScraping } from '../../../../../selectors/SellerResearch/SellerInventory';

/* Actions */
import { fetchCentralScrapingProgress } from '../../../../../actions/SellerResearch/SellerInventory';

/* Utils */
import { parseKpiLists, prettyPrintNumber, removeSpecialChars } from '../../../../../utils/format';
import { copyToClipboard } from '../../../../../utils/file';
import { success } from '../../../../../utils/notifications';
import { isLessThan24Hours } from '../../../../../utils/date';
import { timeout } from '../../../../../utils/timeout';

/* Assets */
import { ReactComponent as CheckInventoryIcon } from '../../../../../assets/images/sellerFinder.svg';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

/* Hooks */
import { useCheckInventory } from '../../SocketProviders/CheckInventory';

interface Props extends RowCell {
  allowLiveScraping: boolean;
  fetchCentralScrapingProgress: () => void;
}

const SellerActions = (props: Props) => {
  const [openPopup, setOpenPopup] = useState(false);

  const { fetchCentralScrapingProgress, allowLiveScraping, ...otherProps } = props;

  const { rowData } = otherProps;

  const { handleCheckInventory } = useCheckInventory();

  const asinList = rowData.asins;

  const merchantId = rowData.merchant_id;

  const hasInventory = rowData.has_inventory || false;

  const inventoryCount = rowData.inventory_count;

  const parsedAsinList = parseKpiLists(asinList);

  const lastCheckInventory = rowData.last_check_inventory;

  /* Logic to disbale check inventory */
  const disableCheckInventory = isLessThan24Hours(lastCheckInventory) || !allowLiveScraping;

  /* Handle close popup */
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  /* Track seller */
  const checkInventory = async () => {
    handleCheckInventory(merchantId);
    handleClosePopup();
    success(`Started Inventory check for ${merchantId}. Check the progress for latest updates`);
    await timeout(2000);
    await fetchCentralScrapingProgress();
  };

  /* Copy Asins */
  const handleCopyAsins = (deliminator?: string) => {
    const prepareAsinStringCopy = removeSpecialChars(parsedAsinList, deliminator);
    copyToClipboard(prepareAsinStringCopy).then(() => {
      success('ASINs successfully copied');
    });
    handleClosePopup();
  };

  return (
    <>
      <Table.Cell {...otherProps}>
        <div className={styles.actionCellWrapper}>
          <div className={styles.actionCell}>
            <button
              className={styles.actionButton}
              onClick={checkInventory}
              style={{
                color: hasInventory ? '#3b4557' : '#636d76',
                fontWeight: hasInventory ? 500 : 400,
              }}
              disabled={disableCheckInventory}
            >
              {numeral(parsedAsinList.length).format('00')}
            </button>
            <Popup
              on="click"
              open={openPopup}
              onClose={handleClosePopup}
              position="bottom left"
              offset="-40"
              closeOnDocumentClick
              closeOnEscape
              className={styles.actionsPopover}
              trigger={
                <Button
                  icon="chevron down"
                  className={`${styles.iconButton} iconButtonResetGlobal`}
                  onClick={() => setOpenPopup(true)}
                />
              }
              content={
                <>
                  <div className={styles.actionOptions}>
                    <p>ASIN</p>
                    <button onClick={checkInventory} disabled={disableCheckInventory}>
                      <CheckInventoryIcon />
                      <span>Check Inventory</span>
                    </button>

                    <button onClick={() => handleCopyAsins(',')}>
                      <Icon name="copy outline" />
                      <span>Copy ASINs in rows</span>
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

const mapStateToProps = (state: any) => {
  return {
    allowLiveScraping: getAllowLiveScraping(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCentralScrapingProgress: () => dispatch(fetchCentralScrapingProgress()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerActions);
