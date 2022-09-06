import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';
import ReplenishmentTypeSelection from './ReplenishmentTypeSelection';
import StartDateSelection from './StartDateSelection';
// import LeadTimeSelection from './LeadTimeSelection';
// import OrderCreated from './OrderCreatedSuccess';
// import OrderOptimisationSelection from './OrderOptimisationSelection';
import SkuSelection from './SkuSelection';
// import PrioritySkuSelection from './PrioritySkuSelection';
// import InventoryThresholdSelection from './InventoryThresholdSelection';
// import OrderIntervalSelection from './OrderIntervalSelection';
// import ConnectTplSelection from './ConnectTplSelection';
// import PaymentTermSelection from './PaymentTermSelection';

/* Interfaces */
import {
  CreateOrderPayload,
  PurchaseOrder,
} from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { AppConfig } from '../../../../config';
// import history from '../../../../history';

/* Actions */
import {
  fetchPurchaseOrders,
  isLoadingPurchaseOrders,
  setActivePurchaseOrder,
  setPurchaseOrdersLoadingMessage,
} from '../../../../actions/PerfectStock/OrderPlanning';
import { updateCashflowOnboardingStatus } from '../../../../actions/PerfectStock/Home';

import { error, success } from '../../../../utils/notifications';

/* Constants */

import {
  CREATE_STREAMLINE_STATUS,
  CREATE_SAMRTLINE_FLOW,
} from '../../../../constants/PerfectStock/Tpl';

/* Selectors */
import { getCashflowOnboardingStatus } from '../../../../selectors/PerfectStock/Cashflow';
import { sellerIDSelector } from '../../../../selectors/Seller';
import StartEndDateSelection from './StartEndDateSelection';
import FbaReplenishmentTemplate from './FbaReplenishmentTemplate';

interface Props {
  open: boolean;
  setIsCreatingOrder: (open: boolean) => void;
  fetchPurchaseOrders: () => void;
  setActivePurchaseOrder: (order: PurchaseOrder) => void;
  setPurchaseOrdersLoadingMessage: (message: string) => void;
  isLoadingPurchaseOrders: (loading: boolean) => void;
  cashflowOnboardingStatus: any[];
  updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) => void;
}

