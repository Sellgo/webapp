import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// @ts-ignore
import { Widget } from '@typeform/embed-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../components/PageHeader';

/* Selectors */
import { getSellerSubscription } from '../../selectors/Subscription';
import { sellerIDSelector } from '../../selectors/Seller';

/* Actions */
import { fetchSellerSubscription } from '../../actions/Settings/Subscription';

/* Interfaces */
import { SellerSubscription } from '../../interfaces/Seller';

/* Config */
import { AppConfig } from '../../config';
import history from '../../history';

/* Utils*/
import { isBetaAccount } from '../../utils/subscriptions';

interface Props {
  match: any;
  sellerSubscription: SellerSubscription;
  fetchSellerSubscription: () => void;
}

const BetaUsersActivationForm = (props: Props) => {
  const { match, fetchSellerSubscription, sellerSubscription } = props;

  const handleActiveBetaAccount = () => {
    const sellerId = sellerIDSelector();
    axios
      .post(`${AppConfig.BASE_URL_API}sellers/${sellerId}/activate-beta`)
      .then(() => {
        fetchSellerSubscription();
        window.location.reload();
      })
      .catch(() => {
        console.error('Error activating beta account');
      });
  };

  useEffect(() => {
    if (!isBetaAccount(sellerSubscription)) {
      history.push('/synthesis');
    }
  }, []);

  return (
    <main className={styles.betaUsersActivation}>
      <PageHeader
        title={`Beta User Activation`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Activate Beta Account', to: '/activate-beta-account' },
        ]}
        auth={match.params.auth}
      />

      <div className={styles.widgetWrapper}>
        <Widget
          id={AppConfig.BETA_FORM_ID}
          className={styles.typeFormBox}
          onSubmit={() => handleActiveBetaAccount()}
        />
      </div>
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellerSubscription: getSellerSubscription(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerSubscription: () => dispatch(fetchSellerSubscription()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BetaUsersActivationForm);
