import * as React from 'react';
import { Icon, Image, Menu, SemanticSIZES } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

export const Logo: React.SFC<{ size?: SemanticSIZES; centered?: boolean }> = ({
  size,
  centered,
}) => (
  <Image
    ui={true}
    style={{ width: 80 }}
    centered={centered || false}
    src="/images/sellgo_logo.png"
  />
);

export class AdminHeader extends React.Component<any> {
  private readonly height = 45;
  userName = localStorage.getItem('userName');
  userPicture = localStorage.getItem('userPicture');

  render() {
    return (
      <React.Fragment>
        <Menu
          inverted={true}
          borderless={true}
          fixed="top"
          style={{ height: this.height, backgroundColor: '#444444', paddingLeft: 80 }}
          className="top-menu"
        >
          <Menu.Menu>
            <Menu.Item className="top-logo" as={Link} to="/" content={<Logo size="small" />} />
          </Menu.Menu>
          <Menu.Menu position="right" fitted="horizontally" style={{ marginRight: 10 }}>
            <Menu.Item as={Link} to="/settings/subscription">
              <Icon name="rss" style={{ fontSize: 25 }} color={'red'} />
            </Menu.Item>
            <Menu.Item>
              <Icon name="search" style={{ fontSize: 25 }} color={'red'} />
            </Menu.Item>
            <Menu.Item>
              <Icon name="bell" style={{ fontSize: 25 }} color={'red'} />
            </Menu.Item>
            <div
              style={{ width: 1, height: '100%', alignSelf: 'center', backgroundColor: '#a4a4a4' }}
            />
            <Menu.Item>
              {this.userPicture ? (
                <Image src={this.userPicture} avatar />
              ) : (
                <Icon name="user circle" style={{ fontSize: 25 }} color={'red'} />
              )}
              <div style={{ textAlign: 'center', fontSize: 16 }}>
                Hello
                <span style={{ display: 'block', width: '100%' }}>{this.userName}</span>
              </div>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <div id="navbar-spacer" style={{ height: 45 }} />
      </React.Fragment>
    );
  }
}
