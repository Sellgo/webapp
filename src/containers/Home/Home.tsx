import * as React from 'react';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react';
import { HeaderBar } from '../../components/Header';
import history from '../../history';
import './Home.css';
import buttonStyle from '../../components/StyleComponent/StyleComponent';

interface HomeState {
  heading: string;
  amount: number;
  cityName: string;
}

export class Home extends React.Component<any, HomeState> {
  state = {
    heading: 'by become an Amazon Seller',
    amount: 1000,
    cityName: 'USA',
  };

  goTo(route: any) {
    this.props.history.replace(`/${route}`);
  }

  componentDidMount() {
    const {renewSession, isAuthenticated} = this.props.auth;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      history.replace('/dashboard');
    }
  }

  public render() {
    const {heading, amount, cityName} = this.state;
    const {isAuthenticated, login} = this.props.auth;
    return (
      <Segment basic={true}>
        <HeaderBar login={login}/>
        <Container style={{height: 500, textAlign: 'center', paddingTop: '10%'}}>
          <Image style={{width: 80}} centered={true} src="/images/sellgo_logo.png"/>
          <div style={{marginBottom:5,marginTop:5}}><h3>Please Sign In</h3></div>
          <div><Button style={buttonStyle} onClick={this.props.login} content="Sign In"/></div>
        </Container>
      </Segment>
    );
  }
}
