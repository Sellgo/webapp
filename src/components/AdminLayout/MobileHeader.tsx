import * as React from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './AdminHeader.scss';

export default class MobileHeader extends React.Component<any> {
  state = {
    open: true,
  };
  render() {
    return (
      <div className="mobile-header">
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted={true}
          vertical={true}
          visible={this.state.open}
          className="sidebar-menu"
          width="thin"
        >
          <Menu.Menu>
            <Menu.Item
              as={Link}
              to="/synthesis"
              className={
                window.location.pathname === '/synthesis' ? 'side-menu active-item' : 'side-menu'
              }
              onClick={() => this.setState({ open: false })}
            >
              <i className="fas fa-search-dollar" style={{ fontSize: 18 }} />
              <span className="header-values">Profit Finder</span>
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/product-tracker"
              className={
                window.location.pathname === '/product-tracker'
                  ? 'side-menu active-item'
                  : 'side-menu'
              }
              onClick={() => this.setState({ open: false })}
            >
              Product Tracker
            </Menu.Item>
          </Menu.Menu>
        </Sidebar>
      </div>
    );
  }
}
