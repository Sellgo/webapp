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
