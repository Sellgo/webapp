import * as React from "react";
import {Icon, Header} from "semantic-ui-react";

import "./AdminSidebar.css";

interface Props {
    title?: string;
}

export class PageHeader extends React.Component<Props> {

  render() {
      const headerStyle = {
            marginTop: '1.5rem',
      }
    return (
        <Header as='h1' style={{...headerStyle}}>
            <Icon name='caret left' size='small' />
            <Icon name='caret right' size='small' color='grey' />
            <Header.Content>{this.props.title}</Header.Content>
        </Header>
    )

  }
}
