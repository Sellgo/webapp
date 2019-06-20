import * as React from 'react';
import { Button, Container, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { HeaderBar } from '../../components/Header';
import './Home.css';

interface HomeState {
  heading: string;
  amount: number;
  cityName: string;
}

export class Home extends React.Component<{}, HomeState> {
  state = {
    heading: 'by become an Amazon Seller',
    amount: 1000,
    cityName: 'USA',
  };

  render() {
    const { heading, amount, cityName } = this.state;
    return (
      <Segment basic={true}>
        <HeaderBar />
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
              <Header sub={true} primary={true}>
                Learn More
                <i>
                  <Icon name="arrow circle right" />
                </i>
              </Header>
            </Header.Content>
          </Header>
        </Container>
      </Segment>
    );
  }
}
