import * as React from 'react';
import { Segment, Sidebar, Sticky } from 'semantic-ui-react';
import { AdminHeader } from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import PageHeader from './PageHeader';
import * as Highcharts from 'highcharts';
import { Field, MWSinfo, SellField, sideBarExpanded } from '../../Action/SettingActions';
import { connect } from 'react-redux';
import Auth from '../Auth/Auth';

interface State {
  width: any;
}

interface Props {

  isSideBarExpanded: false;
  title?: string;
  auth: Auth;
  sellerData?: SellField;

}

class AdminLayout extends React.Component<Props, State> {
  state = {
    isSidebarExpanded: false,
    width: 100,
  };

  componentWillReceiveProps(nextProps: any): void {
    setTimeout(() => {
      this.setState({
        width: nextProps.isSideBarExpanded ? 95 : 100,
      });
    }, 0);
  }



  public render() {
    const {children, title, auth, sellerData} = this.props;

    return (
      <React.Fragment>
        <AdminHeader sellerData={sellerData}/>
        <Sidebar.Pushable style={{minHeight: 'calc(100vh)'}}>
          <AdminSidebar logout={auth.logout} />
          <Sidebar.Pusher style={{width: `calc(${this.state.width}vw - 55px)`, textAlign: 'center',transition: 'width 0.4s'}}>
            <Segment basic={true}>
              <PageHeader title={title}/>
              {children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isSideBarExpanded: state.settings.get('isSideBarExpanded'),
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminLayout);
