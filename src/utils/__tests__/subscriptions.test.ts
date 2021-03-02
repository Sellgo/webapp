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
    expect(subscriptions.isPlanBasic('anoy other')).not.toBeTruthy();
  });

  test('Testing Pro Plan', () => {
    expect(subscriptions.isPlanPro('Pro Plan')).toBeTruthy();
    expect(subscriptions.isPlanPro('anoy other')).not.toBeTruthy();
  });

  test('Testing Enterprise Plan', () => {
    expect(subscriptions.isPlanEnterprise('Enterprise')).toBeTruthy();
    expect(subscriptions.isPlanEnterprise('anoy other')).not.toBeTruthy();
  });

  test('Testing Free Trial Plan', () => {
    expect(subscriptions.isPlanFreeTrial('Free Trial')).toBeTruthy();
    expect(subscriptions.isPlanFreeTrial('anoy other')).not.toBeTruthy();
  });

  test('Testing Free Account Plan', () => {
    expect(subscriptions.isPlanFreeAccount('Free Account')).toBeTruthy();
    expect(subscriptions.isPlanFreeAccount('anoy other')).not.toBeTruthy();
  });
});
