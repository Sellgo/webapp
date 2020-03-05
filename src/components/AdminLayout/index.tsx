import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { AdminHeader } from './AdminHeader';
import Sidebar from './Sidebar';
import Auth from '../Auth/Auth';
import './index.scss';
import './Sidebar.scss';

interface Props {
  auth: Auth;
}

class AdminLayout extends React.Component<Props> {
  public render() {
    const { children, auth } = this.props;

    return (
      <React.Fragment>
        <AdminHeader auth={auth}>{this.props.children}</AdminHeader>
        <Grid>
          <Grid.Column className="sidebar-container" width={1}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column className="admin-layout-grid" width={15}>
            <Segment className="admin-layout" basic={true}>
              {children}
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AdminLayout;
