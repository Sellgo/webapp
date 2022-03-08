import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* components */
import SpApiForm from '../../Settings/SPConnectivity/SpApiForm';
import ActionButton from '../../../components/ActionButton';
import PageHeader from '../../../components/PageHeader';

/* Utils */
import { AppConfig } from '../../../config';
import { sellerIDSelector } from '../../../selectors/Seller';
import { error, success } from '../../../utils/notifications';

/* Actions */
import { fetchSellerSubscription } from '../../../actions/Settings/Subscription';

interface Props {
  match: any;
  fetchSellerSubscription: () => void;
}

const PreMigration = (props: Props) => {
  const { match, fetchSellerSubscription } = props;
  const [isSpApiAuthenticated, setIsSpApiAuthenticated] = React.useState(false);

  const runMigration = async () => {
    try {
      const url = `${
        AppConfig.BASE_URL_API
      }sellers/${sellerIDSelector()}/perfect-stock/run-init-migration`;
      /* Set IS_MOCK to true to run migration in mock mode if in dev */
      const payload = {
        is_mock: process.env.REACT_APP_ENV === 'production' ? false : true,
      };
      const { status } = await axios.post(url, payload);

      if (status === 200) {
        success('Migration started successfully');
        fetchSellerSubscription();
      }
    } catch (err) {
      error('Error starting migration');
    }
  };
  return (
    <>
      <PageHeader
        title={`Product Research`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Perfect Stock', to: '/perfect-stock' },
        ]}
        auth={match.params.auth}
      />
      <main className={styles.pilotLoginPageWrapper}>
        <h1>Perfect Stock White Glove Migration is Ready to Start</h1>
        <p>
          Sellgo&apos;s product, seller and keyword database, automation and AI
          <br />
          gives your Amazon business superpowers.
        </p>

        <div className={styles.row}>
          <div className={styles.spApiFormWrapper}>
            <SpApiForm setIsSpApiAuthenticated={setIsSpApiAuthenticated} />
            <ActionButton
              variant="primary"
              type="purpleGradient"
              size="md"
              onClick={runMigration}
              className={styles.migrationButton}
              disabled={!isSpApiAuthenticated}
            >
              Start Migration Now
            </ActionButton>
          </div>
          <div className={styles.instructionsBox}>Step-by-step Guide</div>
        </div>
      </main>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerSubscription: () => dispatch(fetchSellerSubscription()),
  };
};

export default connect(null, mapDispatchToProps)(PreMigration);
