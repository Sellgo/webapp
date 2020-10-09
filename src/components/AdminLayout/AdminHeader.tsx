import * as React from 'react';
import { Icon, Image, Menu, Dropdown, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LogoutConfirm from '../LogoutConfirm';

import './AdminHeader.scss';

interface AdminProps {
  auth: any;
  children?: any;
  currentNotifyId: number;
}

export class AdminHeader extends React.Component<AdminProps> {
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
        <Menu.Item as={Link} to="/settings/">
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
