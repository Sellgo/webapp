import React from 'react';
import { Rail, Segment, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './index.scss';
import moment from 'moment';
import { isPlanPaid } from '../../utils/subscriptions';
import history from '../../history';

interface SubscriptionMessageProps {
  sellerSubscription: any;
  subscriptionType: string;
  page: string;
}

class SubscriptionMessage extends React.Component<SubscriptionMessageProps> {
  constructor(props: any) {
    super(props);
  }

  getExpiration = (): { expireDateDay?: any; expireDateMinutes: any } => {
    const { sellerSubscription } = this.props;
    const today = new Date();
    const exp = new Date(sellerSubscription.expiry_date);
    const expireDateDay = moment(exp).diff(today, 'days');
    const expireDateMinutes = moment(exp).diff(today, 'minutes');
    return { expireDateDay, expireDateMinutes };
  };

  content() {
    const { sellerSubscription } = this.props;
    const { expireDateDay, expireDateMinutes } = this.getExpiration();

    if (isPlanPaid(sellerSubscription.subscription_id) && expireDateMinutes > 0) {
      return (
        <p>{`Your trial runs out in  ${expireDateDay} ${expireDateDay > 1 ? 'days' : 'day'}.`}</p>
      );
    }
  }

  isHighMessage() {
    const { page } = this.props;
    return page === 'search-management' || page === 'settings' || page === 'subscription'
      ? 'high'
      : '';
  }
  componentDidMount() {
    const { sellerSubscription } = this.props;
    if (!isPlanPaid(sellerSubscription.subscription_id)) {
      history.push('/settings/pricing');
    }
  }

  render() {
    const { subscriptionType, sellerSubscription } = this.props;
    const { expireDateMinutes } = this.getExpiration();
    return (
      <>
        {isPlanPaid(sellerSubscription.subscription_id) && expireDateMinutes > 0 && (
          <Rail
            className={`free-trial-period ${this.isHighMessage()}`}
            internal={true}
            position="left"
            key={subscriptionType}
          >
            <Segment>
              <Message success content={this.content()} />
            </Segment>
          </Rail>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  sellerSubscription: state.subscription.sellerSubscription,
  subscriptionType: state.subscription.subscriptionType,
});

export default connect(mapStateToProps)(SubscriptionMessage);
