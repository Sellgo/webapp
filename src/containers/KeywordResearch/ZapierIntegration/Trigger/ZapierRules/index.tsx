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
  ruleErrIndexes: number[];
  setRuleErrIndexes: (ruleIndex: number[]) => void;
}

const ZapierRules = (props: Props) => {
  const { rules, setRules, ruleErrIndexes, setRuleErrIndexes } = props;

  React.useEffect(() => {
    /* Ensure that user does not delete all the rules */
    if (rules.length === 0) {
      setRules([DEFAULT_RULE]);
    }
    const newRuleErrIndexes: number[] = [];
    /* Check for duplicated rules */
    /* Refactor into O(N) next time */
    rules.forEach((rule, index) => {
      const duplicate = rules.findIndex((duplicateRule: Rule) => {
        return (
          rule.field_name === duplicateRule.field_name &&
          rule.condition === duplicateRule.condition &&
          rule.condition !== '' &&
          rule.field_name !== ''
        );
      });
      if (duplicate !== -1 && duplicate !== index) {
        newRuleErrIndexes.push(index);
      }
    });
    setRuleErrIndexes(newRuleErrIndexes);
  }, [rules]);

  /* Add new rule to end of list */
  const handleAddRule = (operator: 'and' | 'or') => {
    setRules([
      ...rules,
      {
        ...DEFAULT_RULE,
        logical_operator: operator,
      },
    ]);
  };

  /* Update selected rule */
  const updateRule = (index: number, rule: Rule) => {
    const newRules = [...rules];
    newRules[index] = rule;
    setRules(newRules);
  };

  /* Delete rule */
  const removeRule = (index: number) => {
    const newRules = [...rules];

    /* If the rule being deleted is the first row in an OR group, pass down the OR operator down to next rule */
    if (index < newRules.length - 1 && newRules[index].logical_operator === 'or') {
      newRules[index + 1].logical_operator = 'or';
    }
    newRules.splice(index, 1);
    setRules(newRules);
  };

  /* Insert new AND rule at given index */
  const insertNewRuleAtIndex = (index: number) => {
    const newRules = [...rules];
    newRules.splice(index, 0, { ...DEFAULT_RULE, logical_operator: 'and' });
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
              insertNewRuleAtIndex={insertNewRuleAtIndex}
              rule={rule}
              hideLabels={index !== 0}
              error={ruleErrIndexes.includes(index)}
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
