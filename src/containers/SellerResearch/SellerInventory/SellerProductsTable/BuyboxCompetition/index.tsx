import React from 'react';
import { Table } from 'rsuite';
import { Popup, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../../../utils/format';

/* Assets */
import { ReactComponent as CheckSellerIcon } from '../../../../../assets/images/userUnlockedIcon.svg';
import { ReactComponent as TrackProductIcon } from '../../../../../assets/images/fingerprint-4.svg';

/* Actions */
import { trackUntrackSellerProduct } from '../../../../../actions/SellerResearch/SellerInventory';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';
import { TrackUntrackProduct } from '../../../../../interfaces/SellerResearch/SellerInventory';

/* Hooks */
import { useFindRefreshSellerByAsin } from '../../SocketProviders/FindRefreshSellerByAsin';

interface Props extends RowCell {
  trackUntrackSellerProduct: (payload: TrackUntrackProduct) => void;
}

const BuyboxCompetition = (props: Props) => {
  const { trackUntrackSellerProduct, ...otherProps } = props;

  const { handleFindOrRefreshByAsin } = useFindRefreshSellerByAsin();

  const { rowData } = otherProps;

  const numOfSellers = rowData.num_sellers ? formatNumber(rowData.num_sellers) : false;
  const productId = rowData.product_id;
  const status = rowData.tracking_status;
  const productTrackId = rowData.product_track_id;
  const productAsin = rowData.asin;
  const merchantId = rowData.merchant_id;

  const isProductTracked = status === 'active' || status === true ? true : false;

  /* Handle Check Sellers button */
  const handleCheckSellers = () => {
    const sendPayload = {
      asins: productAsin,
      merchantId,
      //parentAsin true means it's a nested variant (means it has a parent asin as well)
      parentAsin: true,
    };

    handleFindOrRefreshByAsin(sendPayload);
    console.log('Call global progress event');
  };

  /* Handle Prpduct tracking */
  const handleTrackProduct = () => {
    const payload = {
      status: isProductTracked ? 'inactive' : 'active',
      productId,
      productTrackId: productTrackId ? productTrackId : null,
    };

    trackUntrackSellerProduct(payload);
  };

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.actionCellWrapper}>
        <div className={styles.actionCell}>
          <button
            className={styles.actionButton}
            onClick={handleCheckSellers}
            style={{
              color: numOfSellers ? '#3b4557' : '#636d76',
              fontWeight: numOfSellers ? 500 : 400,
            }}
          >
            {showNAIfZeroOrNull(numOfSellers, numOfSellers)}
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
                  <p>Buybox Competition</p>
                  <button onClick={handleCheckSellers}>
                    <CheckSellerIcon />
                    <span>Check Sellers</span>
                  </button>

                  <button onClick={handleTrackProduct}>
                    <TrackProductIcon />
                    <span>{isProductTracked ? 'Untrack Product' : 'Track Product'}</span>
                  </button>
                </div>
              </>
            }
          />
        </div>
      </div>
    </Table.Cell>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    trackUntrackSellerProduct: (payload: TrackUntrackProduct) =>
      dispatch(trackUntrackSellerProduct(payload)),
  };
};

export default connect(null, mapDispatchToProps)(BuyboxCompetition);
