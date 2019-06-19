import * as React from "react";
import {Button, Grid, Header, Icon, Segment} from "semantic-ui-react";
import {Logo} from "../AdminLayout/AdminHeader";
import "./AuthSidebar.css";


export class AuthSidebar extends React.Component {

  getFacebookSignup = () => {
  };
  getTwitterSignup = () => {
  };
  getGoogleSignup = () => {
  };

  render() {
    return <Grid className="signup_box" verticalAlign="middle">
      <Grid.Row columns={1}>
        <Grid.Column>
          <Logo centered size="small"/>
          <Header size='small' textAlign='center'>Login using social media <br/> to get quick access</Header>
          <Segment className="social_signin" basic clearing>
            <Button fluid color='facebook' onClick={this.getFacebookSignup}>
              <Icon name='facebook'/> Login with facebook
            </Button>
            <Button fluid color='twitter' onClick={this.getTwitterSignup}>
              <Icon name='twitter'/> Login with twitter
            </Button>
            <Button fluid color='google plus' onClick={this.getGoogleSignup}>
              <Icon name='google plus'/>Login with google
            </Button>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>;
  }
}
