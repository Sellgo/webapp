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
import { toggleNotification } from '../../actions/Notification';

import { selectIsNotificationOpen } from '../../selectors/Notification';

interface AdminProps {
  auth: any;
  currentNotifyId: number;
  activeExportFiles: FileExport[];
  toggleNotification: (toggleState: boolean) => void;
  fetchActiveExportFiles: (payload: boolean) => void;
  isNotificationOpen: boolean;
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

        <Menu.Item as={Link} to="/settings">
          <Icon name="setting" color={'black'} size={'large'} className={'setting-icon'} />
        </Menu.Item>

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
  };
};

const mapDispatchToProps = {
  fetchActiveExportFiles: (isLoading: boolean) => fetchActiveExportFiles(isLoading),
  toggleNotification: (toggleState: boolean) => toggleNotification(toggleState),
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
