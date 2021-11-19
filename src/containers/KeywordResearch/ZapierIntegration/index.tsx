import React from 'react';
import axios from 'axios';

/* Styles */
import styles from './index.module.scss';

/* Components */
import Trigger from './Trigger';
import ZapierMeta from './ZapierMeta';
import Placeholder from '../../../components/Placeholder';

/* Types */
import { TriggerMetaData } from '../../../interfaces/KeywordResearch/Zapier';

/* Constants */
import { DEFAULT_TRIGGER } from '../../../constants/KeywordResearch/Zapier';
import { AppConfig } from '../../../config';

const Zapier = () => {
  const [triggers, setTriggers] = React.useState<TriggerMetaData[]>([]);
  const [isFetchTriggersLoading, setTriggersLoading] = React.useState<boolean>(true);

  /* Fetches all the triggers from backend */
  const fetchTriggers = async () => {
    setTriggersLoading(true);
    try {
      const sellerID = localStorage.getItem('userId');
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
      const sellerID = localStorage.getItem('userId');
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
      const sellerID = localStorage.getItem('userId');
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
    fetchTriggers();
  }, []);

  return (
    <section className={styles.zapierIntegration}>
      <ZapierMeta handleAddTrigger={handleAddTrigger} />
      {isFetchTriggersLoading && <Placeholder numberParagraphs={3} numberRows={5} isGrey />}
      {!isFetchTriggersLoading &&
        triggers.map((trigger: TriggerMetaData) => (
          <Trigger
            handleDeleteTrigger={handleDeleteTrigger}
            key={trigger.id}
            triggerIndex={trigger.id}
            triggerName={trigger.name}
          />
        ))}
    </section>
  );
};

export default Zapier;
