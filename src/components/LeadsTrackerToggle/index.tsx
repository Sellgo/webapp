import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import './index.scss';

interface Props {
  sellerSubscription: any;
}

const LeadsTrackerToggle = (props: any | Props) => {
  const { setLeadsTracker, seller_id, supplier_id, isToggle, sellerSubscription } = props;
  const isEnterprise = !(sellerSubscription.subscription_id === 3) && 'hidden';

  return (
    <div className={`ToggleSwitch ToggleSwitch__rounded ${isEnterprise}`}>
      <div className="ToggleSwitch__wrapper">
        <div
          className={`Slider ${isToggle ? 'active' : ''}`}
          onClick={() => setLeadsTracker(seller_id, supplier_id)}
        >
          <i className={`fas fa-user-ninja ${isToggle ? 'active' : ''}`} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: {}) => ({
  sellerSubscription: get(state, 'subscription.sellerSubscription'),
});

export default connect(mapStateToProps)(LeadsTrackerToggle);
