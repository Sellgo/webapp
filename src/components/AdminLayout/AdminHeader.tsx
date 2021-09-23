import * as React from 'react';
import { Icon, Image, Menu, Dropdown, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogoutConfirm from '../LogoutConfirm';

import { notifyIdSelector } from '../../selectors/UserOnboarding';

import './AdminHeader.scss';

import { activeExportFiles } from '../../selectors/Products';
import { fetchActiveExportFiles } from '../../actions/Products';

import { FileExport } from '../../interfaces/FileExport';
import { SellerSubscription } from '../../interfaces/Seller';

import { toggleNotification } from '../../actions/Notification';

import { selectIsNotificationOpen } from '../../selectors/Notification';
import { getSellerSubscription } from '../../selectors/Subscription';
// import { isBetaAccount } from '../../utils/subscriptions';

interface AdminProps {
  auth: any;
  currentNotifyId: number;
  activeExportFiles: FileExport[];
  toggleNotification: (toggleState: boolean) => void;
  fetchActiveExportFiles: (payload: boolean) => void;
  isNotificationOpen: boolean;
  sellerSubscription: SellerSubscription;
}

class AdminHeader extends React.Component<AdminProps> {
  userName = localStorage.getItem('userName');
  userPicture = localStorage.getItem('userPicture');
  state = {
    isVisible: false,
    openConfirm: false,
  };

  toggleMenu = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  open = () => this.setState({ openConfirm: true });
  openConfirm = (text: boolean) => this.setState({ openConfirm: text });

  render() {
    const { auth, currentNotifyId } = this.props;

    return (
      <div className="admin-header">
        <Grid className={`${currentNotifyId > 0 && 'custom-dimmer'}`} />
        <Menu.Item>
          <Dropdown
            trigger={
              <>
                {this.userPicture ? (
                  <Image src={this.userPicture} avatar={true} />
                ) : (
                  <Icon name="user circle" style={{ fontSize: 18 }} />
                )}
              </>
            }
            pointing="top right"
            icon={null}
          >
            <Dropdown.Menu className="dropdownMenu">
              <div className="profileBox">PEEKA BOO!</div>
              <Dropdown.Item as={Link} to="/settings/pricing" styles={{ color: '#636d76' }}>
                Subscription
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/settings/profile" styles={{ color: '#636d76' }}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/settings/billing" styles={{ color: '#636d76' }}>
                Billing
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/settings/connectivity" styles={{ color: '#636d76' }}>
                Connectivity
              </Dropdown.Item>
              <Dropdown.Item onClick={this.open}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <LogoutConfirm auth={auth} open={this.state.openConfirm} openFunc={this.openConfirm} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currentNotifyId: notifyIdSelector(state),
    activeExportFiles: activeExportFiles(state),
    isNotificationOpen: selectIsNotificationOpen(state),
    sellerSubscription: getSellerSubscription(state),
  };
};

const mapDispatchToProps = {
  fetchActiveExportFiles: (isLoading: boolean) => fetchActiveExportFiles(isLoading),
  toggleNotification: (toggleState: boolean) => toggleNotification(toggleState),
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
