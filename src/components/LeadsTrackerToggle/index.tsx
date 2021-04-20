import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import './index.scss';

interface Props {
  subscriptionPlan: string;
}

const LeadsTrackerToggle = (props: any | Props) => {
  const { setLeadsTracker, seller_id, supplier_id, isToggle, disabled } = props;

  return (
    <div className={`ToggleSwitch ToggleSwitch__rounded`}>
      <div className="ToggleSwitch__wrapper">
        <div
          className={`Slider ${isToggle ? 'active' : ''} `}
          onClick={() => {
            if (!disabled) {
              setLeadsTracker(seller_id, supplier_id);
            }
          }}
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
