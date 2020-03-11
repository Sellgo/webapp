import React from 'react';
import { Button, Header, Card, Grid, Image } from 'semantic-ui-react';
// import './index.scss';
import Setcard from '../../assets/images/4_Card_color_horizontal.svg';
import Stripe from '../../assets/images/powered_by_stripe.svg';

interface Card {
  id: number;
  active: boolean;
  header: string;
  plan: string;
  meta: string;
  offer: string;
  description: string;
  footer: string;
}

export default class Pricing extends React.Component {
  state = {
    cards: [
      {
        id: 1,
        active: false,
        header: '',
        plan: 'Basic Plan',
        meta: 'Unlimited Profit Finder 50 Product Tracker Limit',
        offer: '69',
        description: 'Billed Monthly',
        footer: 'Get Started',
      },
      {
        id: 2,
        active: false,
        header: 'Best Value',
        plan: 'Pro Plan',
        meta: 'Unlimited Profit Finder 100 Product Tracker Limit',
        offer: '99',
        description: 'Billed Monthly',
        footer: 'Get Started',
      },
      {
        id: 3,
        active: false,
        header: '',
        plan: 'Enterprise',
        meta: 'Unlimited Profit Finder More than 100 Product Tracker Limit',
        offer: 'Contact Us',
        description: 'Billed Monthly',
        footer: 'support@sellgo.com',
      },
    ],
  };

  planClick = (id: number) => {
    const getBasic = [...this.state.cards];
    getBasic.map((val: Card, index) => {
      if (index !== id && index !== 2) {
        getBasic[index].active = false;
        getBasic[index].footer = 'Change Plan';
      } else if (index !== 2) {
        if (getBasic[id].active) {
          getBasic[index].footer = 'Change Plan';
        } else {
          getBasic[index].footer = 'Cancel';
        }
        getBasic[index].active = !getBasic[id].active;
      }

      return getBasic;
    });

    this.setState({ ...getBasic });
    console.log(this.state);
  };

  render() {
    // console.log(this.state);
    const cardsDisplay = this.state.cards.map((stat: Card) => {
      return (
        <Card key={stat.id} className={stat.active ? 'active-plan' : ''}>
          <Card.Content>
            <Card.Header>
              <Button className={stat.id === 2 && !stat.active ? 'best-value' : ''} fluid>
                {stat.header}
              </Button>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Card.Header className={stat.id === 2 ? 'pro-plan' : ''}>{stat.plan}</Card.Header>
            <Card.Meta>{stat.meta}</Card.Meta>
          </Card.Content>
          <Card.Content className={stat.id === 3 ? 'contact-us' : ''}>
            <Card.Header>
              <strong>$&nbsp;</strong>
              {stat.offer}
              <strong>&nbsp;/mo</strong>
            </Card.Header>
            <Card.Description>{stat.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              onClick={() => this.planClick(stat.id - 1)}
              className={`basic-btn ${stat.active ? 'active-plan' : ''}`}
              fluid
            >
              {stat.footer}
            </Button>
            <p className={stat.id === 3 ? 'contact-us' : ''}>
              Contact Customer Service
              <a href="#">{stat.footer}</a>
            </p>
          </Card.Content>
        </Card>
      );
    });

    return (
      <Grid className="pricing-container">
        <Grid.Row>
          <Header as="h1">Sellgo Pricing</Header>
          For new members register with Amazon Seller Central Account <br />
          Risk free 14-day money back guarantee
        </Grid.Row>
        <Grid.Row>{cardsDisplay}</Grid.Row>
        <Grid.Row>
          <a href="#">
            <Image src={Setcard} />
          </a>
          <a href="#">
            <Image src={Stripe} />
          </a>
        </Grid.Row>
        <Grid.Row>We offer 14-day money back guarantee.</Grid.Row>
      </Grid>
    );
  }
}
