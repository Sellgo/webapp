import React from 'react';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
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
  handlePrevious: () => void;
  handleNext: () => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
}

const LeadTimeSelection = (props: Props) => {
  const { handlePrevious, handleNext, createOrderPayload, setCreateOrderPayload } = props;
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
    createOrderPayload.date === '' || createOrderPayload.lead_time_group_id === -1;

  React.useEffect(() => {
    fetchLeadTimeGroups();
  }, []);

  const [isCreatingOrder, setIsCreatingOrder] = React.useState(false);

  const onOrderCreate = () => {
    setIsCreatingOrder(true);
    handleNext();
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>Please Select Lead Time*</h2>
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
          label=""
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
            showDates
            startDate={createOrderPayload.date}
          />
        )}
      </div>

      <div className={styles.buttonsRow}>
        <ActionButton
          className={styles.cancelButton}
          onClick={handlePrevious}
          variant="reset"
          size="md"
        >
          Previous
        </ActionButton>
        <ActionButton
          className={styles.createButton}
          onClick={onOrderCreate}
          variant="secondary"
          type="purpleGradient"
          size="md"
          disabled={isHandleNextDisabled}
          loading={isCreatingOrder}
        >
          Submit
        </ActionButton>
      </div>
    </div>
  );
};

export default LeadTimeSelection;
