import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import { AdminHeader } from './AdminHeader';
import Sidebar from './Sidebar';
import Auth from '../Auth/Auth';
import './index.scss';

interface Props {
  auth: Auth;
}

class AdminLayout extends React.Component<Props> {
  public render() {
    const { children, auth } = this.props;

    return (
      <React.Fragment>
        <AdminHeader auth={auth}>{this.props.children}</AdminHeader>
        <Sidebar auth={auth}>
          <Segment className="admin-layout" basic={true}>
            {children}
          </Segment>
        </Sidebar>
      </React.Fragment>
    );
  }
}

export default AdminLayout;
