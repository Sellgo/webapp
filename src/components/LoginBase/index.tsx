import React from 'react';
import { Grid, Image, Divider } from 'semantic-ui-react';
import MessageDisplay from '../MessageDisplay/MessageDisplay';

class LoginbBase extends React.Component<any> {
  render() {
    const { messageDetails, children } = this.props;

    return (
      <Grid className="login-cont" columns={2}>
        <MessageDisplay messageDetails={messageDetails} />
        <Grid.Row>
          <Grid.Column>
            <Image src="/images/sellgo_white_logo.png" wrapped={true} />
          </Grid.Column>
          <Grid.Column> {children} </Grid.Column>
        </Grid.Row>
        <Divider vertical={true} />
      </Grid>
    );
  }
}

export default LoginbBase;
