import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { isPlanEnterprise } from '../../utils/subscriptions';
import './index.scss';

interface Props {
  subscriptionType: string;
}

const LeadsTrackerToggle = (props: any | Props) => {
  const { setLeadsTracker, seller_id, supplier_id, isToggle, subscriptionType } = props;

  return (
    <div
      className={`ToggleSwitch ToggleSwitch__rounded ${!isPlanEnterprise(subscriptionType) &&
        'hidden'}`}
    >
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
  subscriptionType: get(state, 'subscription.subscriptionType'),
});

export default connect(mapStateToProps)(LeadsTrackerToggle);
