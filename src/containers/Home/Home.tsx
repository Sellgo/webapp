import * as React from 'react';
import { Button, Container, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { HeaderBar } from '../../components/Header';
import history from '../../history';
import './Home.css';

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
      history.replace('/dashboard');
    }
  }

  public render() {
    const { heading, amount, cityName } = this.state;
    const { isAuthenticated, login } = this.props.auth;
    return (
      <Segment basic={true}>
        <HeaderBar login={login} />
        <Container>
          <Segment padded="very">
            <Grid className="home_desc">
              <Grid.Row>
                <Grid.Column verticalAlign="middle">
                  <Header as="h3" color="grey">
                    {`$${amount}/mo ${heading}`}
                    <br />
                    {`from ${cityName}`}
                  </Header>
                  <Button primary={true} content="Get started for FREE" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Divider />
          <Header as="h4" className="home_footer">
            <Icon name="dollar" />
            <Header.Content>
              Make $ {amount} on Amazon guaranteed
              <Header sub={true}>
                Learn More
                <i>
                  <Icon onClick={login} name="arrow circle right" />
                </i>
              </Header>
            </Header.Content>
          </Header>
        </Container>
      </Segment>
    );
  }
}
