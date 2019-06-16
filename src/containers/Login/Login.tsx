import * as React from "react";
import {Form, Segment, Button, Grid, GridRow} from "semantic-ui-react";
import {Link} from "react-router-dom";
import "./login.css";
import {Logo} from "../../components/AdminLayout/AdminHeader";
import IntroSlider from "../../components/IntroSlider";
import PasswordShowHide from "../../components/Password/PasswordShowHide";
import buttonStyle from "../../components/StyleComponent/StyleComponent";
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
                  </Grid.Column>
                  <Grid.Column width={16}>
                        <Grid.Row width={16}>
                          <Grid.Column className="small-regular textAlignCenter padding20">
                            <Link to="/forgot-password" style={{fontSize: "smaller",color:"gray"}}>Forgot your password?</Link>   
                          </Grid.Column>
                        </Grid.Row>
                        <GridRow>
                          <div className="textAlignCenter">                    
                            <Button as={Link} style={buttonStyle}
                              className="primary-button" to='/dashboard'content="Sign In"/>                 
                          </div>
                        </GridRow>
                        <GridRow className="p-t-40">
                        <div className="textAlignCenter padding20">                     
                           <Link to="/sign-up" className="small-bold">Create My Sellgo Account!</Link>
                        </div>
                      </GridRow>
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

