import React from 'react';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';
import LeadTimeBar from '../../../../../components/LeadTimeBar';

/* Interfaces */
import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';

/* Types */
import { SingleLeadTimeGroup } from '../../../../../interfaces/PerfectStock/SalesProjection';

/* Utils */
import { AppConfig } from '../../../../../config';
import { sellerIDSelector } from '../../../../../selectors/Seller';

interface Props {
  onCloseModal: () => void;
  handleNext: () => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
}

const CreateOrderSettings = (props: Props) => {
  const { onCloseModal, handleNext, createOrderPayload, setCreateOrderPayload } = props;
  const [leadTimeGroups, setLeadTimeGroups] = React.useState<SingleLeadTimeGroup[]>([]);

  /* Fetches all the lead time groups from backend */
  const fetchLeadTimeGroups = async () => {
    try {
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/purchase-orders/lead-times`
      );
      setLeadTimeGroups(data);
    } catch (err) {
      console.error(err);
    }
  };

  const leadTimeOptions = leadTimeGroups.map(leadTimeGroup => ({
    key: leadTimeGroup.id?.toString() || '',
    value: leadTimeGroup.id?.toString() || '',
    text: leadTimeGroup.name,
  }));

  /* Disable user from proceeding when any of the fields are empty */
  const isHandleNextDisabled =
    createOrderPayload.date === '' ||
    createOrderPayload.number === '' ||
    createOrderPayload.lead_time_group_id === -1;

  React.useEffect(() => {
    fetchLeadTimeGroups();
  }, []);

  return (
    <>
      <div className={styles.createOrderBox}>
        <h2>START NEW ORDER</h2>
        <div className={styles.inputField}>
          <InputFilter
            label="Project Start Date*"
            placeholder="Project Start Date"
            value={createOrderPayload.date}
            handleChange={(value: string) =>
              setCreateOrderPayload({ ...createOrderPayload, date: value })
            }
            isDate
          />
        </div>

        <div className={styles.inputField}>
          <InputFilter
            label="Order Number*"
            placeholder="Order Number"
            value={createOrderPayload.number}
            handleChange={(value: string) =>
              setCreateOrderPayload({ ...createOrderPayload, number: value })
            }
          />
        </div>
        <div className={styles.leadTimeRow}>
          <SelectionFilter
            filterOptions={leadTimeOptions}
            value={createOrderPayload.lead_time_group_id.toString()}
            handleChange={(value: string) =>
              setCreateOrderPayload({
                ...createOrderPayload,
                lead_time_group_id: parseInt(value),
              })
            }
            placeholder=""
            label="Lead Time Group*"
            className={styles.inputField}
          />
          {createOrderPayload.lead_time_group_id !== -1 && (
            <LeadTimeBar
              className={styles.leadTimeBar}
              leadTimes={
                leadTimeGroups.find(
                  leadTimeGroup => leadTimeGroup.id === createOrderPayload.lead_time_group_id
                )?.lead_times || []
              }
            />
          )}
        </div>
      </div>

      <div className={styles.buttonsRow}>
        <ActionButton
          className={styles.cancelButton}
          onClick={onCloseModal}
          variant="reset"
          size="md"
        >
          Cancel
        </ActionButton>
        <ActionButton
          className={styles.createButton}
          onClick={handleNext}
          variant="primary"
          type="purpleGradient"
          size="md"
          disabled={isHandleNextDisabled}
        >
          Next
        </ActionButton>
      </div>
    </>
  );
};

export default CreateOrderSettings;
