import * as React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Sidebar from '../Sidebar';
import './index.scss';
import {
  NEW_PRODUCT_DESIGN_PATH_NAMES,
  HIDE_NAV_BAR_PATH_NAMES,
} from '../../constants/AdminLayout';
import { isSellgoSession } from '../../utils/session';

interface Props {
  subscriptionType: string;
  match: any;
}

class AdminLayout extends React.Component<Props> {
  public render() {
    const { children, match } = this.props;

    const isNewProduct = NEW_PRODUCT_DESIGN_PATH_NAMES.includes(window.location.pathname);
    const isSellerDatabase = window.location.pathname === '/abm/database';
    const hideNavBar = HIDE_NAV_BAR_PATH_NAMES.includes(
      window.location.pathname + window.location.search
    );

    /* If first time logged in, display full page with custom top bar and hide nav bar */
    if (hideNavBar) {
      return (
        <main className="admin-layout-wrapper">
          <Segment
            className={`admin-layout new-admin-layout new-admin-layout__hide-nav ${
              isSellerDatabase ? 'admin-layout__hide-overflow' : ''
            }`}
            basic={true}
          >
            <>{children}</>
          </Segment>
        </main>
      );
    } else {
      return (
        <main className="admin-layout-wrapper">
          {!isSellgoSession() && <Sidebar match={match} />}
          <Segment
            className={`admin-layout ${isNewProduct ? 'new-admin-layout' : ''} ${
              isSellerDatabase ? 'admin-layout__hide-overflow' : ''
            }`}
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
