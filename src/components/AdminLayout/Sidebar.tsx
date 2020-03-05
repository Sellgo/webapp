import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface Icon {
  id: number;
  name: string;
  path: string;
}

interface State {
  sidebarIcon?: Icon[];
  activeItem?: string;
}

class Sidebar extends React.Component<State> {
  handlePath = () => {
    switch (window.location.pathname) {
      case '/synthesis':
        return 'fa-search-dollar';
      case '/product-tracker':
        return 'fa-fingerprint';
      default:
        return 'fa-search-dollar';
    }
  };

  state = {
    sidebarIcon: [
      { id: 1, name: 'fa-chart-bar', path: '' },
      { id: 2, name: 'fa-cloud-upload-alt', path: '' },
      { id: 3, name: 'fa-clipboard-list', path: '' },
      { id: 4, name: 'fa-search-dollar', path: '/synthesis' },
      { id: 5, name: 'fa-fingerprint', path: '/product-tracker' },
      { id: 6, name: 'fa-angle-left', path: '' },
      { id: 7, name: 'fa-sign-out-alt', path: '' },
      { id: 8, name: 'fa-user-cog', path: '' },
    ],
    activeItem: this.handlePath(),
  };

  handleItemClick = (e: React.MouseEvent, name: string) => this.setState({ activeItem: name });

  public render() {
    const { activeItem } = this.state;
    const sidebarMenu = (
      <Menu className="sidebar-menu" inverted={true} icon={true} vertical={true} borderless={true}>
        <Menu.Menu>
          {this.state.sidebarIcon.map((icon: Icon) => {
            if (icon.id < 6) {
              return (
                <Menu.Item
                  key={icon.id}
                  as={Link}
                  to={icon.path}
                  name={icon.name}
                  active={activeItem === icon.name}
                  onClick={e => this.handleItemClick(e, icon.name)}
                >
                  <i className={`fas ${icon.name}`} />
                </Menu.Item>
              );
            }
          })}
        </Menu.Menu>
        <Menu.Menu className="sidebar-bottom-icon">
          {this.state.sidebarIcon.map((icon: Icon) => {
            if (icon.id >= 6) {
              return (
                <Menu.Item
                  key={icon.id}
                  as={Link}
                  to={icon.path}
                  name={icon.name}
                  active={activeItem === icon.name}
                  onClick={e => this.handleItemClick(e, icon.name)}
                >
                  <i className={`fas ${icon.name}`} />
                </Menu.Item>
              );
            }
          })}
        </Menu.Menu>
      </Menu>
    );

    return <React.Fragment> {sidebarMenu} </React.Fragment>;
  }
}

export default Sidebar;
