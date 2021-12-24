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
import LeadTimeBar from '../../../../../components/LeadTimeBar';

/* Assets */
import { ReactComponent as ExpandedCellIcon } from '../../../../../assets/images/expandCell.svg';
import { ReactComponent as DeExpandedCellIcon } from '../../../../../assets/images/deExpandCell.svg';

/* Interfaces */
import {
  LeadTime,
  SingleLeadTimeGroup,
} from '../../../../../interfaces/PerfectStock/SalesProjection';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import axios from 'axios';
import { AppConfig } from '../../../../../config';
import { success } from '../../../../../utils/notifications';

interface Props {
  initialLeadTimeGroup: SingleLeadTimeGroup;
  handleDeleteLeadTimeGroup: (index: number) => void;
}

const LeadTimeGroup = (props: Props) => {
  const { initialLeadTimeGroup, handleDeleteLeadTimeGroup } = props;

  /* Modal State */
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  /* Trigger Name State */
  const [isEditingName, setEditingName] = useState<boolean>(false);

  /* Trigger assignments state */
  const [newLeadTimeGroup, setNewLeadTimeGroup] = useState<SingleLeadTimeGroup>(
    initialLeadTimeGroup
  );
  const leadTimesWithId = newLeadTimeGroup.lead_times.map((leadTime: LeadTime, index: number) => {
    leadTime.id = index;
    return leadTime;
  });

  const handleAddLeadTime = () => {
    setNewLeadTimeGroup({
      ...newLeadTimeGroup,
      lead_times: [...leadTimesWithId, { type: '', duration: 0 }],
    });
  };

  /* Save all changes in the lead time group */
  const handleSave = async () => {
    try {
      const url = `${
        AppConfig.BASE_URL_API
      }sellers/${sellerIDSelector()}/purchase-orders/lead-times`;

      let res;
      if (newLeadTimeGroup.id) {
        res = await axios.patch(url, newLeadTimeGroup);
      } else {
        res = await axios.post(url, newLeadTimeGroup);
      }

      if (res.status === 201) {
        success('Successfully updated lead times.');
        setOpen(false);
      }
    } catch (err) {
      console.error('Failed to save updates.');
    }
  };

  /* Save changes when editting lead time group name */
  const handleSaveName = (isSaved: boolean) => {
    if (isSaved) {
      setEditingName(false);
    } else {
      handleLeadTimeGroupNameEdit(initialLeadTimeGroup.name);
      setEditingName(false);
    }
  };

  const handleCancel = () => {
    setNewLeadTimeGroup(initialLeadTimeGroup);
    setOpen(false);
  };

  /* Hook called upon editing name of lead time group */
  const handleLeadTimeGroupNameEdit = (value: string) => {
    setNewLeadTimeGroup({
      ...newLeadTimeGroup,
      name: value,
    });
  };

  /* Hook called upon typing inside the input fields to edit the lead times inside one lead time group */
  const handleLeadTimeGroupEdit = (key: string, value: any, id: number) => {
    const newLeadTimes: any[] = [...newLeadTimeGroup.lead_times];
    newLeadTimes[id][key] = value;
    const updatedLeadTimeGroup = {
      ...newLeadTimeGroup,
      lead_times: newLeadTimes,
    };
    setNewLeadTimeGroup(updatedLeadTimeGroup);
  };

  const handleLeadTimeDelete = (id: number) => {
    const newLeadTimes: any[] = newLeadTimeGroup.lead_times.filter(
      (leadTime: LeadTime) => leadTime.id !== id
    );
    const updatedLeadTimeGroup = {
      ...newLeadTimeGroup,
      lead_times: newLeadTimes,
    };
    setNewLeadTimeGroup(updatedLeadTimeGroup);
  };

  return (
    <div className={styles.leadTimeGroupWrapper}>
      <button className={styles.expandIcon} onClick={() => setOpen(!isOpen)}>
        {!isOpen ? <ExpandedCellIcon /> : <DeExpandedCellIcon />}
      </button>

      <div className={styles.leadTimeGroup}>
        {/* TRIGGER HEADER */}
        <BoxHeader
          className={`${styles.leadTimeGroupHeader} ${
            !isOpen ? styles.leadTimeGroupHeader__closed : ''
          }`}
        >
          {/* EDITTING NAME SECTION */}
          {!isEditingName ? (
            <div className={styles.editName}>
              {newLeadTimeGroup.name}
              {isOpen && (
                <Icon
                  onClick={() => setEditingName(true)}
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
                value={newLeadTimeGroup.name}
                handleChange={handleLeadTimeGroupNameEdit}
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
            <LeadTimeBar leadTimes={leadTimesWithId} />
            <LeadTimeSegmentTable
              leadTimeSegments={leadTimesWithId}
              handleLeadTimeGroupEdit={handleLeadTimeGroupEdit}
              handleLeadTimeDelete={handleLeadTimeDelete}
            />
            <button onClick={handleAddLeadTime} className={styles.addButton}>
              {' '}
              Add Lead Time{' '}
            </button>
            <div className={styles.buttonsRow}>
              <ActionButton
                variant="reset"
                size="md"
                className={styles.resetButton}
                onClick={handleCancel}
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
        content={'Delete your lead time?'}
        open={isDeleting}
        onCancel={() => setIsDeleting(false)}
        onConfirm={() => {
          setIsDeleting(false);
          handleDeleteLeadTimeGroup(newLeadTimeGroup.id || 0);
        }}
      />
    </div>
  );
};

export default LeadTimeGroup;
