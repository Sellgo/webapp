import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import { ReactComponent as TrackIcon } from '../../../../../assets/images/fingerprint-4.svg';

/* Actions */
import { trackUntrackSellerProduct } from '../../../../../actions/SellerResearch/SellerInventory';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';
import { TrackUntrackProduct } from '../../../../../interfaces/SellerResearch/SellerInventory';

interface Props extends RowCell {
  trackUntrackSellerProduct: (payload: TrackUntrackProduct) => void;
}

const TrackProduct = (props: Props) => {
  const { trackUntrackSellerProduct, ...otherProps } = props;

  const { rowData } = otherProps;

  const productId = rowData.product_id;
  const status = rowData.tracking_status;
  const productTrackId = rowData.product_track_id;

  const isProductTracked = status === 'active' || status === true ? true : false;

  const handleProductTrack = () => {
    const payload = {
      status: isProductTracked ? 'inactive' : 'active',
      productId,
      productTrackId: productTrackId ? productTrackId : null,
    };

    trackUntrackSellerProduct(payload);
  };

  const btnClassName = isProductTracked ? styles.unTrackBtn : styles.trackBtn;
  const btnLabel = isProductTracked ? 'Tracking' : 'Track Product';

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.productTrack}>
        <button className={btnClassName} onClick={handleProductTrack}>
          <TrackIcon />
          {btnLabel}
        </button>
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
export default connect(null, mapDispatchToProps)(TrackProduct);
