import React from 'react';
import { Modal } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';
import ReplenishmentTypeSelection from './ReplenishmentTypeSelection';
import StartDateSelection from './StartDateSelection';
import SkuSelection from './SkuSelection';
import StartEndDateSelection from './StartEndDateSelection';
import FbaReplenishmentTemplate from './FbaReplenishmentTemplate';
import ReplenishmentCalculations from './ReplenishmentCalculations';
import DraftSummary from './DraftSummary';
import CreateOrAutomateDraft from './CreateOrAutomateDraft';
import TplShipmentTemplates from './TplShipmentTemplates';

/* utils */
import { error } from '../../../../utils/notifications';

/* Constants */

import {
  CREATE_STREAMLINE_STATUS,
  CREATE_SAMRTLINE_FLOW,
} from '../../../../constants/PerfectStock/Tpl';

/* APIs */
import { createStreamLine } from '../../../../libs/api/tpl/inboundShipping';
interface Props {
  open: boolean;
  setIsCreatingOrder: (open: boolean) => void;
}

const CreateStreamLine = (props: Props) => {
  const { open, setIsCreatingOrder } = props;

  const DEFAULT_ORDER = {
    creation_type: '',
    start_date: '',
    end_date: '',
    merchant_listings: [],
    tpl_replenishment_template_id: -1,
    tpl_packing_template_id: -1,
    round_up_to_nearest_carton: false,
    create_first_draft: false,
    interval: null,
    duration_months: '',
  };

  const [createStreamLinePayload, setCreateStreamLinePayload] = React.useState(DEFAULT_ORDER);
  const [createOrderStep, setCreateOrderStep] = React.useState<number>(0);
  const [createOrderSelectedFlow, setCreateOrderSelectedFlow] = React.useState<string[]>(
    CREATE_SAMRTLINE_FLOW.SINGLE_TRANSFER
  );
  const [createStreamLineResponse, setCreateStreamLineResponse] = React.useState<any>();
  const [vendorId, setVendorId] = React.useState<number>(-1);

  const handleCreateStreamLine = async (value: boolean) => {
    const payload = {
      ...createStreamLinePayload,
      create_first_draft: value,
    };
    const response = await createStreamLine(payload);
    if (response?.hasError) {
      error(response?.err);
    }
    setCreateStreamLineResponse(response?.data);
    setCreateOrderStep(createOrderStep + 1);
  };

  const setActiveVendorId = (value: number | undefined) => {
    if (value) setVendorId(value);
  };

  /* Reset the create order flow every time user cancels/opens modal */
  React.useEffect(() => {
    const savedCreateOrderStep = localStorage.getItem('createStreamLineStep');
    const savedCreateOrderPayload = localStorage.getItem('createStreamLinePayload');
    const savedVendorId = localStorage.getItem('createStreamLinePayloadVendorId');
    if (savedCreateOrderStep && savedCreateOrderPayload && !open) {
      setCreateStreamLinePayload(JSON.parse(savedCreateOrderPayload));
      setCreateOrderStep(parseInt(savedCreateOrderStep));
      setVendorId(Number(savedVendorId));
      setIsCreatingOrder(true);
      localStorage.removeItem('createStreamLinePayload');
      localStorage.removeItem('createStreamLineStep');
      localStorage.removeItem('createStreamLinePayloadVendorId');
      return;
    } else if (!open) {
      setCreateStreamLinePayload(DEFAULT_ORDER);
      setCreateOrderStep(0);
    }
  }, [open]);

  React.useEffect(() => {
    if (createStreamLinePayload.creation_type === 'single') {
      setCreateOrderSelectedFlow(CREATE_SAMRTLINE_FLOW.SINGLE_TRANSFER);
    } else if (createStreamLinePayload.creation_type === 'multiple') {
      setCreateOrderSelectedFlow(CREATE_SAMRTLINE_FLOW.SMART_STREAMLINE_MULTIPLE);
    }
  }, [createStreamLinePayload.creation_type]);

  let content: JSX.Element;
  let headerContent: string;

  const currentStep = createOrderSelectedFlow[createOrderStep];
  switch (currentStep) {
    case CREATE_STREAMLINE_STATUS.SELECT_REPLENISHMENT_TYPE:
      headerContent = 'REPLENISHMENT TYPE';
      content = (
        <ReplenishmentTypeSelection
          onCloseModal={() => setIsCreatingOrder(false)}
          createStreamLinePayload={createStreamLinePayload}
          setCreateStreamLinePayload={setCreateStreamLinePayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      break;

    case CREATE_STREAMLINE_STATUS.SELECT_START_DATE:
      headerContent = 'SELECT START REPLENISHMENT DATE';
      content = (
        <StartDateSelection
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createStreamLinePayload={createStreamLinePayload}
          setCreateStreamLinePayload={setCreateStreamLinePayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      break;

    case CREATE_STREAMLINE_STATUS.SELECT_START_END_DATE:
      headerContent = 'SELECT START AND END REPLENISHMENT DATES';
      content = (
        <StartEndDateSelection
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createStreamLinePayload={createStreamLinePayload}
          setCreateStreamLinePayload={setCreateStreamLinePayload}
          // createStreamLineStep={createOrderStep}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      break;

    case CREATE_STREAMLINE_STATUS.SELECT_FBA_REPLENISHMENT_TEMPLATE:
      headerContent = 'SELECT FBA REPLENISHMENT TEMPLATE';
      content = (
        <FbaReplenishmentTemplate
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createStreamLinePayload={createStreamLinePayload}
          setCreateStreamLinePayload={setCreateStreamLinePayload}
          createStreamLineStep={createOrderStep}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
          setVendorId={value => setActiveVendorId(value)}
        />
      );
      break;

    case CREATE_STREAMLINE_STATUS.SELECT_SKUS:
      headerContent = 'CHOOSE SKU';
      content = (
        <SkuSelection
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createStreamLinePayload={createStreamLinePayload}
          setCreateStreamLinePayload={setCreateStreamLinePayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
          vendorId={vendorId}
        />
      );
      break;

    case CREATE_STREAMLINE_STATUS.SELECT_SHIPMENT_TEMPLATE:
      headerContent = 'SELECT SHIPMENT PREP TEMPLATE';
      content = (
        <TplShipmentTemplates
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createStreamLinePayload={createStreamLinePayload}
          setCreateStreamLinePayload={setCreateStreamLinePayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
          createStreamLineStep={createOrderStep}
          vendorId={vendorId}
        />
      );
      break;

    case CREATE_STREAMLINE_STATUS.SELECT_QUANTITY:
      headerContent = 'CALCULATE REPLENISHMENT QUANTITY';
      content = (
        <ReplenishmentCalculations
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createStreamLinePayload={createStreamLinePayload}
          setCreateStreamLinePayload={setCreateStreamLinePayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
          vendorId={vendorId}
        />
      );
      break;

    case CREATE_STREAMLINE_STATUS.CREATE_AUTOMATE_DRAFT:
      headerContent = 'CREATE OR AUTOMATE DRAFT';
      content = (
        <CreateOrAutomateDraft
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createStreamLinePayload={createStreamLinePayload}
          setCreateStreamLinePayload={setCreateStreamLinePayload}
          handleCreateStreamLine={(value: boolean) => handleCreateStreamLine(value)}
        />
      );
      break;

    case CREATE_STREAMLINE_STATUS.DRAFT_SUMMARY:
      headerContent = 'SUMMARY';
      content = (
        <DraftSummary
          createStreamLinePayload={createStreamLinePayload}
          createDraftSummary={createStreamLineResponse}
          handleClose={() => setIsCreatingOrder(false)}
        />
      );
      break;

    default:
      content = <div>Error</div>;
      headerContent = 'Error';
  }

  return (
    <Modal
      closeIcon
      open={open}
      className={styles.modalWrapper}
      onClose={() => setIsCreatingOrder(false)}
      closeOnEscape={false}
      closeOnDimmerClick={false}
    >
      <div>
        <BoxHeader>{headerContent}</BoxHeader>
        <BoxContainer className={styles.createOrderContent}>{content}</BoxContainer>
        {/* <BoxFooter>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.youtubeLink}
          >
            <YoutubeLogo />
            &nbsp;How to Create Order | 1-min watch
          </a>
        </BoxFooter> */}
      </div>
    </Modal>
  );
};

export default CreateStreamLine;
