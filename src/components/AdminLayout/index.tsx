import * as React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Sidebar from '../Nav';
import './index.scss';
import { newProductDesignPathNames } from '../../constants';

interface Props {
  subscriptionType: string;
}

class AdminLayout extends React.Component<Props> {
  public render() {
    const { children } = this.props;

    const isNewProduct = newProductDesignPathNames.includes(window.location.pathname);

    return (
      <main id="admin-layout-wrapper">
        <Sidebar />
        <Segment className={`admin-layout ${isNewProduct ? 'new-admin-layout' : ''}`} basic={true}>
          <>{children}</>
        </Segment>
      </main>
    );
  }
}

const mapStateToProps = (state: any) => ({
  subscriptionType: state.subscription.subscriptionType,
});

export default connect(mapStateToProps)(AdminLayout);
