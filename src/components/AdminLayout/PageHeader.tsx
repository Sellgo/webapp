import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import './AdminSidebar.css';
import history from '../../history';
import { connect } from 'react-redux';
import { SET_PAGE_HISTORY_COUNTER, UPDATE_BASIC_INFO_SELLER } from '../../constant/constant';

interface Props {
  title?: string;
  callToAction?: any;
  pageHistoryCanGoForward: any;

  updatePageHistoryCounter(counter: any): () => void;
}

class PageHeader extends React.Component<Props> {
  render() {
    const headerStyle = {
      marginTop: '1.5rem',
      display: 'flex',
    };
    return (
      <Header className="page-header" as="h2" style={{ ...headerStyle }}>
        <Icon
          name="arrow alternate circle left"
          size="small"
          onClick={() => {
            this.props.updatePageHistoryCounter(this.props.pageHistoryCanGoForward + 1);
            history.goBack();
          }}
        />
        <Icon
          name="arrow alternate circle right"
          size="small"
          color={this.props.pageHistoryCanGoForward > 0 ? 'black' : 'grey'}
          onClick={() => {
            if (this.props.pageHistoryCanGoForward > 0) {
              this.props.updatePageHistoryCounter(this.props.pageHistoryCanGoForward - 1);
              history.goForward();
            }
          }}
        />
        <Header.Content>{this.props.title}</Header.Content>
        <Header.Content style={{ marginLeft: 'auto' }}>{this.props.callToAction}</Header.Content>
      </Header>
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
