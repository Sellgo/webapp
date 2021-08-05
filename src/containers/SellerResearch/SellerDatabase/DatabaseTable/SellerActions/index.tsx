import React from 'react';
import { Table } from 'rsuite';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { RowCell } from '../../../../../interfaces/Table';

/* Assets */
import CheckInventory from '../../../../../assets/images/checkInventory.svg';

/* Utils */
import { removeSpecialChars } from '../../../../../utils/format';
import { copyToClipboard } from '../../../../../utils/file';
import { success } from '../../../../../utils/notifications';

/*Actions */
import { trackMerchantFromDatabase } from '../../../../../actions/SellerResearch/SellerDatabase';

interface Props extends RowCell {
  trackMerchantFromDatabase: (payload: string) => void;
}

const SellerActions = (props: Props) => {
  const { trackMerchantFromDatabase, ...otherProps } = props;

  const { rowData } = otherProps;

  const asinList = rowData.asins;
  const isSellerTracked =
    rowData.tracking_status === true || rowData.tracking_status === 'active' ? true : false;
  const merchantId = rowData.merchant_id;

  const parsedAsinList = JSON.parse(JSON.stringify(asinList));

  /* Track seller */
  const handleSellerTrack = () => {
    trackMerchantFromDatabase(merchantId);
  };

  /* Copy Asins */
  const handleCopyAsins = () => {
    const prepareAsinStringCopy = removeSpecialChars(parsedAsinList);
    copyToClipboard(prepareAsinStringCopy).then(() => {
      success('ASINs successfully copied');
    });
  };

  return (
    <>
      <Table.Cell {...otherProps}>
        <div className={`${isSellerTracked ? styles.actionCellActive : styles.actionCellInActive}`}>
          <button className={styles.actionButton} onClick={handleSellerTrack}>
            {parsedAsinList.length}
          </button>
          <Popup
            on="click"
            position="bottom left"
            offset="-40"
            closeOnDocumentClick
            closeOnEscape
            className={styles.actionsPopover}
            content={
              <>
                <div className={styles.actionOptions}>
                  <p>ASIN</p>
                  <button onClick={handleSellerTrack}>
                    <img src={CheckInventory} alt="CheckInventory" />
                    <span>Check Inventory</span>
                  </button>
                  {/* <button>
                    <Icon name="download" />
                    <span>Export</span>
                  </button> */}
                  <button onClick={handleCopyAsins}>
                    <Icon name="copy outline" />
                    <span>Copy ASINs</span>
                  </button>
                </div>
              </>
            }
            trigger={<Button icon="chevron down" className={styles.iconButton} />}
          />
        </div>
      </Table.Cell>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    trackMerchantFromDatabase: (payload: string) => dispatch(trackMerchantFromDatabase(payload)),
  };
};

export default connect(null, mapDispatchToProps)(SellerActions);
