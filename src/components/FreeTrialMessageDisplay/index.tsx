import React from 'react';
import { Rail, Segment, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './index.scss';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';

interface SubscriptionMessageProps {
  sellerSubscription: any;
}

class SubscriptionMessage extends React.Component<SubscriptionMessageProps> {
  constructor(props: any) {
    super(props);
  }

  content() {
    const { sellerSubscription } = this.props;
    if (!_.isEmpty(sellerSubscription.expiry_date)) {
      const todayDate = moment();
      const expireDate = moment(sellerSubscription.expiry_date).diff(todayDate, 'days');
      return (
        <p>
          {' '}
          {`Your free trial runs out in  ${expireDate} days. Do you like our product? `}
          <Link to="/settings/pricing" className="free-trial-btn">
            <span>Click here to pick a plan</span>
          </Link>
        </p>
      );
    } else {
      return (
        <p>
          {' Your free account can only view demo files. To unlock features . '}
          <Link to="/settings/pricing" className="free-trial-btn">
            <span>Click here to pick a plan</span>
          </Link>
        </p>
      );
    }
  }
  render() {
    return (
      <Rail className="free-trial-period" internal={true} position="left">
        <Segment>
          <Message success content={this.content()} />
        </Segment>
      </Rail>
    );
  }
}

const mapStateToProps = (state: any) => ({
  sellerSubscription: state.subscription.sellerSubscription,
});

export default connect(mapStateToProps)(SubscriptionMessage);
