import React from 'react';
import { connect } from 'react-redux';
import { trackProduct, TrackProductPayload } from '../../../../actions/SellerFinder';

/* Actions */

interface Props {
  data: any;
  trackProduct: (payload: TrackProductPayload) => void;
}

const TrackProduct: React.FC<Props> = props => {
  const { data, trackProduct } = props;

  const handleTrack = () => {
    let payload: any = {
      status: data.tracking_status === 'active' ? 'inactive' : 'active',
      product_id: data.product_id,
    };
    if (data.product_track_id) {
      payload = { ...payload, product_track_id: data.product_track_id };
    }
    trackProduct(payload);
  };

  return (
    <button onClick={() => handleTrack()} className="product-tracking-button">
      {data.tracking_status === 'active' ? 'Track Product' : 'Tracking'}
    </button>
  );
};

const mapDispatchToProps = {
  trackProduct: (payload: TrackProductPayload) => trackProduct(payload),
};
export default connect(null, mapDispatchToProps)(TrackProduct);
