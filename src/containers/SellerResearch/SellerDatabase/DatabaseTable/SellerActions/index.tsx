import React from 'react';
import { Table } from 'rsuite';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import numeral from 'numeral';

/* Styling */
import styles from './index.module.scss';

/* Types */
import { RowCell } from '../../../../../interfaces/Table';

/* Utils */
import { parseKpiLists, prettyPrintNumber, removeSpecialChars } from '../../../../../utils/format';
import { copyToClipboard } from '../../../../../utils/file';
import { success } from '../../../../../utils/notifications';

/* Actions */
import { trackMerchantFromDatabase } from '../../../../../actions/SellerResearch/SellerDatabase';

/* Utils */
import history from '../../../../../history';
import { timeout } from '../../../../../utils/timeout';

/* Assets */
import { ReactComponent as SellerFinderIcon } from '../../../../../assets/images/sellerFinder.svg';

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
  const inventoryCount = rowData.inventory_count;

  const parsedAsinList = parseKpiLists(asinList);

  /* Track seller */
  const handleSellerTrack = async (newTab: boolean) => {
    trackMerchantFromDatabase(merchantId);
    if (newTab) {
      await timeout(500);
      history.push('/seller-research/finder');
    }
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
      <Table.Cell {...otherProps}>
        <div className={styles.actionCellWrapper}>
          <div className={styles.actionCell}>
            <button
              className={styles.actionButton}
              onClick={() => handleSellerTrack(false)}
              style={{
                color: isSellerTracked ? '#3b4557' : '#636d76',
                fontWeight: isSellerTracked ? 500 : 400,
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
              content={
                <>
                  <div className={styles.actionOptions}>
                    <p>ASIN</p>
                    <button onClick={() => handleCopyAsins(',')} disabled={!parsedAsinList.length}>
                      <Icon name="copy outline" />
                      <span>Copy ASINs in rows</span>
                    </button>

                    <button onClick={() => handleCopyAsins('\n')} disabled={!parsedAsinList.length}>
                      <Icon name="copy outline" />
                      <span>Copy ASINs in columns</span>
                    </button>

                    <p>INVENTORY</p>
                    <button onClick={() => handleSellerTrack(false)}>
                      <SellerFinderIcon />
                      <span>Check more inventory</span>
                    </button>
                  </div>
                </>
              }
              trigger={
                <Button
                  icon="chevron down"
                  className={`${styles.iconButton} iconButtonResetGlobal`}
                />
              }
            />
          </div>
          <span style={{ marginLeft: '10px' }}>out of {prettyPrintNumber(inventoryCount)}</span>
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
