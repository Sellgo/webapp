import React from 'react';
import { Grid, Image, Divider } from 'semantic-ui-react';
import MessageDisplay from '../MessageDisplay/MessageDisplay';

const ResetPasswordBase = (props: any) => (
  <Grid className="reset-password-content" columns={2}>
    <MessageDisplay messageDetails={props.messageDetails} />
    <Grid.Row>
      <Grid.Column>
        <Image src="/images/sellgo_white_logo.png" wrapped={true} />
      </Grid.Column>
      <Grid.Column> {props.children} </Grid.Column>
    </Grid.Row>
    <Divider vertical={true} />
  </Grid>
);

export default ResetPasswordBase;
