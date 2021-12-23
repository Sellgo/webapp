import React, { useState } from 'react';
import { Confirm, Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BoxHeader from '../../../../../components/BoxHeader';
import BoxContainer from '../../../../../components/BoxContainer';
import LeadTimeSegmentTable from './LeadTimeSegmentTable';
import ActionButton from '../../../../../components/ActionButton';
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import Placeholder from '../../../../../components/Placeholder';

/* Assets */
import { ReactComponent as ExpandedCellIcon } from '../../../../../assets/images/expandCell.svg';
import { ReactComponent as DeExpandedCellIcon } from '../../../../../assets/images/deExpandCell.svg';

interface Props {
  triggerName: string;
  triggerIndex: number;
  handleDeleteTrigger: (index: number) => void;
}

const LeadTimeGroup = (props: Props) => {
  const { triggerName, triggerIndex, handleDeleteTrigger } = props;

  /* Modal State */
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  /* Trigger Name State */
  const [isEdittingName, setEdittingName] = useState<boolean>(false);
  const [newTriggerName, setNewTriggerName] = useState<string>(triggerName);

  /* Trigger assignments state */
  const [leadTimeSegments, setLeadTimeSegments] = useState<any[]>([]);

  const fetchLeadTimeSegments = async () => {
    try {
      setLeadTimeSegments([]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = () => {
    fetchLeadTimeSegments();
  };

  /* Save all changes in the trigger */
  const handleSave = async () => {
    console.log('Save');
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
              onClick={() => setIsDeleting(true)}
            />
          </div>
        </BoxHeader>

        {/* PLACEHOLDER FOR LOADING STATE */}
        {false && (
          <BoxContainer>
            <Placeholder numberRows={5} numberParagraphs={3} />
          </BoxContainer>
        )}

        {isOpen && (
          <BoxContainer>
            <LeadTimeSegmentTable
              leadTimeSegments={leadTimeSegments}
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
        content={'Delete your lead time group?'}
        open={isDeleting}
        onCancel={() => setIsDeleting(false)}
        onConfirm={() => {
          setIsDeleting(false);
          handleDeleteTrigger(triggerIndex);
        }}
      />
    </div>
  );
};

export default LeadTimeGroup;
