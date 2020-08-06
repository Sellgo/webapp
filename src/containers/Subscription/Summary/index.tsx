import React, { useEffect } from 'react';
import './index.scss';
import { Container, Header } from 'semantic-ui-react';
import _ from 'lodash';
import { Subscription } from '../../../interfaces/Seller';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../../../actions/Settings/Subscription';

interface SummaryProps {
  planType: any;
  subscriptions: Subscription[];
  fetchSubscriptions: () => void;
}
function Summary(props: SummaryProps) {
  const { planType, subscriptions, fetchSubscriptions } = props;
  useEffect(() => {
    fetchSubscriptions();
  }, []);
  const index = planType === 'basic' ? 1 : 2;
  const plan = {
    name: `${!_.isEmpty(subscriptions) ? subscriptions[index].name : '-'}`,
    description: `$${
      !_.isEmpty(subscriptions) ? subscriptions[index].price : '0'
    }/mo billed monthly`,
    subDescription: '14-Days Money Back Guarantee',
    benefits: [
      {
        text: '-Manage your supplier files in Supplier Management',
      },
      {
        text: `-${
          !_.isEmpty(subscriptions) ? subscriptions[index].track_limit : '-'
        } Products can be tracked through Product Tracker`,
      },
      {
        text: '-Unlimited access in our Profit Finder',
      },
      {
        text: '-Sellgo support',
      },
    ],
  };

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

const mapStateToProps = (state: any) => ({
  subscriptions: state.subscription.subscriptions,
});

const mapDispatchToProps = {
  fetchSubscriptions: () => fetchSubscriptions(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
