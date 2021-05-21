import React from 'react';
import './index.scss';
import { Button, Icon } from 'semantic-ui-react';
import {
  activeProductSellerStatus,
  productSellerTrackStatus,
} from '../../../../selectors/SellerFinder';
import {
  setActiveProduct,
  trackProduct,
  TrackProductPayload,
  trackProductSeller,
} from '../../../../actions/SellerFinder';
import { connect } from 'react-redux';
interface Props {
  type?: string;
  activeProductSellerStatus?: any;
  setActiveProduct?: (data: any) => void;
  data?: any;
  trackSeller: (id: any) => void;
  tracking?: any;
  trackProduct: (payload: TrackProductPayload) => void;
  trackingData: any;
}

const TrackSeller = (props: Props) => {
  const { data, trackSeller, type, trackProduct, trackingData } = props;
  const track = () => {
    if (type === 'product') {
      let payload: any = {
        status: data.tracking_status === 'active' ? 'inactive' : 'active',
        product_id: data.product_id,
      };
      if (data.product_track_id) {
        payload = { ...payload, product_track_id: data.product_track_id };
      }
      trackProduct(payload);
    } else {
      trackSeller(data.seller_merchant_id);
    }
  };
  const status = data.tracking_status;
  const loading = trackingData.seller_merchant_id === data.seller_merchant_id;
  return (
    <>
      <div className={'track-btn-container'}>
        <Button
          className={`${props.type === 'seller' ? 'track-seller' : 'track-product'} ${
            status === 'active' ? 'tracking' : 'not-tracking'
          }
        `}
          onClick={track}
        >
          <span>
            {props.type === 'product' && <i className={'fas fa-fingerprint'} />}
            {props.type === 'seller' && (
              <Icon name={loading ? 'spinner' : 'plus'} loading={loading} />
            )}
          </span>
          <span className="tracking-label">{status === 'active' ? `Tracking` : 'Track'}</span>
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  activeProductSellerStatus: activeProductSellerStatus(state),
  trackingData: productSellerTrackStatus(state),
});
const mapDispatchToProps = {
  setActiveProduct: (data: any) => setActiveProduct(data),
  trackSeller: (payload: any) => trackProductSeller(payload),
  trackProduct: (payload: TrackProductPayload) => trackProduct(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSeller);
