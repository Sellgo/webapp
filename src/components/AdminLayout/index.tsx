import * as React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Sidebar from './Sidebar';
import './index.scss';
import { isSubscriptionNotPaid } from '../../utils/subscriptions';

interface Props {
  subscriptionType: string;
}

class AdminLayout extends React.Component<Props> {
  public render() {
    const { children, subscriptionType } = this.props;

    return (
      <React.Fragment>
        <Sidebar>
          <Segment
            className={`admin-layout ${
              isSubscriptionNotPaid(subscriptionType) ? 'message-active' : ''
            } `}
            basic={true}
          >
            <>{children}</>
          </Segment>
        </Sidebar>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  subscriptionType: state.subscription.subscriptionType,
});

export default connect(mapStateToProps)(AdminLayout);
