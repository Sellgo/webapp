import * as React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { AdminHeader } from './AdminHeader';
import { notifyIdSelector } from '../../selectors/UserOnboarding';
import Sidebar from './Sidebar';
import Auth from '../Auth/Auth';
import './index.scss';
import { isSubscriptionNotPaid } from '../../utils/subscriptions';

interface Props {
  auth: Auth;
  currentNotifyId: number;
  subscriptionType: string;
}

class AdminLayout extends React.Component<Props> {
  public render() {
    const { children, auth, currentNotifyId, subscriptionType } = this.props;

    return (
      <React.Fragment>
        <Sidebar auth={auth}>
          <Segment
            className={`admin-layout ${
              isSubscriptionNotPaid(subscriptionType) ? 'message-active' : ''
            } `}
            basic={true}
          >
            <>
              <AdminHeader currentNotifyId={currentNotifyId} auth={auth} />
              {children}
            </>
          </Segment>
        </Sidebar>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentNotifyId: notifyIdSelector(state),
  subscriptionType: state.subscription.subscriptionType,
});

export default connect(mapStateToProps)(AdminLayout);
