import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';
import StartDateSelection from './StartDateSelection';
import LeadTimeSelection from './LeadTimeSelection';
import OrderCreated from './OrderCreatedSuccess';
import OrderTypeSelection from './OrderTypeSelection';
import OrderOptimisationSelection from './OrderOptimisationSelection';
import SkuSelection from './SkuSelection';
import PrioritySkuSelection from './PrioritySkuSelection';
import InventoryThresholdSelection from './InventoryThresholdSelection';
import OrderIntervalSelection from './OrderIntervalSelection';
import ConnectTplSelection from './ConnectTplSelection';
import PaymentTermSelection from './PaymentTermSelection';

/* Interfaces */
import {
  CreateOrderPayload,
  PurchaseOrder,
} from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { AppConfig } from '../../../../config';
import history from '../../../../history';

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
  CREATE_ORDER_STATUS,
  CREATE_ORDER_FLOW,
} from '../../../../constants/PerfectStock/OrderPlanning';

/* Selectors */
import { getCashflowOnboardingStatus } from '../../../../selectors/PerfectStock/Cashflow';
import { sellerIDSelector } from '../../../../selectors/Seller';

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

const CreateOrder = (props: Props) => {
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

  const DEFAULT_ORDER: CreateOrderPayload = {
    creation_type: '',
    merchant_listings: [],
    lead_time_group_id: -1,
    order_payment_term_id: -1,
    approach: 'inventory',
    auto_generate_orders_days: -1,
  };

  const [createOrderPayload, setCreateOrderPayload] = React.useState<CreateOrderPayload>(
    DEFAULT_ORDER
  );
  const [isCreateOrderLoading, setIsCreateOrderLoading] = React.useState<boolean>(false);
  const [createOrderStep, setCreateOrderStep] = React.useState<number>(0);
  const [createOrderSelectedFlow, setCreateOrderSelectedFlow] = React.useState<string[]>(
    CREATE_ORDER_FLOW.SINGLE_ORDER
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

  /* Reset the create order flow every time user cancels/opens modal */
  React.useEffect(() => {
    const savedCreateOrderStep = localStorage.getItem('createOrderStep');
    const savedCreateOrderPayload = localStorage.getItem('createOrderPayload');
    if (savedCreateOrderStep && savedCreateOrderPayload && !open) {
      setCreateOrderPayload(JSON.parse(savedCreateOrderPayload));
      setCreateOrderStep(parseInt(savedCreateOrderStep));
      setIsCreatingOrder(true);
      localStorage.removeItem('createOrderPayload');
      localStorage.removeItem('createOrderStep');
      return;
    } else if (!open) {
      setCreateOrderPayload(DEFAULT_ORDER);
      setCreateOrderStep(0);
    }
  }, [open]);

  React.useEffect(() => {
    if (createOrderPayload.creation_type === 'single') {
      setCreateOrderSelectedFlow(CREATE_ORDER_FLOW.SINGLE_ORDER);
    } else if (
      createOrderPayload.creation_type === 'multiple' &&
      createOrderPayload.approach === 'inventory'
    ) {
      setCreateOrderSelectedFlow(CREATE_ORDER_FLOW.SMART_ORDER_INVENTORY);
    } else if (
      createOrderPayload.creation_type === 'multiple' &&
      createOrderPayload.approach === 'timebound'
    ) {
      setCreateOrderSelectedFlow(CREATE_ORDER_FLOW.SMART_ORDER_TIME);
    } else if (
      createOrderPayload.creation_type === 'multiple' &&
      createOrderPayload.approach === 'moq'
    ) {
      setCreateOrderSelectedFlow(CREATE_ORDER_FLOW.SMART_ORDER_MOQ);
    }
  }, [createOrderPayload.creation_type, createOrderPayload.approach]);

  const handleRedirectToDraftOrder = () => {
    history.push('/aistock/create-order');
    setIsCreatingOrder(false);
  };

  let content: JSX.Element;
  let headerContent: string;

  const currentStep = createOrderSelectedFlow[createOrderStep];
  switch (currentStep) {
    case CREATE_ORDER_STATUS.SELECT_ORDER_TYPE:
      headerContent = 'Select order type';
      content = (
        <OrderTypeSelection
          onCloseModal={() => setIsCreatingOrder(false)}
          createOrderPayload={createOrderPayload}
          setCreateOrderPayload={setCreateOrderPayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      break;

    case CREATE_ORDER_STATUS.SELECT_OPTIMISATION_TYPE:
      headerContent = 'Select optimization type';
      content = (
        <OrderOptimisationSelection
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createOrderPayload={createOrderPayload}
          setCreateOrderPayload={setCreateOrderPayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      break;

    case CREATE_ORDER_STATUS.SELECT_SKUS:
      headerContent = 'Select SKUs';
      content = (
        <SkuSelection
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createOrderPayload={createOrderPayload}
          setCreateOrderPayload={setCreateOrderPayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      break;
    case CREATE_ORDER_STATUS.SELECT_PRIORITY_SKUS:
      headerContent = 'Select Priority SKUs';
      content = (
        <PrioritySkuSelection
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createOrderPayload={createOrderPayload}
          setCreateOrderPayload={setCreateOrderPayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      break;
    case CREATE_ORDER_STATUS.SELECT_INVENTORY_THRESHOLD:
      headerContent = 'Select Next Order Trigger';
      content = (
        <InventoryThresholdSelection
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createOrderPayload={createOrderPayload}
          setCreateOrderPayload={setCreateOrderPayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      break;
    case CREATE_ORDER_STATUS.SELECT_TIME_INTERVAL:
      headerContent = 'Select Interval';
      content = (
        <OrderIntervalSelection
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createOrderPayload={createOrderPayload}
          setCreateOrderPayload={setCreateOrderPayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      break;
    case CREATE_ORDER_STATUS.SELECT_START_DATE:
      content = (
        <StartDateSelection
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createOrderPayload={createOrderPayload}
          setCreateOrderPayload={setCreateOrderPayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      headerContent = 'Select 1st Order Date';
      break;
    case CREATE_ORDER_STATUS.SELECT_LEAD_TIME:
      content = (
        <LeadTimeSelection
          createOrderStep={createOrderStep}
          handlePrevious={() => setCreateOrderStep(createOrderStep - 1)}
          createOrderPayload={createOrderPayload}
          setCreateOrderPayload={setCreateOrderPayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      headerContent = 'Select Lead Time';
      break;

    case CREATE_ORDER_STATUS.SELECT_PAYMENT_TERM:
      content = (
        <PaymentTermSelection
          createOrderStep={createOrderStep}
          handlePrevious={() => setCreateOrderStep(createOrderStep - 1)}
          createOrderPayload={createOrderPayload}
          setCreateOrderPayload={setCreateOrderPayload}
          handleNext={() => setCreateOrderStep(createOrderStep + 1)}
        />
      );
      headerContent = 'Select Payment Term';
      break;

    case CREATE_ORDER_STATUS.ORDER_CREATED:
      content = <OrderCreated handleNext={handleRedirectToDraftOrder} />;
      headerContent = 'SMART ORDER TEMPLATE';
      break;

    case CREATE_ORDER_STATUS.SELECT_TPL:
      content = (
        <ConnectTplSelection
          handlePrev={() => setCreateOrderStep(createOrderStep - 1)}
          createOrderPayload={createOrderPayload}
          setCreateOrderPayload={setCreateOrderPayload}
          handleCreateOrder={handleCreateOrder}
          isCreateOrderLoading={isCreateOrderLoading}
        />
      );
      headerContent = 'Select 3rd Party Logistic Warehouse';
      break;

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
