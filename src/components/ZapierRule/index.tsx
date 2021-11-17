import React from 'react';
import { Icon } from 'semantic-ui-react';
/* Styling */
import styles from './index.module.scss';

/* Components */
import SelectionFilter from '../FormFilters/SelectionFilter';
import InputFilter from '../FormFilters/InputFilter';

/* Constants */
import { KEYWORD_KPIS, CONDITIONS } from '../../constants/KeywordResearch/Zapier';

/* Interfaces */
import { Rule } from '../../interfaces/KeywordResearch/Zapier';

interface Props {
  index: number;
  rule: Rule;
  hideLabels?: boolean;
  updateRule: (index: number, rule: Rule) => void;
  removeRule: (index: number) => void;
}

const ZapierRule = (props: Props) => {
  const { index, rule, hideLabels, updateRule, removeRule } = props;

  const handleUpdateRule = (field: 'kpi' | 'condition' | 'value', value: string) => {
    updateRule(index, { ...rule, [field]: value });
  };

  return (
    <div className={styles.zapierRuleWrapper}>
      {rule.operator && rule.operator === 'or' && index !== 0 && (
        <div className={styles.orDivider}>OR</div>
      )}
      <div className={styles.zapierRule}>
        <div className={styles.zapierConditions}>
          <SelectionFilter
            label={hideLabels ? '' : 'KPI'}
            filterOptions={KEYWORD_KPIS}
            placeholder="Choose KPI..."
            value={rule.kpi}
            handleChange={(value: string) => {
              handleUpdateRule('kpi', value);
            }}
          />

          <SelectionFilter
            label={hideLabels ? '' : 'Requirement'}
            filterOptions={CONDITIONS.text}
            placeholder="Choose requirement..."
            value={rule.condition}
            handleChange={(value: string) => {
              handleUpdateRule('condition', value);
            }}
          />

          <InputFilter
            label={hideLabels ? '' : 'Value'}
            placeholder="Enter or select value..."
            value={rule.value}
            handleChange={(value: string) => {
              handleUpdateRule('value', value);
            }}
          />
        </div>
        <Icon
          name="trash alternate"
          className={styles.trashIcon}
          onClick={() => removeRule(index)}
        />
      </div>
    </div>
  );
};

export default ZapierRule;
