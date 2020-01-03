import * as React from 'react';
import { Icon, Image, Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import MobileHeader from './MobileHeader';
import './AdminHeader.scss';

export class AdminHeader extends React.Component<any> {
  userName = localStorage.getItem('userName');
  userPicture = localStorage.getItem('userPicture');
  state = {
    isVisible: false,
  };

  toggleMenu = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };
  render() {
    const { auth } = this.props;
    const { isVisible } = this.state;
    return (
      <div className="admin-header">
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
          <Menu.Menu className="main-menu">
            <Menu.Item
              as={Link}
              to="/synthesis"
              className={window.location.pathname === '/synthesis' ? 'active-menu' : ''}
            >
              <i className="fas fa-search-dollar" style={{ fontSize: 18 }}></i>
              <span className="header-values">Profit Finder</span>
              <i className="arrow is-right" />
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/product-tracker"
              className={window.location.pathname === '/product-tracker' ? 'active-menu' : ''}
            >
              Product Tracker
            </Menu.Item>
            {/* <Menu.Item as={Link} to="/dashboard">
              Dashboard
            </Menu.Item> */}
          </Menu.Menu>

          <Menu.Menu className="right-menu" position="right" fitted="horizontally">
            <Menu.Item as={Link} to="/settings/pricing">
              <Icon className="bell" />
            </Menu.Item>
            {/* <Menu.Item as={Link} to="/search">
              <Icon name="search" />
            </Menu.Item> */}
            {/* <Menu.Item as={Link} to="/notifications">
              <Icon name="bell" />
            </Menu.Item> */}
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
