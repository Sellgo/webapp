import React from 'react';
import { Icon } from 'semantic-ui-react';
import PageHeader from '../../../components/PageHeader';
import styles from './index.module.scss';
import APIForm from './APIForm';
import PilotLoginHeader from '../../../components/PilotLoginHeader';
import SettingsNav from '../SettingsNav';

/* Utils */
import { isFirstTimeLoggedIn } from '../../../utils/subscriptions';

interface Props {
  match: any;
}
const APIConnectivity = (props: Props) => {
  const { match } = props;
  const firstTimeLoggedIn = isFirstTimeLoggedIn();

  return (
    <>
      {firstTimeLoggedIn ? (
        <PilotLoginHeader />
      ) : (
        <PageHeader
          title={'API Keys'}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Settings' },
            { content: 'API Keys' },
          ]}
          auth={match.params.auth}
        />
      )}
      <div className={styles.connectivityPageWrapper}>
        <SettingsNav match={match} />
        <div>
          <APIForm />
          <p className={styles.zapierActivationLink}>
            Since our app is still private Beta, please click on the link below to get invitation
            access from Zapier:
            <br />
            <br />
            <a
              href="https://zapier.com/developer/public-invite/146751/5889feee916f178bf8bd80fd3d7d19f9/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://zapier.com/developer/public-invite/146751/5889feee916f178bf8bd80fd3d7d19f9/
              <Icon name="external" className={styles.linkIcon} />
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default APIConnectivity;
