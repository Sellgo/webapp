import * as React from 'react';
import { Progress, Divider, Button, Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import BreadCrumb from '../BreadCrumb';
import './index.scss';

interface Props {
  title?: string;
  callToAction?: any;
  breadcrumb?: any;
}

class PageHeader extends React.Component<Props> {
  render() {
    const { title, callToAction, breadcrumb } = this.props;

    return (
      <>
        <Helmet>
          <title>Sellgo - {title}</title>
        </Helmet>

        <div className="page-header">
          {breadcrumb && breadcrumb.length && <BreadCrumb sections={breadcrumb} />}
          <Header className="header-right-wrap" as="h2">
            <Header.Content className="progress-bar">{callToAction}</Header.Content>
          </Header>
        </div>
        {breadcrumb && breadcrumb.length <= 2 && <Divider />}
      </>
    );
  }
}

export default PageHeader;
