import * as React from "react";
import {Icon, Button, Header, Grid, Segment} from "semantic-ui-react";
import "./AuthSidebar.css";
import {Logo} from "../Layout/Layout";


interface AuthoProps {
    children?: React.ReactNode
}

export class AuthSidebar extends React.Component<AuthoProps> {
    getFacebookSignup = () => {
    };
    getTwitterSignup = () => {
    };
    getGoogleSignup = () => {
    };

    render() {
        return <Grid className={'sign-up-box'} verticalAlign='middle'>
            <Grid.Row columns={1}>
                <Grid.Column>
                    <Logo centered size="small"/>
                    <Header size='small' textAlign='center'>Login using social media <br/> to get quick access</Header>
                    <Segment className={'social-signin'} basic clearing>
                        <Button fluid color='facebook' onClick={this.getFacebookSignup}>
                            <Icon name='facebook'/> Signin with facebook
                        </Button>
                        <Button fluid color='twitter' onClick={this.getTwitterSignup}>
                            <Icon name='twitter'/> Signin with twitter
                        </Button>
                        <Button fluid color='google plus' onClick={this.getGoogleSignup}>
                            <Icon name='google plus'/>Signin with google
                        </Button>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>;
    }
}