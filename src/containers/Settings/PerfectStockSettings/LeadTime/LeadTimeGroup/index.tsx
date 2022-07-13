import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Confirm, Icon } from 'semantic-ui-react';
import axios from 'axios';

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
import { ReactComponent as ExclaimationIcon } from '../../../../../assets/images/exclamation-triangle-solid.svg';

/* Interfaces */
import {
  LeadTime,
  SingleLeadTimeGroup,
} from '../../../../../interfaces/PerfectStock/SalesProjection';

/* Utils */
import { AppConfig } from '../../../../../config';
import { error, success } from '../../../../../utils/notifications';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { LEAD_TIME_OPTIONS } from '../../../../../constants/PerfectStock';

/* Selectors */

import { getIsFetchingProgressForTeamLeadJob } from '../../../../../selectors/PerfectStock/TeamLead';

/* Actions */
import { refreshTeamLeadProjection } from '../../../../../actions/PerfectStock/TeamLead';
interface Props {
  initialLeadTimeGroup: SingleLeadTimeGroup;
  isFetchingProgressForTeamLeadJob: boolean;
  refreshTeamLeadProjection: (perfect_stock_job_id: number) => void;
  handleDeleteLeadTimeGroup: (indexIdentifier: string) => void;
  fetchLeadTimeGroups: () => void;
  setInitialLeadTimeGroup: (value: SingleLeadTimeGroup) => void;
}

