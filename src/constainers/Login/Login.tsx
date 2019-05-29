import * as React from "react";
import {Form, Segment, Button, Grid, Header, Checkbox} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {AuthSidebar} from "../../components/AuthSidebar";

export class Login extends React.Component {
    render() {
        return (
            <Grid verticalAlign='middle' style={{ minHeight: "calc(100vh)" }}>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <AuthSidebar/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Segment basic clearing style={{maxWidth: "400px", margin: "0 auto"}}>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Header as='h2' textAlign='center'>
                                            Login to your account
                                            <Header.Subheader>Don't have an account? <Link to="/sign-in"
                                                                                           style={{fontSize: "smaller"}}>Sign
                                                Up free!</Link>
                                            </Header.Subheader>
                                        </Header>
                                        <Form>
                                            <Form.Field>
                                                <label>Email</label>
                                                <input type="email" placeholder="Email"/>
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Password</label>
                                                <input type="password" placeholder="Password"/>
                                            </Form.Field>
                                        </Form>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Segment basic>
                                            <Checkbox label={<label>Remember me</label>}/>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={8} floated='right'>
                                        <Segment basic textAlign='center'>
                                            <Link to="/forgot-password" style={{fontSize: "smaller"}}>Forgot your
                                                password?</Link>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Button fluid primary content="Login with Email"/>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}