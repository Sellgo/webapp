import React from 'react';
import './index.scss';
import { Container, Header } from 'semantic-ui-react';
import _ from 'lodash';

export default function Summary() {
  const benefits = [
    {
      text: '-Manage your supplier files in Supplier Management',
    },
    {
      text: '-100 Products can be tracked through Product Tracker',
    },
    {
      text: '-Unlimited access in our Profit Finder',
    },
    {
      text: '-Sellgo support',
    },
  ];
  return (
    <Container text className="summary-container">
      <Header as="h3">Subscription Summary</Header>
      <div className="summary-container__content">
        <p>
          <span className="summary-container__content__plan-title">Pro Plan:</span>
          <span className="summary-container__content__plan-value">$99/mo billed monthly</span>
        </p>
        <p className="summary-container__content__moneyback-guarantee">
          14-Days Money Back Guarantee
        </p>
        <div className="summary-container__content__benefits-content">
          {_.map(benefits, (items, key) => {
            return (
              <span key={key} className="summary-container__content__benefits-content__items">
                {items.text}
              </span>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
