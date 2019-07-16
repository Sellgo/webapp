import * as React from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

interface LayoutProps {
  children?: React.ReactNode;
}

export class AdminSidebar extends React.Component<any, LayoutProps> {
  componentWillMount() {}
  render() {
    const { logout } = this.props.auth;
    return (
      <Sidebar as={Menu} borderless={true} inverted={true} vertical={true} visible={true} icon={true} >
        <Menu.Item style={{marginTop:50}}>
          <Menu.Header as={Link} to="/">
            <Icon name="home" size="big" />
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as={Link} to="/dashboard/setting">
          <Menu.Header style={{alignItems:'center'}}>
            <Icon name="setting" size="big" />
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as={Link} to="/syn">
          <Menu.Header>
            <Icon name="dot circle outline" size="big" />
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as="a" onClick={logout}>
          <Menu.Header>
            <Icon name="log out" size="big" />
          </Menu.Header>
        </Menu.Item>
      </Sidebar>
    );
  }
}
