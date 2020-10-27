import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import BreadCrumb from '../BreadCrumb';
import AdminHeader from '../AdminLayout/AdminHeader';
import Auth from '../Auth/Auth';
import './index.scss';

interface Props {
  title?: string;
  callToAction?: any;
  breadcrumb?: any;
  auth?: Auth;
}

class PageHeader extends React.Component<Props> {
  render() {
    const { title, callToAction, breadcrumb, auth } = this.props;

    return (
      <>
        <Helmet>
          <title>Sellgo - {title}</title>
        </Helmet>

        <div className="page-header">
          {breadcrumb && breadcrumb.length && <BreadCrumb sections={breadcrumb} />}
          <div className="page-header__left">
            <Header as="h2">
              <Header.Content>{callToAction}</Header.Content>
            </Header>
            <AdminHeader auth={auth} />
          </div>
        </div>
      </>
    );
  }
}

export default PageHeader;