const LeadTimeGroup = (props: Props) => {
  const {
    initialLeadTimeGroup,
    handleDeleteLeadTimeGroup,
    fetchLeadTimeGroups,
    setInitialLeadTimeGroup,
    isFetchingProgressForTeamLeadJob,
    refreshTeamLeadProjection,
  } = props;
  /* Modal State */

  /* Set modal to open by default if its an new lead time */
  const [isOpen, setOpen] = useState<boolean>(initialLeadTimeGroup.id ? false : true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  /* Trigger Name State */
  const [isEditingName, setEditingName] = useState<boolean>(false);

  /* Trigger assignments state */
  const [newLeadTimeGroup, setNewLeadTimeGroup] = useState<SingleLeadTimeGroup>(
    initialLeadTimeGroup
  );

  const leadTimesWithId =
    newLeadTimeGroup.lead_times?.map((leadTime: LeadTime, index: number) => {
      leadTime.id = index;
      return leadTime;
    }) || [];

  const handleAddLeadTime = () => {
    setNewLeadTimeGroup({
      ...newLeadTimeGroup,
      lead_times: [...leadTimesWithId, { type: '', duration: 0 }],
    });
  };

  /* Save all changes in the lead time group */
  const handleSave = async (refreshUponSave?: boolean) => {
    /* Check if lead time has at least one of every step */
    let hasError = false;
    LEAD_TIME_OPTIONS.forEach(option => {
      const leadTimeStage = newLeadTimeGroup.lead_times.find(
        leadTime => leadTime.type === option.value
      );
      if (!leadTimeStage && !hasError) {
        error(`Please add at least one lead time in ${option.text}.`);
        hasError = true;
      }
    });

    if (hasError) {
      return;
    }

    if (
      !newLeadTimeGroup.lead_times ||
      newLeadTimeGroup.lead_times.length === 0 ||
      newLeadTimeGroup.lead_times.every(leadTime => leadTime.type === '')
    ) {
      error('Please add at least one valid lead time.');
      setShowError(true);
      return;
    }
    try {
      const url = `${
        AppConfig.BASE_URL_API
      }sellers/${sellerIDSelector()}/purchase-orders/lead-times`;

      let res;
      const payload = {
        ...newLeadTimeGroup,
        refresh_related_data: true,
      };
      console.log('NEW LEAD TIME GROUP >> ', payload);
      if (payload.id) {
        res = await axios.patch(url, payload);
      } else {
        res = await axios.post(url, payload);
      }

      if (res.status === 201) {
        success('Successfully updated lead times.');
        const { data } = res;
        const savedLeadTimeGroup = {
          ...newLeadTimeGroup,
          id: data.id,
        };
        if (data.perfect_stock_job_id >= 0) {
          refreshTeamLeadProjection(data.perfect_stock_job_id);
        }
        setNewLeadTimeGroup(savedLeadTimeGroup);
        setInitialLeadTimeGroup(savedLeadTimeGroup);

        if (refreshUponSave) {
          fetchLeadTimeGroups();
        }
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
    let valueToSet = value;
    if (key === 'duration') {
      valueToSet = parseInt(value, 10);
    }
    const newLeadTimes: any[] = [...newLeadTimeGroup.lead_times];
    newLeadTimes[id][key] = valueToSet;
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

  const handleSaveAsDefault = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const url = `${
        AppConfig.BASE_URL_API
      }sellers/${sellerIDSelector()}/purchase-orders/lead-times`;
      const payload = {
        ...newLeadTimeGroup,
        is_default: true,
      };
      const res = await axios.patch(url, payload);
      if (res.status === 201) {
        setNewLeadTimeGroup({
          ...newLeadTimeGroup,
          is_default: true,
        });
        success('Successfully updated lead times.');
        fetchLeadTimeGroups();
      }
    } catch (err) {
      error('Failed to save updates.');
    }
  };

  React.useEffect(() => {
    if (
      newLeadTimeGroup.lead_times &&
      newLeadTimeGroup.lead_times.length > 0 &&
      newLeadTimeGroup.lead_times.every(leadTime => leadTime.type !== '') &&
      newLeadTimeGroup.lead_times.every(leadTime => leadTime.duration && leadTime.duration >= 0)
    ) {
      setShowError(false);
    }
  }, [newLeadTimeGroup.lead_times]);

  return (
    <div className={styles.leadTimeGroupWrapper}>
      <div className={styles.leadTimeGroup}>
        {/* TRIGGER HEADER */}
        <BoxHeader
          className={`${styles.leadTimeGroupHeader} ${
            !isOpen ? styles.leadTimeGroupHeader__closed : ''
          }`}
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          {showError && <ExclaimationIcon className={styles.exclaimationIcon} />}
          {/* EDITTING NAME SECTION */}
          {!isEditingName ? (
            <div className={styles.editName}>
              {newLeadTimeGroup.name}
              {newLeadTimeGroup.is_default ? ' (Default)' : ''}
              {isOpen && (
                <Icon
                  onClick={(event: any) => {
                    event.stopPropagation();
                    setEditingName(true);
                  }}
                  name="pencil"
                  className={styles.editIcon}
                />
              )}
            </div>
          ) : (
            <div
              className={styles.editName}
              onClick={(event: any) => {
                event.stopPropagation();
              }}
            >
              <InputFilter
                label=""
                placeholder="Enter or select value..."
                value={newLeadTimeGroup.name}
                handleChange={handleLeadTimeGroupNameEdit}
              />
              <Icon
                name="check"
                className={styles.checkIcon}
                onClick={(event: any) => {
                  event.stopPropagation();
                  handleSaveName(true);
                }}
              />
              <Icon
                name="close"
                className={styles.closeIcon}
                onClick={(event: any) => {
                  event.stopPropagation();
                  handleSaveName(false);
                }}
              />
            </div>
          )}

          {/* DELETE ICON */}
          <div>
            {!newLeadTimeGroup?.is_default && newLeadTimeGroup.id && (
              <button className={styles.defaultButton} onClick={handleSaveAsDefault}>
                Set as default
              </button>
            )}
            <Icon
              name="trash alternate"
              className={styles.deleteTriggerIcon}
              onClick={(event: any) => {
                event.stopPropagation();
                setIsDeleting(true);
              }}
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
              showError={showError}
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
                disabled={isFetchingProgressForTeamLeadJob}
              >
                Cancel
              </ActionButton>
              <ActionButton
                variant="secondary"
                type="purpleGradient"
                size="md"
                onClick={() => {
                  setIsSave(true);
                }}
                disabled={showError}
                loading={isFetchingProgressForTeamLeadJob}
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
          handleDeleteLeadTimeGroup(initialLeadTimeGroup.indexIdentifier || '');
        }}
      />
      <Confirm
        content={'Are you sure you want to update the following changes?'}
        open={isSave}
        onCancel={() => setIsSave(false)}
        onConfirm={() => {
          setIsSave(false);
          handleSave();
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isFetchingProgressForTeamLeadJob: getIsFetchingProgressForTeamLeadJob(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    refreshTeamLeadProjection: (perfect_stock_job_id: number) =>
      dispatch(refreshTeamLeadProjection(perfect_stock_job_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadTimeGroup);
