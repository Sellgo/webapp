import React from 'react';
import './index.scss';
import { Button, Icon } from 'semantic-ui-react';
import { activeProductSellerStatus } from '../../../../selectors/SellerFinder';
import { setActiveProduct } from '../../../../actions/SellerFinder';
import { connect } from 'react-redux';
import { SEARCH_STATUS } from '../../../../constants/SellerFinder';
interface Props {
  tracking: boolean;
  type?: string;
  activeProductSellerStatus?: any;
  setActiveProduct?: (data: any) => void;
  data?: any;
}

const TrackSeller = (props: Props) => {
  return (
    <div className={'track-btn-container'}>
      <Button
        className={`${props.type === 'seller' ? 'track-seller' : 'track-product'} ${
          props.tracking ? 'tracking' : 'not-tracking'
        }`}
      >
        <span>
          {props.type === 'product' && <i className={'fas fa-fingerprint'} />}
          {props.type === 'seller' && '+'}
        </span>
        <span className="tracking-label">Track</span>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSeller);
