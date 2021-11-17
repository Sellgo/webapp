import React from 'react';
import { connect } from 'react-redux';

/* Styles */
import styles from './index.module.scss';

/* Actions */
import { getSellerInfo } from '../../../actions/Settings';

/* Components */
import Trigger from './Trigger';
import ZapierMeta from './ZapierMeta';

import { Trigger as TriggerType } from '../../../interfaces/KeywordResearch/Zapier';

const RULES = [
  {
    kpi: 'search_volume',
    condition: 'endswith',
    value: 'hello',
  },
  {
    kpi: 'search_volume',
    condition: 'endswith',
    value: 'hello',
  },
];

const TRIGGERS: TriggerType[] = [
  {
    name: 'Trigger',
    rules: RULES,
    assignments: [],
  },
  {
    name: 'Trigger',
    rules: RULES,
    assignments: [],
  },
];

const Zapier = () => {
  const [triggers, setTriggers] = React.useState<TriggerType[]>(TRIGGERS);

  const handleAddTrigger = () => {
    setTriggers([
      ...triggers,
      {
        name: 'Trigger',
        rules: [],
        assignments: [],
      },
    ]);
  };

  const handleDeleteTrigger = (index: number) => {
    console.log(index);
    const newTriggers = [...triggers];
    newTriggers.splice(index, 1);
    setTriggers(newTriggers);
  };

  return (
    <section className={styles.zapierIntegration}>
      <ZapierMeta handleAddTrigger={handleAddTrigger} />
      {triggers.map((trigger: TriggerType, index: number) => (
        <Trigger
          handleDeleteTrigger={handleDeleteTrigger}
          key={index}
          triggerIndex={index}
          trigger={trigger}
        />
      ))}
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  profile: state.settings.profile,
});

const mapDispatchToProps = {
  getSeller: () => getSellerInfo(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Zapier);
