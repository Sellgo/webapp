import * as React from "react";
import {Form, Segment, Button, Grid, Header, GridRow} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {AuthSidebar} from "../../components/AuthSidebar";
import { Logo } from "../Dashboard";

export class SignUp extends React.Component {
  render() {
    return (
      <Grid verticalAlign='middle' style={{minHeight: "calc(100vh)"}}>
        <Grid.Row>
        <Grid.Column className="right-pane" width={16}>
          <div  className="logo-img">
              <Logo  centered size="small"/>
          </div>
            <Segment basic clearing>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <div className="heading">
                        <h1 >Sign up to Sellgo for your FREE trial!</h1>   
                        <h5 className="title-description">Please enter your email address to make password reset request</h5>
                    </div>    
                    <Form>
                      <Form.Field>
                        <div  className="small-light login-fields" >
                        <input width="600px" type="email" placeholder="Email Address" className="login-field1"/>
                        </div>
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                  
                  <Grid.Column width={16}>
                        <Grid.Row width={16}>
                          <Grid.Column className="small-regular textAlignCenter padding20">
                            <Link to="/login" style={{fontSize: "smaller",color:"gray"}}>Already have an account?</Link> 
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
                              className="primary-button" to='/dashboard'content="Create your FREE account"/> 
                          </div>
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
    );
  }
}