const CreateStreamLine = (props: Props) => {
  const {
    open,
    setIsCreatingOrder,
    fetchPurchaseOrders,
    setActivePurchaseOrder,
    setPurchaseOrdersLoadingMessage,
    isLoadingPurchaseOrders,
    cashflowOnboardingStatus,
    updateCashflowOnboardingStatus,
  } = props;

  const DEFAULT_ORDER = {
    creation_type: '',
    start_date: '',
    end_date: '',
    merchant_listings: [],
    tpl_replenishment_template_id: -1,
    tpl_packing_template_id: -1,
    order_payment_term_id: -1,
    auto_generate_orders_days: -1,
    round_up_to_nearest_carton: false,
    create_first_draft: false,
    interval: null,
    duration_months: '',
  };

  const [createStreamLinePayload, setCreateStreamLinePayload] = React.useState(DEFAULT_ORDER);
  const [isCreateOrderLoading, setIsCreateOrderLoading] = React.useState<boolean>(false);
  const [createOrderStep, setCreateOrderStep] = React.useState<number>(0);
  const [createOrderSelectedFlow, setCreateOrderSelectedFlow] = React.useState<string[]>(
    CREATE_SAMRTLINE_FLOW.SINGLE_TRANSFER
  );

  const orderPlanningOnboardingStatusId = cashflowOnboardingStatus.find(status => {
    return status.step_name === 'orders_created' && !status.is_completed;
  })?.id;

  const handleCreateOrder = async (payload: CreateOrderPayload) => {
    setIsCreateOrderLoading(true);
    isLoadingPurchaseOrders(true);
    setPurchaseOrdersLoadingMessage('Order creation in progress...');

    /* Replacing merchant_listings with merchant_listing_ids in payload */
    const merchantListings = payload.merchant_listings;
    const merchantListingIdsWithMoq = merchantListings.map((merchantListing: any) => {
      return {
        merchant_listing_id: merchantListing.id,
        moq: merchantListing.moq,
      };
    });
    payload.merchant_listings = merchantListingIdsWithMoq;
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/purchase-order-templates`;
      const res = await axios.post(url, payload);
      if (res.status === 201) {
        setActivePurchaseOrder(res.data.purchase_order);
        fetchPurchaseOrders();
        success('Successfully created smart order template.');
        setCreateOrderStep(createOrderStep + 1);

        if (orderPlanningOnboardingStatusId) {
          updateCashflowOnboardingStatus(orderPlanningOnboardingStatusId, true);
        }
      } else {
        isLoadingPurchaseOrders(false);
        setPurchaseOrdersLoadingMessage('');
        error('Failed to create new order.');
      }
    } catch (err) {
      console.error(err);
      isLoadingPurchaseOrders(false);
      setPurchaseOrdersLoadingMessage('');
      error('Failed to add');
    }
    setIsCreateOrderLoading(false);
  };

  console.log(handleCreateOrder, isCreateOrderLoading);
  /* Reset the create order flow every time user cancels/opens modal */
  React.useEffect(() => {
    const savedCreateOrderStep = localStorage.getItem('createStreamLineStep');
    const savedCreateOrderPayload = localStorage.getItem('createStreamLinePayload');
    if (savedCreateOrderStep && savedCreateOrderPayload && !open) {
      setCreateStreamLinePayload(JSON.parse(savedCreateOrderPayload));
      setCreateOrderStep(parseInt(savedCreateOrderStep));
      setIsCreatingOrder(true);
      localStorage.removeItem('createStreamLinePayload');
      localStorage.removeItem('createStreamLineStep');
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

  // const handleRedirectToDraftOrder = () => {
  //   history.push('/aistock/create-order');
  //   setIsCreatingOrder(false);
  // };

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
          // createStreamLineStep={createOrderStep}
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
      headerContent = 'SELECT START AND END REPLENISHMENT DATES';
      content = (
        <FbaReplenishmentTemplate
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createStreamLinePayload={createStreamLinePayload}
          setCreateStreamLinePayload={setCreateStreamLinePayload}
          createStreamLineStep={createOrderStep}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      break;

    case CREATE_STREAMLINE_STATUS.SELECT_SKUS:
      headerContent = 'Select SKUs';
      content = (
        <SkuSelection
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createStreamLinePayload={createStreamLinePayload}
          setCreateStreamLinePayload={setCreateStreamLinePayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      break;
    // case CREATE_STREAMLINE_STATUS.SELECT_PRIORITY_SKUS:
    //   headerContent = 'Select Priority SKUs';
    //   content = (
    //     <PrioritySkuSelection
    //       handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
    //       createStreamLinePayload={createStreamLinePayload}
    //       setCreateStreamLinePayload={setCreateStreamLinePayload}
    //       handleNext={() => setCreateOrderStep(createOrderStep + 1)}
    //     />
    //   );
    //   break;
    // case CREATE_STREAMLINE_STATUS.SELECT_INVENTORY_THRESHOLD:
    //   headerContent = 'Select Next Order Trigger';
    //   content = (
    //     <InventoryThresholdSelection
    //       handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
    //       createStreamLinePayload={createStreamLinePayload}
    //       setCreateStreamLinePayload={setCreateStreamLinePayload}
    //       handleNext={() => setCreateOrderStep(createOrderStep + 1)}
    //     />
    //   );
    //   break;
    // case CREATE_STREAMLINE_STATUS.SELECT_TIME_INTERVAL:
    //   headerContent = 'Select Interval';
    //   content = (
    //     <OrderIntervalSelection
    //       handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
    //       createStreamLinePayload={createStreamLinePayload}
    //       setCreateStreamLinePayload={setCreateStreamLinePayload}
    //       handleNext={() => setCreateOrderStep(createOrderStep + 1)}
    //     />
    //   );
    //   break;
    // case CREATE_STREAMLINE_STATUS.SELECT_START_DATE:
    //   content = (
    //     <StartDateSelection
    //       handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
    //       createStreamLinePayload={createStreamLinePayload}
    //       setCreateStreamLinePayload={setCreateStreamLinePayload}
    //       handleNext={() => setCreateOrderStep(createOrderStep + 1)}
    //     />
    //   );
    //   headerContent = 'Select 1ST ORDER DATE';
    //   break;
    // case CREATE_STREAMLINE_STATUS.SELECT_LEAD_TIME:
    //   content = (
    //     <LeadTimeSelection
    //       createOrderStep={createOrderStep}
    //       handlePrevious={() => setCreateOrderStep(createOrderStep - 1)}
    //       createStreamLinePayload={createStreamLinePayload}
    //       setCreateStreamLinePayload={setCreateStreamLinePayload}
    //       handleNext={() => setCreateOrderStep(createOrderStep + 1)}
    //     />
    //   );
    //   headerContent = 'Select LEAD TIME';
    //   break;

    // case CREATE_STREAMLINE_STATUS.SELECT_PAYMENT_TERM:
    //   content = (
    //     <PaymentTermSelection
    //       createOrderStep={createOrderStep}
    //       handlePrevious={() => setCreateOrderStep(createOrderStep - 1)}
    //       createStreamLinePayload={createStreamLinePayload}
    //       setCreateStreamLinePayload={setCreateStreamLinePayload}
    //       handleNext={() => setCreateOrderStep(createOrderStep + 1)}
    //     />
    //   );
    //   headerContent = 'Select LEAD TIME';
    //   break;

    // case CREATE_STREAMLINE_STATUS.ORDER_CREATED:
    //   content = <OrderCreated handleNext={handleRedirectToDraftOrder} />;
    //   headerContent = 'SMART ORDER TEMPLATE';
    //   break;

    // case CREATE_STREAMLINE_STATUS.SELECT_TPL:
    //   content = (
    //     <ConnectTplSelection
    //       handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
    //       createStreamLinePayload={createStreamLinePayload}
    //       setCreateStreamLinePayload={setCreateStreamLinePayload}
    //       handleCreateOrder={handleCreateOrder}
    //       isCreateOrderLoading={isCreateOrderLoading}
    //     />
    //   );
    //   headerContent = 'Select TPL';
    //   break;

    default:
      content = <div>Error</div>;
      headerContent = 'Error';
  }

  return (
    <Modal open={open} className={styles.modalWrapper} onClose={() => setIsCreatingOrder(false)}>
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

const mapStateToProps = (state: any) => ({
  cashflowOnboardingStatus: getCashflowOnboardingStatus(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPurchaseOrders: () => {
      dispatch(fetchPurchaseOrders());
    },
    setActivePurchaseOrder: (order: PurchaseOrder) => {
      dispatch(setActivePurchaseOrder(order));
    },
    isLoadingPurchaseOrders: (loading: boolean) => {
      dispatch(isLoadingPurchaseOrders(loading));
    },
    setPurchaseOrdersLoadingMessage: (message: string) => {
      dispatch(setPurchaseOrdersLoadingMessage(message));
    },
    updateCashflowOnboardingStatus: (onboardingCostId: number, newStatus: boolean) =>
      dispatch(updateCashflowOnboardingStatus(onboardingCostId, newStatus)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStreamLine);
