import React from 'react';
import { Grid, Image, Divider } from 'semantic-ui-react';

const LoginBase = (props: any) => (
  <Grid className="login-cont" columns={2}>
    <Grid.Row>
      <Grid.Column>
        <Image src="/images/sellgo_white_logo.png" wrapped={true} />
      </Grid.Column>
      <Grid.Column> {props.children} </Grid.Column>
    </Grid.Row>
    <Divider vertical={true} />
  </Grid>
);

export default LoginBase;
