import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import './AdminSidebar.css';
import history from '../../history';

interface Props {
  title?: string;
}

export class PageHeader extends React.Component<Props> {
  render() {
    const headerStyle = {
      marginTop: '1.5rem',
    };
    return (
      <Header className="page-header" as="h1" style={{ ...headerStyle }}>
        <Icon name="caret left" size="small" onClick={() => {
          // history.push(`/syn/`);
          history.goBack();
        }}/>
        <Icon name="caret right" size="small" color="grey"/>
        <Header.Content>{this.props.title}</Header.Content>
      </Header>
    );
  }
}
