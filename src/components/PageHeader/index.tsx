import * as React from 'react';
import { Header } from 'semantic-ui-react';
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
          <Header as="h2">
            <Header.Content>{callToAction}</Header.Content>
          </Header>
        </div>
      </>
    );
  }
}

export default PageHeader;
