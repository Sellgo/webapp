import * as React from 'react';
import { Icon, Menu, Sidebar, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';
import { Field, SellField, sideBarExpanded } from '../../Action/SettingActions';
import { connect } from 'react-redux';

interface State {
  isSideBarExpanded: boolean;
}

interface Props {
  sideBarExpanded(data: Field): () => void;

  logout(): void;

  isSideBarExpanded: boolean;
  title?: string;
}

class AdminSidebar extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      isSideBarExpanded: false,
      // populate state fields according to props fields
    };
  }

  componentDidMount(): void {
    this.setState({ isSideBarExpanded: this.props.isSideBarExpanded });
  }

  componentWillReceiveProps(nextProps: any): void {
    if (nextProps.isSideBarExpanded) {
      setTimeout(() => {
        this.setState({ isSideBarExpanded: nextProps.isSideBarExpanded });
      }, 400);
    } else {
      this.setState({ isSideBarExpanded: nextProps.isSideBarExpanded });
    }
  }

  componentWillMount() {}

  render() {
    const logout = this.props.logout;
    return (
      <Sidebar
        as={Menu}
        direction={'left'}
        animation={undefined}
        width={this.props.isSideBarExpanded ? 'thin' : 'very thin'}
        className={this.props.isSideBarExpanded ? 'AdjustedSideBarWidth' : ''}
        borderless={true}
        inverted={true}
        vertical={true}
        visible={true}
      >
        <Menu.Item as={Link} to="/">
          <Menu.Header>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon name="home" style={{ fontSize: 25 }} />
              {this.state.isSideBarExpanded != null && this.state.isSideBarExpanded ? '  Home' : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as={Link} to="/syn">
          <Menu.Header>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon name="dot circle outline" style={{ fontSize: 25 }} />
              {this.state.isSideBarExpanded != null && this.state.isSideBarExpanded
                ? '  Synthesis'
                : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as={Link} to="/supplier">
          <Menu.Header>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon name="warehouse" style={{ fontSize: 25 }} />
              {this.state.isSideBarExpanded != null && this.state.isSideBarExpanded
                ? '  Supplier'
                : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <div style={{ position: 'absolute', bottom: 80, width: '100%' }}>
          <div
            onClick={() => {
              const data = {
                key: 'isSideBarExpanded',
                value: !this.props.isSideBarExpanded,
              };
              this.props.sideBarExpanded(data);
            }}
            style={{ position: 'absolute', right: -16, top: -25, zIndex: 999 }}
          >
            <Image
              style={{ width: 30 }}
              src={
                this.props.isSideBarExpanded
                  ? '/images/chevron_left_circle.png'
                  : '/images/chevron_right_circle.png'
              }
            />
          </div>
          <Menu.Item as={Link} to="/dashboard/setting">
            <Menu.Header style={{ alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon name="setting" style={{ fontSize: 25 }} />
                {this.state.isSideBarExpanded != null && this.state.isSideBarExpanded
                  ? '  Settings'
                  : ''}
              </div>
            </Menu.Header>
          </Menu.Item>
          <Menu.Item style={{ textAlign: 'bottom' }} as="a" onClick={logout}>
            <Menu.Header>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon name="log out" style={{ fontSize: 25 }} />
                {this.state.isSideBarExpanded != null && this.state.isSideBarExpanded
                  ? '  Logout'
                  : ''}
              </div>
            </Menu.Header>
          </Menu.Item>
        </div>
      </Sidebar>
    );
  }
}
{
  /*<div onClick={() => {*/
}
{
  /*  const data = {*/
}
{
  /*    key: 'isSideBarExpanded',*/
}
{
  /*    value: !this.props.isSideBarExpanded,*/
}
{
  /*  };*/
}
{
  /*  this.props.sideBarExpanded(data);*/
}
{
  /*}}*/
}
{
  /*  //position: absolute;right: 6px;box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 1px 0px;border-radius: 100px;background-color: white;/* padding: 0px; */
  /* margin: 0px; height: 20px;width: 20px;line-height: 0.9;}
{/*     style={{*/
}
{
  /*       position: 'absolute',*/
}
{
  /*       right: -18,*/
}
{
  /*       boxShadow: '10px -10px rgba(0,0,0,0.6)',*/
}
{
  /*       borderRadius: 100,*/
}
{
  /*       backgroundColor: 'white',*/
}
{
  /*       padding: 0,*/
}
{
  /*       margin: 0,*/
}
{
  /*     }}>*/
}
{
  /*  <Icon*/
}
{
  /*    //style="font-size: 28px;right: 2px;position: relative;/* box-shadow: 0 0px 0px 0 #ccc; */
  /* -webkit-text-fill-color: #fff; }
{/*    name={this.props.isSideBarExpanded ? 'chevron circle left' : 'chevron circle right'}*/
}
{
  /*    color={'blue'}*/
}
{
  /*    style={{fontSize: 25}}*/
}
{
  /*  />*/
}
{
  /*</div>*/
}
const mapStateToProps = (state: any) => ({
  isSideBarExpanded: state.settings.isSideBarExpanded,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    sideBarExpanded: (data: Field) => dispatch(sideBarExpanded(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminSidebar);
