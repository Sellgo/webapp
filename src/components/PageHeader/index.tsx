import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import './index.css';
import history from '../../history';
import { connect } from 'react-redux';
import { SET_PAGE_HISTORY_COUNTER } from '../../constants/Settings';

interface Props {
  title?: string;
  callToAction?: any;
  pageHistoryCanGoForward: any;
  updatePageHistoryCounter(counter: any): () => void;
}

class PageHeader extends React.Component<Props> {
  render() {
    const { title, callToAction, pageHistoryCanGoForward, updatePageHistoryCounter } = this.props;

    const headerStyle = {
      marginTop: '1.5rem',
      display: 'flex',
    };
    return (
      <>
        <Helmet>
          <title>Sellgo - {title}</title>
        </Helmet>
        <Header className="page-header" as="h2" style={{ ...headerStyle }}>
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
