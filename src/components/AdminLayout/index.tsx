import * as React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { AdminHeader } from './AdminHeader';
import { fetchNotifyId } from '../../selectors/UserOnboarding';
import Sidebar from './Sidebar';
import Auth from '../Auth/Auth';
import './index.scss';

interface Props {
  auth: Auth;
  fetchNotifyId: number;
}

class AdminLayout extends React.Component<Props> {
  public render() {
    const { children, auth, fetchNotifyId } = this.props;

    return (
      <React.Fragment>
        <AdminHeader fetchNotifyId={fetchNotifyId} auth={auth}>
          {this.props.children}
        </AdminHeader>
        <Sidebar auth={auth}>
          <Segment className="admin-layout" basic={true}>
            {children}
          </Segment>
        </Sidebar>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  fetchNotifyId: fetchNotifyId(state),
});

export default connect(mapStateToProps)(AdminLayout);
