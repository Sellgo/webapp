import * as React from 'react';
import { Progress, Divider, Button } from 'semantic-ui-react';
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
          {breadcrumb && breadcrumb.length > 2 && (
            <div className="header-right-wrap">
              <div className="progress-bar">
                <Progress percent={55} label="80 Tracked out of 100" />
              </div>
              <Button primary>Upgrade Now</Button>
            </div>
          )}
          {/* <Header className="page-header" as="h2">
            <Header.Content>{title}</Header.Content>
            <Header.Content style={{ marginLeft: 'auto' }}>{callToAction}</Header.Content>
          </Header> */}
        </div>
        {breadcrumb && breadcrumb.length <= 2 && <Divider />}
      </>
    );
  }
}

export default PageHeader;
