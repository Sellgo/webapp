import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import './index.scss';

interface Props {
  subscriptionType: string;
}

const LeadsTrackerToggle = (props: any | Props) => {
  const { setLeadsTracker, seller_id, supplier_id, isToggle, subscriptionType } = props;

  const isEnterprise = subscriptionType === 'Enterprise' ? true : false;
  return (
    <div className={`ToggleSwitch ToggleSwitch__rounded ${isEnterprise ? '' : 'hidden'}`}>
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
