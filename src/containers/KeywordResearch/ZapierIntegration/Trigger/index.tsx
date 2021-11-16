import React, { useState } from 'react';
import { connect } from 'react-redux';

/* Actions */

/* Styling */
import styles from './index.module.scss';

/* Components */
import ProfileBoxHeader from '../../../../components/ProfileBoxHeader';
import ProfileBoxContainer from '../../../../components/ProfileBoxContainer';
import ZapierRule from '../../../../components/ZapierRule';

import { Rule } from '../../../../interfaces/KeywordResearch/Zapier';

/* Constants */
import { DEFAULT_RULE } from '../../../../constants/KeywordResearch/Zapier';

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

const Trigger = () => {
  const [rules, setRules] = useState<Rule[]>(RULES);

  React.useEffect(() => {
    if (rules.length === 0) {
      setRules([DEFAULT_RULE]);
    }
  }, [rules]);

  const handleAddRule = (operator: 'and' | 'or') => {
    setRules([
      ...rules,
      {
        ...DEFAULT_RULE,
        operator,
      },
    ]);
  };

  const updateRule = (index: number, rule: Rule) => {
    const newRules = [...rules];
    newRules[index] = rule;
    setRules(newRules);
  };

  const removeRule = (index: number) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  return (
    <div className={styles.ruleWrapper}>
      <ProfileBoxHeader>RULE</ProfileBoxHeader>
      <ProfileBoxContainer>
        <div className={styles.rulesContainer}>
          {rules.map((rule: Rule, index: number) => {
            return (
              <ZapierRule
                key={index}
                index={index}
                updateRule={updateRule}
                removeRule={removeRule}
                rule={rule}
                hideLabels={index !== 0}
              />
            );
          })}
        </div>
        <div className={styles.addRuleButtonsRow}>
          <button className={styles.addRuleButton} onClick={() => handleAddRule('and')}>
            + AND
          </button>
          <button className={styles.addRuleButton} onClick={() => handleAddRule('or')}>
            + OR
          </button>
        </div>
      </ProfileBoxContainer>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  profile: state.settings.profile,
});

const mapDispatchToProps = {
  // getSeller: () => getSellerInfo(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Trigger);
