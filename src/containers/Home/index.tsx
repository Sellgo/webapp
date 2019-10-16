import * as React from 'react';
import { Container, Image, Segment } from 'semantic-ui-react';
import history from '../../history';
import './Home.css';
import GenericButton from '../../components/Button';

interface HomeState {
  heading: string;
  amount: number;
  cityName: string;
}

export default class Home extends React.Component<any, HomeState> {
  state = {
    heading: 'by become an Amazon Seller',
    amount: 1000,
    cityName: 'USA',
  };

  goTo(route: any) {
    this.props.history.replace(`/${route}`);
  }

  componentDidMount() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      history.replace('/synthesis');
    }
  }

  public render() {
    const { login } = this.props.auth;
    return (
      <Segment basic={true}>
        <Container style={{ height: 500, textAlign: 'center', paddingTop: '15%' }}>
          <Image style={{ width: 150 }} centered={true} src="/images/sellgo_logo_black.png" />
          <div style={{ marginBottom: 10, marginTop: 50 }}>
            <h3>{'Please Sign In'}</h3>
          </div>
          <div>
            <GenericButton isClickable={true} onClick={login} content={'Sign In'} />
          </div>
        </Container>
      </Segment>
    );
  }
}
