import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
interface Props {
  handleClose: () => void;
  createStreamLinePayload: any;
  createDraftSummary: any;
}

const DraftSummary = (props: Props) => {
  const { createStreamLinePayload, handleClose, createDraftSummary } = props;

  const handleSubmit = () => {
    const shipmentId = createDraftSummary?.shipment_id;
    if (createStreamLinePayload.create_first_draft) {
      handleClose();
    } else {
      window.open(
        // eslint-disable-next-line max-len
        `https://sellercentral.amazon.com/gp/fba/inbound-shipment-workflow/index.html/ref=ag_fbaisw_btn_fbasqs#${shipmentId}/prepare`,
        '_blank'
      );
    }
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h3>Summary of future FBA inbound draft</h3>
        <div className={styles.inputBox}>
          <div className={styles.firstContextBox}>
            <div className={styles.contentDetailBox}>
              <p className={styles.title}>Shipment Name/ ID</p>
              <p className={styles.content}>
                <span className={styles.subTitle}>Name: </span>
                <span className={styles.text}>{createDraftSummary?.ship_name}</span>
              </p>
              <p className={styles.content}>
                <span className={styles.subTitle}>ID: </span>
                <span className={styles.text}>{createDraftSummary?.shipment_id}</span>
              </p>
              <p className={styles.content}>
                <span className={styles.subTitle}>Amazon Reference ID:</span>
                <span className={styles.text}>NA</span>
              </p>
            </div>
            <div className={styles.contentDetailBox}>
              <p className={styles.title}>Ship From</p>
              <p className={styles.text}>{createDraftSummary?.from_address}</p>
              {/* <p className={styles.text}>{createDraftSummary?.from_city}</p> */}
              <p className={styles.text}>
                {createDraftSummary?.from_state},{createDraftSummary?.from_city}{' '}
                {createDraftSummary?.from_zip_code}
              </p>
              <p className={styles.text}>{createDraftSummary?.from_country}</p>
            </div>
            <div className={styles.contentDetailBox}>
              <p className={styles.title}>Ship To</p>
              <p className={styles.text}>{createDraftSummary?.ship_address_line_1}</p>
              <p className={styles.text}>{createDraftSummary?.ship_address_line_2}</p>
              <p className={styles.text}>
                {createDraftSummary?.ship_state},{createDraftSummary?.ship_city}{' '}
                {createDraftSummary?.ship_postal_code}
              </p>
              <p className={styles.text}>{createDraftSummary?.ship_country_code}</p>
            </div>
          </div>
          <div className={styles.secondContextBox}>
            <div className={styles.contentDetailBox}>
              <p className={styles.title}>Shipment Contents</p>
              <p className={styles.text}>{createDraftSummary?.mskus} MSKUs</p>
              <p className={styles.text}>{createDraftSummary?.units} Units</p>
            </div>

            <div className={styles.contentDetailBox}>
              <p className={styles.title}>Shipping Status</p>
              <p className={styles.text}>{createDraftSummary?.shipment_status}</p>
              <p className={styles.content}>
                <span className={styles.subTitle}>Created: </span>
                <span className={styles.text}>{createDraftSummary?.cdate.split('T')[0]}</span>
              </p>
              <p className={styles.content}>
                <span className={styles.subTitle}>Updated: </span>
                <span className={styles.text}>{createDraftSummary?.udate.split('T')[0]}</span>
              </p>
            </div>
            <div className={styles.contentDetailBox} />
          </div>
        </div>
      </div>
      <div className={styles.buttonsRow}>
        {!createStreamLinePayload.create_first_draft && (
          <ActionButton
            className={styles.cancelButton}
            onClick={handleClose}
            variant="reset"
            size="md"
          >
            Finalize Later
          </ActionButton>
        )}
        <ActionButton
          className={styles.createButton}
          onClick={handleSubmit}
          variant="secondary"
          type="purpleGradient"
          size="md"
        >
          {createStreamLinePayload.create_first_draft ? 'Done' : 'Finalize first draft now'}
        </ActionButton>
      </div>
    </div>
  );
};

export default DraftSummary;
