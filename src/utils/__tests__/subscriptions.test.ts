import * as subscriptions from '../subscriptions';

/* Testing subscription types */
describe('Testing subscription types', () => {
  test('Test free sbscription', () => {
    expect(subscriptions.isSubscriptionFree('free')).toBeTruthy();
    expect(subscriptions.isSubscriptionFree('anyother')).toBeFalsy();
  });

  test('Test trial subscription', () => {
    expect(subscriptions.isSubscriptionTrial('trial')).toBeTruthy();
    expect(subscriptions.isSubscriptionTrial('anyother')).toBeFalsy();
  });

  test('Test paid subscription', () => {
    expect(subscriptions.isSubscriptionPaid('paid')).toBeTruthy();
    expect(subscriptions.isSubscriptionPaid('anyother')).toBeFalsy();
  });

  test('Test unpaid subscription', () => {
    expect(subscriptions.isSubscriptionNotPaid('paid')).not.toBeTruthy();
    expect(subscriptions.isSubscriptionNotPaid('trial')).not.toBeFalsy();
    expect(subscriptions.isSubscriptionNotPaid('free')).not.toBeFalsy();
    expect(subscriptions.isSubscriptionNotPaid('anyother')).not.toBeFalsy();
  });
});

/* Testing subscription plans */
describe('Testing subscription plans', () => {
  test('Testing Extension Plan', () => {
    expect(subscriptions.isPlanExtension('Browser Extension')).toBeTruthy();
    expect(subscriptions.isPlanExtension('any other')).not.toBeTruthy();
  });

  test('Testing Basic Plan', () => {
    expect(subscriptions.isPlanBasic('Basic Plan')).toBeTruthy();
    expect(subscriptions.isPlanBasic('any other')).not.toBeTruthy();
  });

  test('Testing Pro Plan', () => {
    expect(subscriptions.isPlanPro('Pro Plan')).toBeTruthy();
    expect(subscriptions.isPlanPro('any other')).not.toBeTruthy();
  });

  test('Testing Enterprise Plan', () => {
    expect(subscriptions.isPlanEnterprise('Enterprise')).toBeTruthy();
    expect(subscriptions.isPlanEnterprise('any other')).not.toBeTruthy();
  });

  test('Testing Free Trial Plan', () => {
    expect(subscriptions.isPlanFreeTrial('Free Trial')).toBeTruthy();
    expect(subscriptions.isPlanFreeTrial('any other')).not.toBeTruthy();
  });

  test('Testing Free Account Plan', () => {
    expect(subscriptions.isPlanFreeAccount('Free Account')).toBeTruthy();
    expect(subscriptions.isPlanFreeAccount('any other')).not.toBeTruthy();
  });
});

/* Testing subscription ID's */
describe('Testing subscription ID', () => {
  test('Testing Basic Plan ID', () => {
    expect(subscriptions.isSubscriptionIdBasic(1)).toBeTruthy();
  });
  test('Testing Pro Plan ID', () => {
    expect(subscriptions.isSubscriptionIdPro(2)).toBeTruthy();
  });
  test('Testing Enterpise Plan ID', () => {
    expect(subscriptions.isSubscriptionIdEnterprise(3)).toBeTruthy();
  });

  test('Testing Free Trial ID', () => {
    expect(subscriptions.isSubscriptionIdFreeTrial(4)).toBeTruthy();
  });

  test('Testing Free Account Plan ID', () => {
    expect(subscriptions.isSubscriptionIdFreeAccount(5)).toBeTruthy();
  });

  test('Testing Browser Extension Plan ID', () => {
    expect(subscriptions.isSubscriptionIdFreeExtension(6)).toBeTruthy();
  });
});

/* Testing Free trial expiry */
describe('Testing free trial expiry', () => {
  const mockExpiredSubscription = {
    id: 0,
    cdate: '',
    udate: '',
    expiry_date: '2019-08-08',
    payment_mode: '',
    seller_id: 0,
    status: '',
    stripe_subscription_id: '',
    subscription_id: 0,
  };
  test('Testing for expired free trial', () => {
    expect(subscriptions.isTrialExpired(mockExpiredSubscription)).toBeTruthy();
  });

  test('Non expired trail subscriptions', () => {
    expect(
      subscriptions.isTrialExpired({ ...mockExpiredSubscription, expiry_date: '2050-08-08' })
    ).not.toBeTruthy();
  });

  test('Testing invalid subscriptions', () => {
    expect(
      subscriptions.isTrialExpired({ ...mockExpiredSubscription, expiry_date: null })
    ).not.toBeTruthy();
  });
});
