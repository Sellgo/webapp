import * as React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Sidebar from '../Sidebar';
import './index.scss';
import {
  NEW_PRODUCT_DESIGN_PATH_NAMES,
  HIDE_NAV_BAR_PATH_NAMES,
} from '../../constants/AdminLayout';

interface Props {
  subscriptionType: string;
  match: any;
}

class AdminLayout extends React.Component<Props> {
  public render() {
    const { children, match } = this.props;

    const isNewProduct = NEW_PRODUCT_DESIGN_PATH_NAMES.includes(window.location.pathname);
    const hideNavbar = HIDE_NAV_BAR_PATH_NAMES.includes(window.location.pathname);

    if (hideNavbar) {
      return (
        <main className="admin-layout-wrapper">
          <Segment
            className={`admin-layout new-admin-layout new-admin-layout__hide-nav`}
            basic={true}
          >
            <>{children}</>
          </Segment>
        </main>
      );
    } else {
      return (
        <main className="admin-layout-wrapper">
          {!hideNavbar && <Sidebar match={match} />}
          <Segment
            className={`admin-layout ${isNewProduct ? 'new-admin-layout' : ''}`}
            basic={true}
          >
            <>{children}</>
          </Segment>
        </main>
      );
    }
  }
}

const mapStateToProps = (state: any) => ({
  subscriptionType: state.subscription.subscriptionType,
});

export default connect(mapStateToProps)(AdminLayout);
