import React from 'react';
import './index.scss';
import { Container, Header } from 'semantic-ui-react';
import _ from 'lodash';

const proPlan = {
  name: 'Pro Plan',
  description: '$99/mo billed monthly',
  subDescription: '14-Days Money Back Guarantee',
  benefits: [
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
  ],
};
const basicPlan = {
  name: 'Basic Plan',
  description: '$69/mo billed monthly',
  subDescription: '14-Days Money Back Guarantee',
  benefits: [
    {
      text: '-Manage your supplier files in Supplier Management',
    },
    {
      text: '-50 Products can be tracked through Product Tracker',
    },
    {
      text: '-Unlimited access in our Profit Finder',
    },
    {
      text: '-Sellgo support',
    },
  ],
};
interface SummaryProps {
  planType: string;
}

export default function Summary(props: SummaryProps) {
  const { planType } = props;
  const plan = planType === 'basic' ? basicPlan : proPlan;
  return (
    <Container text className="summary-container">
      <Header as="h3">Subscription Summary</Header>
      <div className="summary-container__content">
        <p>
          <span className="summary-container__content__plan-title">{plan.name}</span>
          <span className="summary-container__content__plan-value">{plan.description}</span>
        </p>
        <p className="summary-container__content__moneyback-guarantee">{plan.subDescription}</p>
        <div className="summary-container__content__benefits-content">
          {_.map(plan.benefits, (items, key) => {
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
