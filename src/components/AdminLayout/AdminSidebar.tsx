import * as React from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';
import { Field, SellField, sideBarExpanded } from '../../Action/SettingActions';
import { connect } from 'react-redux';

interface Props {
  sideBarExpanded(data: Field): () => void;

  logout(): void;

  isSideBarExpanded: boolean;
  title?: string;
}

class AdminSidebar extends React.Component<any, Props> {

  componentWillReceiveProps(nextProps: any): void {
  }

  componentWillMount() {
  }

  render() {
    const logout = this.props.logout;
    console.log(this.props.isSideBarExpanded);
    return (
      <Sidebar
        as={Menu}
        direction={'left'}
        animation={undefined}
        width={this.props.isSideBarExpanded ? 'thin' : 'very thin'}
        className={this.props.isSideBarExpanded ? 'AdjustedSideBarWidth' : 'SideBarWidth'}
        borderless={true}
        inverted={true}
        vertical={true}
        visible={true}
      >
        <Menu.Item style={{marginTop: 50}} as={Link} to="/">
          <Menu.Header>
            <div>
              <Icon name="home" style={{fontSize: 25}}/>
              {this.props.isSideBarExpanded ? '  Home' : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as={Link} to="/dashboard/setting">
          <Menu.Header style={{alignItems: 'center'}}>
            <div>
              <Icon name="setting" style={{fontSize: 25}}/>
              {this.props.isSideBarExpanded ? '  Settings' : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as={Link} to="/syn">
          <Menu.Header>
            <div>
              <Icon name="dot circle outline" style={{fontSize: 25}}/>
              {this.props.isSideBarExpanded ? '  SYN' : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as="a" onClick={logout}>
          <Menu.Header>
            <div>
              <Icon name="log out" style={{fontSize: 25}}/>
              {this.props.isSideBarExpanded ? '  Logout' : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item
          as="a"
          onClick={() => {
            const data = {
              key: 'isSideBarExpanded',
              value: !this.props.isSideBarExpanded,
            };
            this.props.sideBarExpanded(data);

          }}
        >
          <Menu.Header>
            <Icon
              name={this.props.isSideBarExpanded ? 'chevron circle left' : 'chevron circle right'}
              style={{fontSize: 25}}
            />
          </Menu.Header>
        </Menu.Item>
      </Sidebar>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isSideBarExpanded: state.settings.get('isSideBarExpanded'),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    sideBarExpanded: (data: Field) => dispatch(sideBarExpanded(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminSidebar);
