import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import { AdminHeader } from './AdminHeader';

interface Props {}

class AdminLayout extends React.Component<Props> {
  public render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <AdminHeader />

        <Segment
          basic={true}
          style={{
            height: '100%',
            minHeight: '100vh',
            marginTop: 0,
            paddingTop: 20,
            transition: 'width 0.8s,padding 0.8s',
            backgroundColor: '#f3f3f3f3',
          }}
        >
          {children}
        </Segment>
      </React.Fragment>
    );
  }
}

export default AdminLayout;
