import * as React from 'react';
import { Icon, Image, Menu, Dropdown, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import LogoutConfirm from '../LogoutConfirm';
import MobileHeader from './MobileHeader';
import './AdminHeader.scss';

interface AdminProps {
  auth: any;
  children: any;
  fetchNotifyId: number;
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
    const { auth, fetchNotifyId } = this.props;
    const { isVisible } = this.state;
    return (
      <div className="admin-header">
        <Grid className={`${fetchNotifyId > 0 && 'custom-dimmer'}`} />
        <Menu inverted={true} borderless={true} fixed="top" className="top-menu">
          <Menu.Menu>
            <Menu.Item className="mobile-menu">
              <Icon className="bars" onClick={this.toggleMenu} />
            </Menu.Item>
            {isVisible && <MobileHeader />}
            <Menu.Item as={Link} to="/">
              <Logo size="small" />
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu className="right-menu" position="right" fitted="horizontally">
            <div className="divider" />
            <Menu.Item>
              <Dropdown
                trigger={
                  <>
                    {this.userPicture ? (
                      <Image src={this.userPicture} avatar={true} />
                    ) : (
                      <Icon name="user circle" style={{ fontSize: 25 }} />
                    )}
                    <span className="username">{this.userName}</span>
                  </>
                }
                pointing="top left"
              >
                <Dropdown.Menu style={{ width: '100%' }}>
                  <Dropdown.Item as={Link} to="/settings">
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings/pricing">
                    Subscription
                  </Dropdown.Item>
                  <Dropdown.Item onClick={this.open}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <LogoutConfirm auth={auth} open={this.state.openConfirm} openFunc={this.openConfirm} />
      </div>
    );
  }
}
