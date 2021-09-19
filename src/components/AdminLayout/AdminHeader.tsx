import * as React from 'react';
import { Icon, Image, Menu, Dropdown, Grid, Checkbox, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogoutConfirm from '../LogoutConfirm';

import { getUserOnboarding, notifyIdSelector } from '../../selectors/UserOnboarding';

import './AdminHeader.scss';

import { activeExportFiles } from '../../selectors/Products';
import { fetchActiveExportFiles } from '../../actions/Products';

import { FileExport } from '../../interfaces/FileExport';
import { SellerSubscription } from '../../interfaces/Seller';

import { toggleNotification } from '../../actions/Notification';

import { selectIsNotificationOpen } from '../../selectors/Notification';
import { getSellerSubscription } from '../../selectors/Subscription';
import { isBetaAccount } from '../../utils/subscriptions';
import { setUserOnboarding } from '../../actions/UserOnboarding';

interface AdminProps {
  auth: any;
  currentNotifyId: number;
  activeExportFiles: FileExport[];
  toggleNotification: (toggleState: boolean) => void;
  fetchActiveExportFiles: (payload: boolean) => void;
  isNotificationOpen: boolean;
  sellerSubscription: SellerSubscription;
  setUserOnboarding: (payload: boolean) => void;
  userOnboarding: boolean;
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
    const {
      auth,
      currentNotifyId,
      sellerSubscription,
      userOnboarding,
      setUserOnboarding,
    } = this.props;

    return (
      <div className="admin-header">
        <Grid className={`${currentNotifyId > 0 && 'custom-dimmer'}`} />

        <Popup
          className="enableLearningPopup"
          trigger={
            <Checkbox
              toggle
              label="Quick Learning"
              className="userOnboardingToogle"
              checked={userOnboarding}
              onChange={(e: any, data) => {
                setUserOnboarding(Boolean(data.checked));
              }}
            />
          }
          content={<p className="enableLearningTooltipMessage">Toggle to enable learning mode</p>}
        />

        {/* Show settings icon only if not a beta user account */}
        {!isBetaAccount(sellerSubscription) && (
          <Menu.Item as={Link} to="/settings">
            <Icon name="setting" color={'black'} size={'large'} className={'setting-icon'} />
          </Menu.Item>
        )}

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
            <Dropdown.Menu style={{ width: '100%' }}>
              <Dropdown.Item as={Link} to="/settings/pricing">
                Subscription
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
    userOnboarding: getUserOnboarding(state),
  };
};

const mapDispatchToProps = {
  fetchActiveExportFiles: (isLoading: boolean) => fetchActiveExportFiles(isLoading),
  toggleNotification: (toggleState: boolean) => toggleNotification(toggleState),
  setUserOnboarding: (payload: boolean) => setUserOnboarding(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
