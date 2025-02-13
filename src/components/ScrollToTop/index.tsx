import React from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component<any> {
  componentDidUpdate(prevProps: any) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
      const container = document.querySelector('.Sidebar__pusher');
      if (container) {
        container.scrollTo(0, 0);
      }
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);
