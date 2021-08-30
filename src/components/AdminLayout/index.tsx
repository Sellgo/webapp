import * as React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Sidebar from './Sidebar';
import './index.scss';

interface Props {
  subscriptionType: string;
}

class AdminLayout extends React.Component<Props> {
  public render() {
    const { children } = this.props;

    const path = window.location.pathname;

    return (
      <React.Fragment>
        <Sidebar>
          <Segment
            className={`admin-layout ${path === '/keyword-research' ? 'new-layout' : ''}`}
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
