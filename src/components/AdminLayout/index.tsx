import * as React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Sidebar from './Sidebar';
import Auth from '../Auth/Auth';
import './index.scss';
import { isSubscriptionNotPaid } from '../../utils/subscriptions';

interface Props {
  auth: Auth;
  subscriptionType: string;
}

class AdminLayout extends React.Component<Props> {
  public render() {
    const { children, auth, subscriptionType } = this.props;

    return (
      <React.Fragment>
        <Sidebar auth={auth}>
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
