import React from 'react';
import { Rail, Segment, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './index.scss';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  isSubscriptionTrial,
  isSubscriptionFree,
  isSubscriptionNotPaid,
} from '../../utils/subscriptions';

interface SubscriptionMessageProps {
  sellerSubscription: any;
  subscriptionType: string;
}

class SubscriptionMessage extends React.Component<SubscriptionMessageProps> {
  constructor(props: any) {
    super(props);
  }

  content() {
    const { sellerSubscription, subscriptionType } = this.props;
    const today = new Date();
    const exp = new Date(sellerSubscription.expiry_date);
    const expireDate = moment(exp).diff(today, 'days');
    if (isSubscriptionTrial(subscriptionType)) {
      return (
        <p>
          {`Your free trial runs out in  ${expireDate} days. Do you like our product? `}
          <Link to="/settings/pricing" className="free-trial-btn">
            <span>Click here to pick a plan</span>
          </Link>
        </p>
      );
    } else if (isSubscriptionFree(subscriptionType)) {
      if (sellerSubscription.expiry_date !== null && expireDate >= 0) {
        return (
          <p>
            {`Your free trial runs out in  ${expireDate} days. It seems there was a problem with your MWS token `}
            <Link to="/settings" className="free-trial-btn">
              <span>Click here to re-enter your MWS Token</span>
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
  }
  render() {
    const { subscriptionType } = this.props;
    return (
      isSubscriptionNotPaid(subscriptionType) && (
        <Rail className="free-trial-period" internal={true} position="left" key={subscriptionType}>
          <Segment>
            <Message success content={this.content()} />
          </Segment>
        </Rail>
      )
    );
  }
}

const mapStateToProps = (state: any) => ({
  sellerSubscription: state.subscription.sellerSubscription,
  subscriptionType: state.subscription.subscriptionType,
});

export default connect(mapStateToProps)(SubscriptionMessage);
