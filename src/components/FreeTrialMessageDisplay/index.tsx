import React from 'react';
import { Rail, Segment, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './index.scss';
import moment from 'moment';
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
    if (sellerSubscription.subscription_id === 4) {
      const todayDate = moment();
      const expireDate = moment(sellerSubscription.expiry_date).diff(todayDate, 'days');
      return (
        <p>
          {`Your free trial runs out in  ${expireDate} days. Do you like our product? `}
          <Link to="/settings/pricing" className="free-trial-btn">
            <span>Click here to pick a plan</span>
          </Link>
        </p>
      );
    } else if (sellerSubscription.subscription_id === 5) {
      if (sellerSubscription.expiry_date !== null) {
        const todayDate = moment();
        const expireDate = moment(sellerSubscription.expiry_date).diff(todayDate, 'days');
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
    const { sellerSubscription } = this.props;
    return (
      (sellerSubscription.subscription_id === 4 || sellerSubscription.subscription_id === 5) && (
        <Rail className="free-trial-period" internal={true} position="left">
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
});

export default connect(mapStateToProps)(SubscriptionMessage);
