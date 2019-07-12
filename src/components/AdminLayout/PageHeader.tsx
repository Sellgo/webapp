import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import './AdminSidebar.css';
import history from '../../history';

interface Props {
  title?: string;
}

export class PageHeader extends React.Component<Props> {
  public state = {
    canGoForwardTimes: 0,
  };

  render() {
    const headerStyle = {
      marginTop: '1.5rem',
    };
    return (
      <Header className="page-header" as="h1" style={{ ...headerStyle }}>
        <Icon name="caret left" size="small" onClick={() => {
          // history.push(`/syn/`);
          history.goBack();
          this.setState({ canGoForwardTimes: ++this.state.canGoForwardTimes });
        }}/>
        <Icon name="caret right" size="small" color={this.state.canGoForwardTimes > 0 ? 'black' : 'grey'}
              onClick={() => {
                // history.push(`/syn/`);

                this.setState({ canGoForwardTimes: (this.state.canGoForwardTimes > 0) ? --this.state.canGoForwardTimes : 0 });
                history.goForward();
              }}/>
        <Header.Content>{this.props.title}</Header.Content>
      </Header>
    );
  }
}
