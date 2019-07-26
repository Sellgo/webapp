import * as React from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
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
    this.setState({isSideBarExpanded: this.props.isSideBarExpanded});
  }

  componentWillReceiveProps(nextProps: any): void {
      if (nextProps.isSideBarExpanded) {
        setTimeout(() => {
          this.setState({isSideBarExpanded: nextProps.isSideBarExpanded});
        }, 400);
      } else {
        this.setState({isSideBarExpanded: nextProps.isSideBarExpanded});
      }
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
        className={this.props.isSideBarExpanded ? 'AdjustedSideBarWidth' : ''}
        borderless={true}
        inverted={true}
        vertical={true}
        visible={true}
      >
        <Menu.Item style={{marginTop: 50}} as={Link} to="/">
          <Menu.Header>
            <div>
              <Icon name="home" style={{fontSize: 25}}/>
              {this.state.isSideBarExpanded != null && this.state.isSideBarExpanded ? '  Home' : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as={Link} to="/syn">
          <Menu.Header>
            <div>
              <Icon name="dot circle outline" style={{fontSize: 25}}/>
              {this.state.isSideBarExpanded != null && this.state.isSideBarExpanded ? '  SYN' : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as={Link} to="/dashboard/setting">
          <Menu.Header style={{alignItems: 'center'}}>
            <div>
              <Icon name="setting" style={{fontSize: 25}}/>
              {this.state.isSideBarExpanded != null && this.state.isSideBarExpanded ? '  Settings' : ''}
            </div>
          </Menu.Header>
        </Menu.Item>
        <div style={{position: 'absolute', bottom: 30, width: '100%'}}>
          <Menu.Item style={{textAlign: 'bottom'}} as="a" onClick={logout}>
            <Menu.Header>
              <div>
                <Icon name="log out" style={{fontSize: 25}}/>
                {this.state.isSideBarExpanded != null && this.state.isSideBarExpanded ? '  Logout' : ''}
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
        </div>
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
