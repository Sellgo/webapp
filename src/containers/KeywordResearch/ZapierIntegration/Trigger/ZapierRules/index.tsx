import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ZapierRule from '../../../../../components/ZapierRule';

/* Types */
import { Rule } from '../../../../../interfaces/KeywordResearch/Zapier';

/* Constants */
import { DEFAULT_RULE } from '../../../../../constants/KeywordResearch/Zapier';

interface Props {
  rules: Rule[];
  setRules: (rule: Rule[]) => void;
}

const ZapierRules = (props: Props) => {
  const { rules, setRules } = props;

  /* Ensure that user does not delete all the rules */
  React.useEffect(() => {
    if (rules.length === 0) {
      setRules([DEFAULT_RULE]);
    }
  }, [rules]);

  /* Rule handlers - add rule */
  const handleAddRule = (operator: 'and' | 'or') => {
    setRules([
      ...rules,
      {
        ...DEFAULT_RULE,
        logical_operator: operator,
      },
    ]);
  };

  /* Rule handlers - update rule */
  const updateRule = (index: number, rule: Rule) => {
    const newRules = [...rules];
    newRules[index] = rule;
    setRules(newRules);
  };

  /* Rule handlers - remove rule */
  const removeRule = (index: number) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  return (
    <>
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
    </>
  );
};

export default ZapierRules;
