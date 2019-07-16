import * as React from 'react';
import { Segment, Sidebar } from 'semantic-ui-react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { PageHeader } from './PageHeader';

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}
export class AdminLayout extends React.Component<any, LayoutProps> {
  public render() {
    const { children, title, auth, sellerData } = this.props;

    return (
      <React.Fragment>
        <AdminHeader sellerData={sellerData} />
        <Sidebar.Pushable style={{ minHeight: 'calc(100vh - 3rem)' }}>
          <AdminSidebar auth={auth} />
          <Sidebar.Pusher style={{ width: 'calc(100vw - 50px)' }}>
            <Segment basic={true}>
              <PageHeader title={title} />
              {children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    );
  }
}
