import * as React from 'react';
import { Header, Icon, Divider } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import history from '../../history';
import { connect } from 'react-redux';
import { SET_PAGE_HISTORY_COUNTER } from '../../constants/Settings';
import BreadCrumb from '../BreadCrumb';
import './index.scss';

interface Props {
  title?: string;
  callToAction?: any;
  pageHistoryCanGoForward: any;
  updatePageHistoryCounter(counter: any): () => void;
  breadcrumb?: any;
}

class PageHeader extends React.Component<Props> {
  render() {
    const {
      title,
      callToAction,
      pageHistoryCanGoForward,
      updatePageHistoryCounter,
      breadcrumb,
    } = this.props;

    return (
      <>
        <Helmet>
          <title>Sellgo - {title}</title>
        </Helmet>

        <div className="pageHeader">
          {breadcrumb && breadcrumb.length && <BreadCrumb sections={breadcrumb} />}

          <Header className="page-header" as="h2">
            <Icon
              name="arrow alternate circle left"
              size="small"
              onClick={() => {
                updatePageHistoryCounter(pageHistoryCanGoForward + 1);
                history.goBack();
              }}
            />
            <Icon
              name="arrow alternate circle right"
              size="small"
              color={pageHistoryCanGoForward > 0 ? 'black' : 'grey'}
              onClick={() => {
                if (pageHistoryCanGoForward > 0) {
                  updatePageHistoryCounter(pageHistoryCanGoForward - 1);
                  history.goForward();
                }
              }}
            />
            <Header.Content>{title}</Header.Content>
            <Header.Content style={{ marginLeft: 'auto' }}>{callToAction}</Header.Content>
          </Header>
        </div>

        <Divider />
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    pageHistoryCanGoForward: state.settings.pageHistoryCanGoForward,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updatePageHistoryCounter: (counter: any) => dispatch(updatePageHistoryCounterFunction(counter)),
  };
};

const updatePageHistoryCounterFunction = (counter: any) => (dispatch: any) => {
  dispatch({
    type: SET_PAGE_HISTORY_COUNTER,
    data: counter,
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeader);
