import React, { useState } from 'react';
import axios from 'axios';
import { Confirm, Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';
import ProductTable from './ProductTable';
import ActionButton from '../../../../components/ActionButton';
import SelectionMultipleFilter from '../../../../components/FormFilters/SelectionMultipleFilter';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import Placeholder from '../../../../components/Placeholder';
import ZapierRules from './ZapierRules';

/* Assets */
import { ReactComponent as ExpandedCellIcon } from '../../../../assets/images/expandCell.svg';
import { ReactComponent as DeExpandedCellIcon } from '../../../../assets/images/deExpandCell.svg';

/* Types */
import { Rule, SelectionKeyword } from '../../../../interfaces/KeywordResearch/Zapier';

/* Utils */
import { AppConfig } from '../../../../config';
import { truncateString } from '../../../../utils/format';
import { error, success } from '../../../../utils/notifications';

interface Props {
  triggerName: string;
  triggerIndex: number;
  handleDeleteTrigger: (index: number) => void;
}

const Trigger = (props: Props) => {
  const { triggerName, triggerIndex, handleDeleteTrigger } = props;

  /* Modal State */
  const [isOpen, setOpen] = useState<boolean>(false);

  /* Trigger Name State */
  const [isEdittingName, setEdittingName] = useState<boolean>(false);
  const [newTriggerName, setNewTriggerName] = useState<string>(triggerName);

  /* Trigger rules state */
  const [rules, setRules] = useState<Rule[]>([]);

  /* Trigger assignments state */
  const [assignedProducts, setAssignedProducts] = useState<any[]>([]);
  const [assignedKeywords, setAssignedKeywords] = useState<any[]>([]);
  const [availableKeywords, setAvailableKeywords] = useState<any[]>([]);

  /* Deleting triggers state */
  const [isDeleting, setDeleting] = useState<boolean>(false);

  /* Fetch rules and assignments loading state */
  const [isRulesAndAssignmentsLoading, setRulesAndAssignmentsLoading] = useState<boolean>(true);

  const fetchRulesAndAssignments = async () => {
    setRulesAndAssignmentsLoading(true);
    try {
      const sellerID = localStorage.getItem('userId');
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords/trigger/${triggerIndex}`
      );
      setRules(data.rules);
      setAssignedProducts(data.assignments);
    } catch (err) {
      setRules([]);
      setAssignedProducts([]);
      console.error(err);
    }
    setRulesAndAssignmentsLoading(false);
  };

  const fetchAvailableKeywords = async () => {
    try {
      const sellerID = localStorage.getItem('userId');
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/keyword-track-by-seller?keyword_trigger_id=${triggerIndex}`
      );
      const availableKeywords: any[] = [];
      const assignedKeywords: any[] = [];
      data.map((keyword: SelectionKeyword) => {
        if (keyword.is_assigned) {
          assignedKeywords.push(keyword.keyword_track_id);

          availableKeywords.push({
            key: keyword.phrase,
            value: keyword.keyword_track_id,
            text: `${truncateString(keyword.title, 70)} - ${keyword.phrase}`,
          });
        } else {
          availableKeywords.push({
            key: keyword.phrase,
            value: keyword.keyword_track_id,
            text: `${truncateString(keyword.title, 70)} - ${keyword.phrase}`,
          });
        }
        return null;
      });
      setAssignedKeywords(assignedKeywords);
      setAvailableKeywords(availableKeywords);
    } catch (err) {
      setAvailableKeywords([]);
      console.error(err);
    }
  };

  const fetchData = () => {
    fetchRulesAndAssignments();
    fetchAvailableKeywords();
  };

  /* Save all changes in the trigger */
  const handleSave = async () => {
    setRulesAndAssignmentsLoading(true);
    try {
      const sellerID = localStorage.getItem('userId');
      const { status } = await axios.post(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords/trigger/${triggerIndex}`,
        {
          name: newTriggerName,
          rules,
          assignments: assignedKeywords,
        }
      );
      if (status === 201) {
        success('Successfully updated trigger.');
        fetchData();
      } else {
        error('Failed to save trigger.');
        setRulesAndAssignmentsLoading(false);
      }
    } catch (err) {
      console.error(err);
      error('Failed to save trigger.');
      setRulesAndAssignmentsLoading(false);
    }
  };

  /* Save changes when editting trigger name */
  const handleSaveName = (isSaved: boolean) => {
    if (isSaved) {
      setEdittingName(false);
    } else {
      setNewTriggerName(triggerName);
      setEdittingName(false);
    }
  };

  /* Fetch trigger rules and assignments */
  React.useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  return (
    <div className={styles.triggerWrapper}>
      <button className={styles.expandIcon} onClick={() => setOpen(!isOpen)}>
        {!isOpen ? <ExpandedCellIcon /> : <DeExpandedCellIcon />}
      </button>

      <div className={styles.trigger}>
        {/* TRIGGER HEADER */}
        <BoxHeader
          className={`${styles.triggerHeader} ${!isOpen ? styles.triggerHeader__closed : ''}`}
        >
          {/* EDITTING NAME SECTION */}
          {!isEdittingName ? (
            <div className={styles.editName}>
              {newTriggerName}
              {isOpen && (
                <Icon
                  onClick={() => setEdittingName(true)}
                  name="pencil"
                  className={styles.editIcon}
                />
              )}
            </div>
          ) : (
            <div className={styles.editName}>
              <InputFilter
                label=""
                placeholder="Enter or select value..."
                value={newTriggerName}
                handleChange={(value: string) => {
                  setNewTriggerName(value);
                }}
              />
              <Icon
                name="check"
                className={styles.checkIcon}
                onClick={() => handleSaveName(true)}
              />
              <Icon
                name="close"
                className={styles.closeIcon}
                onClick={() => handleSaveName(false)}
              />
            </div>
          )}

          {/* DELETE ICON */}
          <div>
            <Icon
              name="trash alternate"
              className={styles.deleteTriggerIcon}
              onClick={() => setDeleting(true)}
            />
          </div>
        </BoxHeader>

        {/* PLACEHOLDER FOR LOADING STATE */}
        {isOpen && isRulesAndAssignmentsLoading && (
          <BoxContainer>
            <Placeholder numberRows={5} numberParagraphs={3} />
          </BoxContainer>
        )}

        {isOpen && !isRulesAndAssignmentsLoading && (
          <BoxContainer>
            <ZapierRules rules={rules} setRules={setRules} />
            <SelectionMultipleFilter
              className={styles.assignInput}
              label="Assigned To"
              filterOptions={availableKeywords}
              placeholder="Please Select"
              value={assignedKeywords}
              handleChange={(newKeywords: any[]) => {
                setAssignedKeywords(newKeywords);
              }}
              /* Only allow selection of keywords if there exist one VALID rule */
              disabled={
                rules.filter(
                  (rule: Rule) =>
                    rule.field_name !== '' && rule.condition !== '' && rule.value !== ''
                ).length === 0
              }
            />
            <ProductTable
              assignedProducts={assignedProducts}
              triggerId={triggerIndex}
              refreshData={fetchData}
            />
            <div className={styles.buttonsRow}>
              <ActionButton
                variant="reset"
                size="md"
                className={styles.resetButton}
                onClick={() => setOpen(false)}
              >
                Cancel
              </ActionButton>
              <ActionButton
                variant="secondary"
                type="purpleGradient"
                size="md"
                onClick={handleSave}
              >
                Save
              </ActionButton>
            </div>
          </BoxContainer>
        )}
      </div>

      <Confirm
        content={'Delete your trigger?'}
        open={isDeleting}
        onCancel={() => setDeleting(false)}
        onConfirm={() => {
          setDeleting(false);
          handleDeleteTrigger(triggerIndex);
        }}
      />
    </div>
  );
};

export default Trigger;
