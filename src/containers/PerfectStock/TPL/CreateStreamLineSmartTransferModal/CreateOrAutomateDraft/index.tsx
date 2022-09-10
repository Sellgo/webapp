import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';

/* Interfaces */
// import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { error } from '../../../../../utils/notifications';
import { fetchPerfectStockConfig } from '../../../../../libs/api/perfectStock/config';

interface Props {
  handlePrev: () => void;
  handleCreateStreamLine: (value: boolean) => void;
  createStreamLinePayload: any;
  setCreateStreamLinePayload: (payload: any) => void;
}

const CreateOrAutomateDraft = (props: Props) => {
  const {
    handlePrev,
    createStreamLinePayload,
    setCreateStreamLinePayload,
    handleCreateStreamLine,
  } = props;
  const [isInboundDueGreater, setIsInboundDueGreater] = React.useState<boolean>(false);
  const handleStreamLineSubmit = (value: boolean) => {
    setCreateStreamLinePayload({
      ...createStreamLinePayload,
      create_first_draft: value,
    });
    handleCreateStreamLine(value);
  };
  const getInboundDue = async () => {
    const perfectStockConfig = await fetchPerfectStockConfig();
    if (perfectStockConfig?.hasError) {
      error(perfectStockConfig.err);
      return;
    }
    const inboundDays = perfectStockConfig?.data.inbound_buffer_days;
    const startDate = new Date(createStreamLinePayload.start_date.replace(/-/g, '/'));
    const tempDate = new Date(startDate.getTime() - Number(inboundDays) * 24 * 60 * 60 * 1000);
    console.log(tempDate, startDate);
    const today = new Date();
    if (today >= tempDate) {
      setIsInboundDueGreater(false);
    } else {
      setIsInboundDueGreater(true);
    }
  };
  React.useEffect(() => {
    getInboundDue();
  });
  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        {isInboundDueGreater ? (
          <>
            <h3>Your next FBA inbound will due in … days,</h3>
            <h3>would you like to create draft now?</h3>
          </>
        ) : (
          <>
            <h3>Your next FBA inbound is overdue,</h3>
            <h3>would you like to create draft now?</h3>
          </>
        )}
        <div className={styles.inputBox}>
          {isInboundDueGreater ? (
            <ActionButton
              className={styles.createButton}
              onClick={() => handleStreamLineSubmit(false)}
              variant="secondary"
              type="purpleGradient"
              size="md"
            >
              Create a draft now
            </ActionButton>
          ) : (
            <ActionButton
              className={styles.cancelButton}
              onClick={handlePrev}
              variant="reset"
              size="md"
            >
              Back
            </ActionButton>
          )}
          <ActionButton
            className={styles.createButton}
            onClick={() => handleStreamLineSubmit(isInboundDueGreater ? true : false)}
            variant="primary"
            type="purpleGradient"
            size="md"
          >
            {isInboundDueGreater ? 'Automate' : 'Create first darft now'}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default CreateOrAutomateDraft;
