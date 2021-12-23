import React from 'react';
import axios from 'axios';

/* Styles */
import styles from './index.module.scss';

/* Components */
import LeadTimeGroup from './LeadTimeGroup';
import LeadTimeMeta from './LeadTimeMeta';
import Placeholder from '../../../../components/Placeholder';
import SettingsNav from '../../../../components/SettingsNav';
import history from '../../../../history';

/* Types */
import { TriggerMetaData } from '../../../../interfaces/KeywordResearch/Zapier';

/* Constants */
import { DEFAULT_TRIGGER } from '../../../../constants/KeywordResearch/Zapier';
import { SETTINGS_PAGES } from '../../../../constants/PerfectStock';
import { AppConfig } from '../../../../config';
import PageHeader from '../../../../components/PageHeader';

interface Props {
  match: any;
}
const LeadTime = (props: Props) => {
  const { match } = props;

  const [triggers, setTriggers] = React.useState<TriggerMetaData[]>([]);
  const [isFetchTriggersLoading, setTriggersLoading] = React.useState<boolean>(true);
  const sellerID = localStorage.getItem('userId');

  /* Fetches and checks for Zapier API key */
  const fetchZapierApiKeys = async () => {
    try {
      const res = await axios.get(`${AppConfig.BASE_URL_API}sellers/${sellerID}/api-key`);
      if (!res.data.api_key_id) {
        history.push('/settings/api-keys');
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* Fetches all the triggers from backend */
  const fetchTriggers = async () => {
    setTriggersLoading(true);
    try {
      let { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords/trigger`
      );
      data = data.filter((trigger: TriggerMetaData) => trigger.status === 'active');
      setTriggers(data);
    } catch (err) {
      console.error(err);
    }
    setTriggersLoading(false);
  };

  /* Adds new trigger */
  const handleAddTrigger = async () => {
    setTriggersLoading(true);
    try {
      const { data, status } = await axios.post(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords/trigger`,
        DEFAULT_TRIGGER
      );
      if (status === 201) {
        setTriggers([...triggers, data]);
      }
    } catch (err) {
      console.error(err);
    }
    setTriggersLoading(false);
  };

  /* Deletes trigger */
  const handleDeleteTrigger = async (triggerId: number) => {
    setTriggersLoading(true);
    try {
      const { status } = await axios.patch(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords/trigger/${triggerId}/delete`
      );

      if (status === 200) {
        let newTriggers = [...triggers];
        newTriggers = newTriggers.filter(trigger => trigger.id !== triggerId);
        setTriggers(newTriggers);
      }
    } catch (err) {
      console.error(err);
    }
    setTriggersLoading(false);
  };

  React.useEffect(() => {
    fetchZapierApiKeys();
    fetchTriggers();
  }, []);

  return (
    <main className={styles.leadTimeWrapper}>
      <PageHeader
        title={'Lead Time'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Perfect Stock' },
          { content: 'Lead Time' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav settingsPages={SETTINGS_PAGES} />
      <div className={styles.leadTime}>
        <LeadTimeMeta handleAddGroup={handleAddTrigger} />
        {isFetchTriggersLoading && <Placeholder numberParagraphs={3} numberRows={5} isGrey />}
        {!isFetchTriggersLoading &&
          triggers.map((trigger: TriggerMetaData) => (
            <LeadTimeGroup
              handleDeleteTrigger={handleDeleteTrigger}
              key={trigger.id}
              triggerIndex={trigger.id}
              triggerName={trigger.name}
            />
          ))}
      </div>
    </main>
  );
};

export default LeadTime;
