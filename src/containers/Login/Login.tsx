import * as React from "react";
import {Form, Segment, Button, Grid, GridRow} from "semantic-ui-react";
import {Link} from "react-router-dom";
import "./login.css";
import {Logo} from "../../components/AdminLayout/AdminHeader";
import IntroSlider from "../../components/IntroSlider";
import PasswordShowHide from "../../components/Password/PasswordShowHide";

export class Login extends React.Component {
  render() {
    return (
      <Grid verticalAlign='middle' style={{minHeight: "100vh"}}>
        <Grid.Row>
          <Grid.Column className="left-pane" width={10}>
            <IntroSlider/>
          </Grid.Column>
          <Grid.Column className="right-pane" width={6}>
            <div className="logo-img">
              <Logo centered size="small"/>
            </div>
            <Segment basic clearing>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Form>
                      <Form.Field>
                        <div className="small-light login-fields">
                          <input type="email" placeholder="Email Address" className="login-field1"/>
                          <div className="hr_line"></div>
                          <PasswordShowHide/>
                        </div>
                      </Form.Field>
                    </Form>
                    <Grid.Column width={16}>
                      <Grid.Column className="small-regular textAlignCenter padding20">
                        <Link to="/forgot-password" style={{fontSize: "smaller", color: "gray"}}>Forgot your
                          password?</Link>
                      </Grid.Column>
                      <div className="textAlignCenter">
                        <Button
                          as={Link}
                          style={{
                            fontFamily: "Montserrat",
                            fontWeight: "bold",
                            fontDisplay: "optional",
                            fontSize: "20px",
                            color: "white",
                            border: "none",
                            padding: "12px 40px",
                            borderRadius: "50px",
                            background: "#4285F4"
                          }}
                          className="primary-button"
                          to='/dashboard' content="Sign In"/>
                      </div>
                      <GridRow>
                        <div className="textAlignCenter padding40">
                          <Link to="/sign-up" className="small-bold">Create My Sellgo Account!</Link>
                        </div>
                      </GridRow>
                    </Grid.Column>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

