import * as React from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

interface State {
  isSidebarExpanded: boolean;
}

export class AdminSidebar extends React.Component<any, State> {
  state = {
    isSidebarExpanded: false,
  };

  componentWillMount() {}

  render() {
    const { logout } = this.props.auth;
    return (
      <Sidebar
        as={Menu}
        direction={'left'}
        animation={'push'}
        width={this.state.isSidebarExpanded ? 'thin' : 'very thin'}
        style={{ width: this.state.isSidebarExpanded ? 150 : 60 }}
        borderless={true}
        inverted={true}
        vertical={true}
        visible={true}
      >
        <Menu.Item style={{ marginTop: 50 }} as={Link} to="/">
          <Menu.Header>
            <div>
              <Icon name="home" style={{ fontSize: 25 }} />
              {this.state.isSidebarExpanded ? '  Home' : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as={Link} to="/dashboard/setting">
          <Menu.Header style={{ alignItems: 'center' }}>
            <div>
              <Icon name="setting" style={{ fontSize: 25 }} />
              {this.state.isSidebarExpanded ? '  Settings' : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as={Link} to="/syn">
          <Menu.Header>
            <div>
              <Icon name="dot circle outline" style={{ fontSize: 25 }} />
              {this.state.isSidebarExpanded ? '  SYN' : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as="a" onClick={logout}>
          <Menu.Header>
            <div>
              <Icon name="log out" style={{ fontSize: 25 }} />
              {this.state.isSidebarExpanded ? '  Logout' : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item
          as="a"
          onClick={() => {
            this.setState(
              {
                isSidebarExpanded: !this.state.isSidebarExpanded,
              },
              () => {
                this.props.handleExpand(this.state.isSidebarExpanded);
              }
            );
          }}
        >
          <Menu.Header>
            <Icon
              name={this.state.isSidebarExpanded ? 'chevron circle left' : 'chevron circle right'}
              style={{ fontSize: 25 }}
            />
          </Menu.Header>
        </Menu.Item>
      </Sidebar>
    );
  }
}
