import React, { useState } from 'react';
import { connect } from 'react-redux';

/* Actions */

/* Styling */
import styles from './index.module.scss';

/* Components */
import ProfileBoxHeader from '../../../../components/ProfileBoxHeader';
import ProfileBoxContainer from '../../../../components/ProfileBoxContainer';
import ZapierRule from '../../../../components/ZapierRule';
import ProductTable from './ProductTable';

/* Assets */
import { ReactComponent as ExpandedCellIcon } from '../../../../assets/images/expandCell.svg';
import { ReactComponent as DeExpandedCellIcon } from '../../../../assets/images/deExpandCell.svg';

import { Trigger as TriggerType, Rule } from '../../../../interfaces/KeywordResearch/Zapier';

/* Constants */
import { DEFAULT_RULE } from '../../../../constants/KeywordResearch/Zapier';
import ActionButton from '../../../../components/ActionButton';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';
import { Icon } from 'semantic-ui-react';

interface Props {
  trigger: TriggerType;
  triggerIndex: number;
  handleDeleteTrigger: (index: number) => void;
}

const Trigger = (props: Props) => {
  const { trigger, triggerIndex, handleDeleteTrigger } = props;
  const { rules, name } = trigger;

  const [isOpen, setOpen] = useState<boolean>(false);
  const [updatedRules, setUpdatedRules] = useState<Rule[]>(rules);

  /* Ensure that user does not delete all the rules */
  React.useEffect(() => {
    if (updatedRules.length === 0) {
      setUpdatedRules([DEFAULT_RULE]);
    }
  }, [updatedRules]);

  const handleAddRule = (operator: 'and' | 'or') => {
    setUpdatedRules([
      ...updatedRules,
      {
        ...DEFAULT_RULE,
        operator,
      },
    ]);
  };

  const updateRule = (index: number, rule: Rule) => {
    const newRules = [...updatedRules];
    newRules[index] = rule;
    setUpdatedRules(newRules);
  };

  const removeRule = (index: number) => {
    const newRules = [...updatedRules];
    newRules.splice(index, 1);
    setUpdatedRules(newRules);
  };

  return (
    <div className={styles.triggerWrapper}>
      <button className={styles.expandIcon} onClick={() => setOpen(!isOpen)}>
        {!isOpen ? <ExpandedCellIcon /> : <DeExpandedCellIcon />}
      </button>

      <div className={styles.ruleWrapper}>
        <ProfileBoxHeader
          className={`${styles.triggerHeader} ${!isOpen ? styles.triggerHeader__closed : ''}`}
        >
          {name} {triggerIndex + 1}
          <div>
            <Icon onClick={() => setOpen(true)} name="pencil" className={styles.headerIcon} />
            <Icon
              name="trash alternate"
              className={styles.headerIcon}
              onClick={() => handleDeleteTrigger(triggerIndex)}
            />
          </div>
        </ProfileBoxHeader>
        {isOpen && (
          <ProfileBoxContainer>
            <div className={styles.rulesContainer}>
              {updatedRules.map((rule: Rule, index: number) => {
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
            <SelectionFilter
              className={styles.assignInput}
              label="Assigned To"
              filterOptions={[{ key: 'keyword 1', value: 'keyword 1', text: 'keyword1' }]}
              placeholder="Please Select"
              value=""
              handleChange={() => {
                return null;
              }}
            />
            <ProductTable />
            <div className={styles.buttonsRow}>
              <ActionButton variant="reset" size="md" className={styles.resetButton}>
                Cancel
              </ActionButton>
              <ActionButton variant="secondary" type="purpleGradient" size="md">
                Save
              </ActionButton>
            </div>
          </ProfileBoxContainer>
        )}
      </div>
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
