import React from 'react';
import { 
  Grid, 
  Image,
  Divider
} from "semantic-ui-react";
import MessageDisplay from './MessageDisplay/MessageDisplay';
import './index.scss';

const LoginBase = (props: any) => (
    <Grid className="login-cont" columns={2} >
        <MessageDisplay />
        <Grid.Row>
            <Grid.Column>
                <Image src='/images/sellgo_white_logo.png' wrapped />
            </Grid.Column>
            <Grid.Column>
                { props.children }
            </Grid.Column>
        </Grid.Row>
        <Divider vertical />
    </Grid>
) 

export default LoginBase;
