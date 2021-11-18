import React, { useState } from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ProfileBoxHeader from '../../../../components/ProfileBoxHeader';
import ProfileBoxContainer from '../../../../components/ProfileBoxContainer';
import ProductTable from './ProductTable';
import ActionButton from '../../../../components/ActionButton';
import SelectionMultipleFilter from '../../../../components/FormFilters/SelectionMultipleFilter';
import Placeholder from '../../../../components/Placeholder';

/* Assets */
import { ReactComponent as ExpandedCellIcon } from '../../../../assets/images/expandCell.svg';
import { ReactComponent as DeExpandedCellIcon } from '../../../../assets/images/deExpandCell.svg';

/* Types */
import { Rule, SelectionKeyword } from '../../../../interfaces/KeywordResearch/Zapier';

/* Utils */
import { AppConfig } from '../../../../config';
import { truncateString } from '../../../../utils/format';
import { error, success } from '../../../../utils/notifications';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import ZapierRules from './ZapierRules';

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

  const [isRulesAndAssignmentsLoading, setRulesAndAssignmentsLoading] = useState<boolean>(true);

  const handleSaveName = (isSaved: boolean) => {
    if (isSaved) {
      setEdittingName(false);
    } else {
      setNewTriggerName(triggerName);
      setEdittingName(false);
    }
  };

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
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/keyword-track-by-seller`
      );
      const availableKeywords: any[] = [];
      const assignedKeywords: any[] = [];
      data.map((keyword: SelectionKeyword) => {
        if (keyword.is_assigned) {
          assignedKeywords.push(keyword.keyword_track_id);

          availableKeywords.push({
            key: keyword.phrase,
            value: keyword.keyword_track_id,
            text: `${keyword.phrase} - ${truncateString(keyword.title, 50)}`,
          });
        } else {
          availableKeywords.push({
            key: keyword.phrase,
            value: keyword.keyword_track_id,
            text: `${keyword.phrase} - ${truncateString(keyword.title, 50)}`,
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
        fetchRulesAndAssignments();
        fetchAvailableKeywords();
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

  /* Fetch trigger rules and assignments */
  React.useEffect(() => {
    if (isOpen) {
      fetchRulesAndAssignments();
      fetchAvailableKeywords();
    }
  }, [isOpen]);

  return (
    <div className={styles.triggerWrapper}>
      <button className={styles.expandIcon} onClick={() => setOpen(!isOpen)}>
        {!isOpen ? <ExpandedCellIcon /> : <DeExpandedCellIcon />}
      </button>

      <div className={styles.ruleWrapper}>
        {/* TRIGGER HEADER */}
        <ProfileBoxHeader
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
              className={styles.headerIcon}
              onClick={() => handleDeleteTrigger(triggerIndex)}
            />
          </div>
        </ProfileBoxHeader>

        {/* PLACEHOLDER FOR LOADING STATE */}
        {isOpen && isRulesAndAssignmentsLoading && (
          <ProfileBoxContainer>
            <Placeholder numberRows={5} numberParagraphs={3} />
          </ProfileBoxContainer>
        )}

        {isOpen && !isRulesAndAssignmentsLoading && (
          <ProfileBoxContainer>
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
            />
            <ProductTable
              assignedProducts={assignedProducts}
              triggerId={triggerIndex}
              refreshData={fetchRulesAndAssignments}
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
          </ProfileBoxContainer>
        )}
      </div>
    </div>
  );
};

export default Trigger;
