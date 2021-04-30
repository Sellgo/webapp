import React from 'react';
import './index.scss';
import { Button, Icon } from 'semantic-ui-react';
import { activeProductSellerStatus } from '../../../../selectors/SellerFinder';
import {
  setActiveProduct,
  trackProduct,
  TrackProductPayload,
  trackProductSeller,
} from '../../../../actions/SellerFinder';
import { connect } from 'react-redux';
import { SEARCH_STATUS } from '../../../../constants/SellerFinder';
interface Props {
  type?: string;
  activeProductSellerStatus?: any;
  setActiveProduct?: (data: any) => void;
  data?: any;
  trackSeller: (id: any) => void;
  tracking?: any;
  trackProduct: (payload: TrackProductPayload) => void;
}

const TrackSeller = (props: Props) => {
  const { data, trackSeller, type, trackProduct } = props;
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
  const status = type === 'product' ? data.tracking_status : data.track_status;
  return (
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
          {props.type === 'seller' && '+'}
        </span>
        <span className="tracking-label">{status === 'active' ? `Tracking` : 'Track'}</span>
      </Button>
      {props.type === 'product' && (
        <span>
          <Icon name="refresh" color="grey" />
        </span>
      )}
      {props.type === 'product' && (
        <Button
          className={`reload-product`}
          onClick={() => (props.setActiveProduct ? props.setActiveProduct(props.data) : undefined)}
        >
          <Icon
            name="refresh"
            loading={
              props.activeProductSellerStatus.status === SEARCH_STATUS.PENDING &&
              props.activeProductSellerStatus.asin === props.data.asin
            }
          />

          <span className="tracking-label">Merchants</span>
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  activeProductSellerStatus: activeProductSellerStatus(state),
});
const mapDispatchToProps = {
  setActiveProduct: (data: any) => setActiveProduct(data),
  trackSeller: (payload: any) => trackProductSeller(payload),
  trackProduct: (payload: TrackProductPayload) => trackProduct(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSeller);
