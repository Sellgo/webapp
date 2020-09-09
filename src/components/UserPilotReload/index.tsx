import React from 'react';
import { withRouter } from 'react-router-dom';

class UserPilotReload extends React.Component<any> {
  componentDidUpdate(prevProps: any) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      (window as any).userpilot.reload();
    }
  }
  render() {
    return null;
  }
}

export default withRouter(UserPilotReload);
