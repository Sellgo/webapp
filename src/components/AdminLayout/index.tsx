import * as React from 'react';
import { Segment, Sidebar } from 'semantic-ui-react';
import { AdminHeader } from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import PageHeader from './PageHeader';
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
    this.setState({
      width: nextProps.isSideBarExpanded ? 95 : 100,
    });
  }

  public render() {
    const {children, title, auth, sellerData} = this.props;

    return (
      <React.Fragment>
        <AdminHeader sellerData={sellerData}/>
        <AdminSidebar logout={auth.logout}/>

        <Segment basic={true} style={{
          paddingLeft: (this.props.isSideBarExpanded) ? 190 : 100,
          paddingRight: (this.props.isSideBarExpanded) ? 20 : 20,
          transition: 'width 0.8s,padding 0.8s',
        }}>
          <PageHeader title={title}/>
          {children}
        </Segment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isSideBarExpanded: state.settings.isSideBarExpanded,
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminLayout);
