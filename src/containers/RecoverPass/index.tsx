import * as React from "react";
import {Form, Segment, Button, Grid, Header, GridRow} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {AuthSidebar} from "../../components/AuthSidebar";
import "./recoverPass.css";
import IntroSlider from "../../components/IntroSlider";
import { Logo } from "../../components/AdminLayout/AdminHeader";
import PasswordShowHide from "../../components/Password/PasswordShowHide";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import MesssageComponent from "../../components/MessageComponent";
type State={isSuccess:boolean,};
export class RecoverPass extends React.Component {
  state = {
    isSuccess: false,
  };
  toggleShow=()=> {
    this.setState({isSuccess: !this.state.isSuccess });
    //this.state.isSuccess=!this.state.isSuccess;
  }
  message={ id:1,title:"Reset Password",message:"Password Reset Successful!", description:"You have successfully reset the password for your Sellgo account.", description2:"Please check your email to continue.", to:"/login", button_text:"Ok"};
  //message={ id:1,title:"Reset Password",message:"Password Reset Successful!",description:"You have successfully reset the password for your Sellgo account. Please check your email to continue.", to:"/dashboard", button_text:"Ok"};
  response=(<MesssageComponent message={this.message}/>);
  forgetPassForm=( <Segment basic clearing>
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <div className="heading">
              <h1 >Reset Password</h1>   
              <h5 className="title-description">Please enter your email address to make password reset request</h5>
          </div>    
          <Form>
            <Form.Field>
              <div  className="small-light login-fields" >
              <input type="email" placeholder="Email Address" className="login-field1"/>
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
                <Button style={{
                  fontFamily: "Montserrat", 
                  fontWeight:"bold" , 
                  fontDisplay: "optional", 
                  fontSize: "20px", 
                  color: "white",
                  border:"none",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  paddingLeft:  "40px",
                  paddingRight: "40px",
                  borderRadius: "50px",
                  background: "#4285F4"}} 
                  onClick={this.toggleShow} 
                  className="primary-button" content="Reset Password"/> 
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
  </Segment>);
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
            {this.state.isSuccess?this.response:this.forgetPassForm}
           
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
