import * as React from 'react';
import { Icon, Image, Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import './AdminHeader.css';

export class AdminHeader extends React.Component<any> {
  userName = localStorage.getItem('userName');
  userPicture = localStorage.getItem('userPicture');

  render() {
    const { auth } = this.props;
    return (
      <div className="admin-header">
        <Menu inverted={true} borderless={true} fixed="top" className="top-menu">
          <Menu.Menu>
            <Menu.Item as={Link} to="/">
              <Logo size="small" />
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu position="right" fitted="horizontally">
            <Menu.Item as={Link} to="/settings/subscription" className="icon-item">
              <Icon name="rss" />
            </Menu.Item>
            <Menu.Item as={Link} to="/search" className="icon-item">
              <Icon name="search" />
            </Menu.Item>
            <Menu.Item as={Link} to="/notifications" className="icon-item">
              <Icon name="bell" />
            </Menu.Item>
            <div className="divider" />
            <Menu.Item>
              <Dropdown
                trigger={
                  <>
                    {this.userPicture ? (
                      <Image src={this.userPicture} avatar />
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
                  <Dropdown.Item onClick={auth.logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <div className="navbar-spacer" />
      </div>
    );
  }
}
