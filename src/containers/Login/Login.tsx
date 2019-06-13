import * as React from "react";
import {Form, Segment, Button, Grid, Header, Checkbox, GridRow, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {AuthSidebar} from "../../components/AuthSidebar";
import "./login.css";
import { Logo } from "../../components/AdminLayout/AdminHeader";
import  IntroSlider  from "../../components/IntroSlider";
import PasswordShowHide from "../../components/Password/PasswordShowHide";
import { withRouter } from 'react-router-dom'
export class Login extends React.Component {
  render() {
    return (
      <Grid verticalAlign='middle' style={{minHeight: "100vh"}}>
        <Grid.Row>
          <Grid.Column width={10}>
            <IntroSlider/>
          </Grid.Column>
          <Grid.Column className="right-pane" width={6}>
          <div  className="logo-img">
            <Logo centered size="small"/>
        </div>
            <Segment basic clearing >
              <Grid>
                <Grid.Row>
                  
                  <Grid.Column width={16}>    
                    <Form>
                      <Form.Field>
                        <div  className="small-light login-fields" >
                        <input type="email" placeholder="Email Address" className="login-field1"/>
                        
                        <PasswordShowHide />
                        {/* <input type="password" placeholder="Password" className="login-field2"/> */}
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
                            <Button as={Link} style={{
                              fontFamily: "Montserrat", 
                              fontWeight:"bold" , 
                              fontDisplay: "optional", 
                              fontSize: "20px", 
                              color: "white",
                              border:"none",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              paddingLeft:  "40px",
                              paddingRight: "40px",
                              minWidth: "190px",
                              borderRadius: "50px",
                              background: "#4285F4"}} 
                              className="primary-button" to='/dashboard'content="Sign In"/> 
                            {/* <Button as={Link}  className="primary-button-imp" to='/dashboard'content="Sign In"/>                            */}
                          </div>
                          
                          
                          {/* <Button as={Link} to='/dashboard' className="primary-button"  content="Sign In"/> */}
                        </GridRow>
                        <GridRow>
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

