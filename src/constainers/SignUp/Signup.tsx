import * as React from "react";
import {Form, Segment, Button, Grid,Header} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {AuthSidebar} from "../../components/AuthSidebar";

export class SignUp extends React.Component {
    render() {
        return (
            <Grid verticalAlign='middle' style={{ minHeight: "calc(100vh)" }}>
                <Grid.Row >
                <Grid.Column width={6}>
                    <AuthSidebar/>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Segment basic clearing style={{maxWidth: "400px", margin: "0 auto"}}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <Header as='h2' textAlign='center'>
                                        Sign up for free!
                                    </Header>
                                    <Form>
                                        <Form.Field>
                                            <label>Email</label>
                                            <input type="email" placeholder="Email"/>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Full Name</label>
                                            <input type="text" placeholder="Full name"/>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Password</label>
                                            <input type="password" placeholder="Password"/>
                                        </Form.Field>
                                    </Form>
                                </Grid.Column>
                                <Grid.Column celled textAlign ="center" width={16}>
                                    <Segment basic  textAlign='center'>
                                    I agree to the <Link to="/#" style={{fontSize: "smaller"}}>privacy
                                        policy</Link>  and <Link to="/#" style={{fontSize: "smaller"}}> trams of service</Link>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Button fluid primary content="Sign up with Email"/>
                        <Segment basic  textAlign='center'>
                           <Link to="/forgot-password" style={{fontSize: "smaller"}}>Already have an account?</Link>
                        </Segment>
                    </Segment>
                </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}