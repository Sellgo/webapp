import React from 'react';
import './index.scss';
import { Button, Icon, Progress } from 'semantic-ui-react';
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
import { SEARCH_STATUS } from '../../../../constants/SellerFinder';
interface Props {
  activeProductSellerStatus?: any;
  setActiveProduct?: (data: any) => void;
  data?: any;
  trackSeller: (id: any) => void;
  tracking?: any;
  trackProduct: (payload: TrackProductPayload) => void;
  trackingData: any;
}

const CheckMerchants = (props: Props) => {
  const loading =
    props.activeProductSellerStatus.status === SEARCH_STATUS.PENDING &&
    props.activeProductSellerStatus.asin === props.data.asin;
  return (
    <>
      <div className={'track-btn-container'}>
        <Button
          className={`reload-merchant`}
          onClick={() => (props.setActiveProduct ? props.setActiveProduct(props.data) : undefined)}
        >
          {loading && <Icon name="refresh" loading={loading} />}
          <span className="tracking-label">Check Sellers</span>
        </Button>
      </div>
      {![SEARCH_STATUS.SUCCESS, SEARCH_STATUS.DONE].includes(
        props.activeProductSellerStatus.status
      ) &&
        props.activeProductSellerStatus.asin === props.data.asin && (
          <div className="seller-progress">
            <Progress
              percent={
                props.activeProductSellerStatus.error_status
                  ? 100
                  : props.activeProductSellerStatus.progress
              }
              size="tiny"
              success={!props.activeProductSellerStatus.error_status}
              error={props.activeProductSellerStatus.error_status}
              active={props.activeProductSellerStatus.progress !== 100}
            />
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckMerchants);
