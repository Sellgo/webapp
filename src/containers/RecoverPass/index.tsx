import * as React from "react";
import {Form, Segment, Button, Grid, Header} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {AuthSidebar} from "../../components/AuthSidebar";
import "./recoverPass.css";

export class RecoverPass extends React.Component {
  render() {
    return (
      <Grid verticalAlign='middle' style={{minHeight: "100vh"}}>
        <Grid.Row>
          <Grid.Column width={6}>
            <AuthSidebar/>
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment basic clearing style={{maxWidth: "400px", margin: "0 auto"}}>
              <Grid>
                <Grid.Row>
                  <Grid.Column className="recover_pass_box" width={16}>
                    <Header as='h2' textAlign='center'>
                      Recover your password
                      <Header.Subheader>
                        Fill in your email below and we will <br/>
                        send you an email with further instructions.
                      </Header.Subheader>
                    </Header>
                    <Form>
                      <Form.Field>
                        <label>Email</label>
                        <input type="email" placeholder="Email"/>
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Button fluid primary content="Recover your password"/>
              <Segment basic textAlign='center'>
                <Link to="/login" style={{fontSize: "smaller"}}>Already have an account?</Link> <br/>
                <Link to="/sign-up" style={{fontSize: "smaller"}}>Don't have an account?</Link>
              </Segment>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
