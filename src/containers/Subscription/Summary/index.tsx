import React, { useEffect } from 'react';
import './index.scss';
import { Container, Header } from 'semantic-ui-react';
import _ from 'lodash';
import { Subscription } from '../../../interfaces/Seller';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../../../actions/Settings/Subscription';

interface SummaryProps {
  planType: string;
  paymentMode: string;
  subscriptions: Subscription[];
  fetchSubscriptions: () => void;
}
function Summary(props: SummaryProps) {
  const { planType, paymentMode, subscriptions, fetchSubscriptions } = props;
  useEffect(() => {
    fetchSubscriptions();
  }, []);
  const index = planType === 'basic' ? 1 : 2;
  const plan = {
    name: `${!_.isEmpty(subscriptions) ? subscriptions[index].name : '-'}`,
    description: `$${
      !_.isEmpty(subscriptions)
        ? paymentMode === 'yearly'
          ? subscriptions[index].yearly_price + '/mo billed yearly'
          : subscriptions[index].monthly_price + '/mo billed monthly'
        : '0/mo billed monthly'
    }`,
    subDescription: '14-Days Money Back Guarantee',
    benefits: [
      '-Manage your supplier files in Search Management',
      `-${
        !_.isEmpty(subscriptions) ? subscriptions[index].track_limit : '-'
      } Products can be tracked through Product Tracker`,
      '-Unlimited access in our Profit Finder',
      '-Sellgo Premium Support',
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
          {_.map(plan.benefits, (item, key) => {
            return (
              <span key={key} className="summary-container__content__benefits-content__items">
                {item}
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
