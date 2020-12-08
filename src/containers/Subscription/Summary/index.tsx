import React, { useEffect, useState } from 'react';
import './index.scss';
import { Button, Container, Header, Input } from 'semantic-ui-react';
import _ from 'lodash';
import { Subscription } from '../../../interfaces/Seller';
import { connect } from 'react-redux';
import { fetchSubscriptions, redeemCoupon } from '../../../actions/Settings/Subscription';

interface SummaryProps {
  planType: string;
  paymentMode: string;
  subscriptions: Subscription[];
  fetchSubscriptions: () => void;
  showCoupon?: boolean;
  isCouponApplied: boolean;
  redeemCoupon: (couponValue: any, sellerID: any) => void;
}
function Summary(props: SummaryProps) {
  const {
    planType,
    paymentMode,
    subscriptions,
    fetchSubscriptions,
    showCoupon,
    isCouponApplied,
    redeemCoupon,
  } = props;
  const [couponValue, setCouponValue] = useState('');

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

  const handleCouponChange = (e: any) => {
    setCouponValue(e.target.value);
  };

  const redeem = () => {
    const sellerID = localStorage.getItem('userId');
    redeemCoupon(couponValue, sellerID);
  };

  return (
    <Container text className="summary-container">
      <Header as="h3">Subscription Summary</Header>
      <div className="summary-container__content">
        <div className="summary-container__content__wrapper">
          <div className="summary-container__content__wrapper__left">
            <p>
              <span className="summary-container__content__wrapper__left__plan-title">
                {plan.name}
              </span>
              <span className="summary-container__content__wrapper__left__plan-value">
                {plan.description}
              </span>
            </p>
            <p className="summary-container__content__wrapper__left__moneyback-guarantee">
              {plan.subDescription}
            </p>
          </div>
          {showCoupon && (
            <div className="summary-container__content__wrapper__right">
              <span className="summary-container__content__wrapper__right__coupon-title">
                Redeem Coupon
              </span>
              <div className="summary-container__content__wrapper__right__input-content">
                <Input
                  className="summary-container__content__wrapper__right__input-content__coupon-input"
                  onChange={handleCouponChange}
                  placeholder="Coupon Code"
                />
                <Button
                  basic
                  className="summary-container__content__wrapper__right__input-content__coupon-btn"
                  onClick={() => redeem()}
                >
                  {isCouponApplied ? 'Applied' : 'Redeem'}
                </Button>
              </div>
            </div>
          )}
        </div>
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
  isCouponApplied: state.subscription.isCouponApplied,
});

const mapDispatchToProps = {
  fetchSubscriptions: () => fetchSubscriptions(),
  redeemCoupon: (couponValue: any, sellerID: any) => redeemCoupon(couponValue, sellerID),
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
