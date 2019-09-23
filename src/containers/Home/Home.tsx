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
    const { renewSession, isAuthenticated } = this.props.auth;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      history.replace('/synthesis');
    }
  }

  public render() {
    const { heading, amount, cityName } = this.state;
    const { isAuthenticated, login } = this.props.auth;
    return (
      <Segment basic={true}>
        {/*<HeaderBar login={login}/>*/}
        <Container style={{ height: 500, textAlign: 'center', paddingTop: '15%' }}>
          <Image style={{ width: 150 }} centered={true} src="/images/sellgo_logo_black.png" />
          <div style={{ marginBottom: 10, marginTop: 50 }}>
            <h3>Please Sign In</h3>
          </div>
          <div>
            <Button style={buttonStyle} onClick={login} content="Sign In" />
          </div>
        </Container>
      </Segment>
    );
  }
}
