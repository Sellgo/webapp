import React from 'react';
import { 
  Grid, 
  Image 
} from "semantic-ui-react";

const LoginBase = (props: any) => (
    <Grid className="login-cont" columns={2} divided>
        <Grid.Row>
        <Grid.Column>
            <Image src='/images/sellgo_white_logo.png' wrapped />
        </Grid.Column>
        <Grid.Column>
            { props.children }
        </Grid.Column>
        </Grid.Row>
    </Grid>
) 

export default LoginBase;
