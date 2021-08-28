import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import { fetchSellerSubscription } from '../../../actions/Settings/Subscription';

/* Styling */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../../components/PageHeader';
import ProfileBoxHeader from '../../../components/ProfileBoxHeader';
import ProfileBoxContainer from '../../../components/ProfileBoxContainer';

/* Interfaces */
import { SubscriptionPlanType } from '../../../interfaces/Settings/billing';

interface Props {
  fetchSellerSubscription: () => void;
  subscriptionPlan: SubscriptionPlanType;
  match: any;
}

const Profile = (props: Props) => {
  const { match } = props;

  return (
    <>
      <PageHeader
        title={'Billing'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Settings', to: '/settings' },
          { content: 'Billing' },
        ]}
        auth={match.params.auth}
      />

      <main className={styles.billingPageWrapper}>
        <ProfileBoxHeader>Profile</ProfileBoxHeader>
        <ProfileBoxContainer>Content</ProfileBoxContainer>
      </main>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  subscriptionPlan: state.subscription.plan,
});

const mapDispatchToProps = {
  fetchSellerSubscription: () => fetchSellerSubscription(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
