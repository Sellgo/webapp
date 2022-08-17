import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* components */
import SpApiForm from '../../Settings/SPConnectivity/SpApiForm';
import ActionButton from '../../../components/ActionButton';
import ElevioArticle from '../../../components/ElevioArticle';
import PilotOnboarding from '../PilotOnboarding';

/* Utils */
import { AppConfig } from '../../../config';
import { sellerIDSelector } from '../../../selectors/Seller';
import { error, success } from '../../../utils/notifications';

/* Actions */
import { fetchSellerSubscription } from '../../../actions/Settings/Subscription';

interface Props {
  fetchSellerSubscription: () => void;
}

const PreMigration = (props: Props) => {
  const { fetchSellerSubscription } = props;
  const [showPreMigration, setShowPreMigration] = React.useState(false);
  const [isSpApiAuthenticated, setIsSpApiAuthenticated] = React.useState(false);

  const runMigration = async () => {
    try {
      const url = `${
        AppConfig.BASE_URL_API
      }sellers/${sellerIDSelector()}/perfect-stock/run-init-migration`;
      /* Set IS_MOCK to true to run migration in mock mode if in dev */
      const payload = {
        is_mock: false,
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

  if (!showPreMigration) {
    return <PilotOnboarding redirectToMigrate={() => setShowPreMigration(true)} />;
  }

  return (
    <>
      <main className={styles.pilotLoginPageWrapper}>
        <h1>AiStock migration is ready to start</h1>
        <p>
          When the migration is done, your supply chain will be fully automated through a lightning
          speed and robust algorithm,
          <br />
          so now you can ensure your fast-selling inventories are always in-stock and your business
          is liquid.
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
              Start migration now
            </ActionButton>
          </div>
          <div className={styles.instructionsBox}>
            <span>Step-by-step guide</span>
            <ElevioArticle articleId={'17'} />
          </div>
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
