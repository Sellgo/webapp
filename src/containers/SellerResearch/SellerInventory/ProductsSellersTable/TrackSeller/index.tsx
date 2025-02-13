import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import { ReactComponent as TrackIcon } from '../../../../../assets/images/fingerprint-4.svg';

/* Actions */
import { trackUntrackProductSeller } from '../../../../../actions/SellerResearch/SellerInventory';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';
import { TrackUntrackProductSeller } from '../../../../../interfaces/SellerResearch/SellerInventory';

/* Components */
import ActionButton from '../../../../../components/ActionButton';

interface Props extends RowCell {
  trackUntrackProductSeller: (payload: TrackUntrackProductSeller) => void;
}

const TrackSeller = (props: Props) => {
  const { trackUntrackProductSeller, ...otherProps } = props;

  const { rowData } = otherProps;

  const status = rowData.tracking_status;

  const sellerMerchantId = rowData.seller_merchant_id;
  const amazonMerchantId = rowData.merchant_id;

  const isSellerTracked = status === 'active' || status === true ? true : false;

  /* Handle Seller Tracking */
  const handleTrackSeller = () => {
    const payload = {
      sellerMerchantId,
      amazonMerchantId,
    };

    trackUntrackProductSeller(payload);
  };

  const btnLabel = isSellerTracked ? 'Tracking' : 'Track Seller';

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.productTrack}>
        <ActionButton
          variant="secondary"
          type="purpleGradient"
          size="small"
          onClick={handleTrackSeller}
          className={styles.trackBtn}
        >
          <TrackIcon />
          {btnLabel}
        </ActionButton>
      </div>
    </Table.Cell>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    trackUntrackProductSeller: (payload: TrackUntrackProductSeller) =>
      dispatch(trackUntrackProductSeller(payload)),
  };
};
export default connect(null, mapDispatchToProps)(TrackSeller);
