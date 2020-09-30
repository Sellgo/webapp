import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import './index.scss';
import { isPlanEnterprise } from '../../utils/subscriptions';

interface Props {
  subscriptionPlan: string;
}

const LeadsTrackerToggle = (props: any | Props) => {
  const { setLeadsTracker, seller_id, supplier_id, isToggle, subscriptionPlan } = props;
  const isEnterprise = !isPlanEnterprise(subscriptionPlan) && 'hidden';

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
  subscriptionPlan: get(state, 'subscription.plan'),
});

export default connect(mapStateToProps)(LeadsTrackerToggle);
