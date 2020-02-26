import React from 'react';
import { Grid, Image, Divider } from 'semantic-ui-react';
import MessageDisplay from './MessageDisplay/MessageDisplay';
import './index.scss';

const SignupBase = (props: any) => (
  <Grid className="signup-cont" columns={2}>
    <MessageDisplay propsMessage={props.messageData} />
    <Grid.Row>
      <Grid.Column>
        <Image src="/images/sellgo_white_logo.png" wrapped={true} />
      </Grid.Column>
      <Grid.Column>{props.children}</Grid.Column>
    </Grid.Row>
    <Divider vertical={true} />
  </Grid>
);

export default SignupBase;
