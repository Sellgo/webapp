import React from 'react';
/* Styling */
import styles from './index.module.scss';

/* Components */
import SelectionFilter from '../FormFilters/SelectionFilter';
import InputFilter from '../FormFilters/InputFilter';

/* Constants */
import { KEYWORD_KPIS, CONDITIONS, getType } from '../../constants/KeywordResearch/Zapier';

/* Interfaces */
import { Rule } from '../../interfaces/KeywordResearch/Zapier';

/* Assets */
import { ReactComponent as CrossIcon } from '../../assets/images/crossIcon.svg';

interface Props {
  index: number;
  rule: Rule;
  hideLabels?: boolean;
  updateRule: (index: number, rule: Rule) => void;
  removeRule: (index: number) => void;
  insertNewRuleAtIndex: (index: number) => void;
  error?: boolean;
}

const ZapierRule = (props: Props) => {
  const { index, rule, hideLabels, updateRule, removeRule, insertNewRuleAtIndex, error } = props;
  const [ruleType, setRuleType] = React.useState<'text' | 'number' | 'boolean' | 'date' | ''>('');
  const handleUpdateRule = (field: 'field_name' | 'condition' | 'value', value: string) => {
    updateRule(index, { ...rule, [field]: value });
  };

  React.useEffect(() => {
    if (rule.field_name) {
      const type = getType(rule.field_name);
      setRuleType(type);
    }
  }, [rule.field_name]);

  return (
    <div className={styles.zapierRuleWrapper}>
      {rule.logical_operator && rule.logical_operator === 'or' && index !== 0 && (
        <div>
          <button className={styles.addRuleButton} onClick={() => insertNewRuleAtIndex(index)}>
            + AND
          </button>
          <div className={styles.orDivider}>OR</div>
        </div>
      )}
      <div className={styles.zapierRule}>
        <SelectionFilter
          label={hideLabels ? '' : 'KPI'}
          filterOptions={KEYWORD_KPIS}
          placeholder="Choose KPI..."
          value={rule.field_name}
          handleChange={(value: string) => {
            handleUpdateRule('field_name', value);
            setRuleType(getType(value));
          }}
          className={error ? styles.error : ''}
        />

        <SelectionFilter
          label={hideLabels ? '' : 'Requirement'}
          filterOptions={ruleType ? CONDITIONS[ruleType] : []}
          placeholder="Choose requirement..."
          value={rule.condition}
          disabled={ruleType.length === 0}
          handleChange={(value: string) => {
            handleUpdateRule('condition', value);
          }}
          className={error ? styles.error : ''}
        />

        <InputFilter
          label={hideLabels ? '' : 'Value'}
          placeholder="Enter or select value..."
          value={rule.value}
          disabled={ruleType.length === 0}
          handleChange={(value: string) => {
            handleUpdateRule('value', value);
          }}
          isNumber={ruleType === 'number'}
        />
        <CrossIcon className={styles.crossIcon} onClick={() => removeRule(index)} />
        {error && <div className={styles.errorMessage}> This rule is duplicated </div>}
      </div>
    </div>
  );
};

export default ZapierRule;
