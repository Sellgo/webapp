import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';
// import BoxFooter from '../../../../components/BoxFooter';
import StartDateSelection from './StartDateSelection';
import LeadTimeSelection from './LeadTimeSelection';
import OrderCreated from './OrderCreatedSuccess';
// import { ReactComponent as YoutubeLogo } from '../../../../assets/images/youtubeLogo.svg';

/* Interfaces */
import {
  CreateOrderPayload,
  PurchaseOrder,
} from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';

/* Actions */
import {
  fetchPurchaseOrders,
  isLoadingPurchaseOrders,
  setActivePurchaseOrder,
  setPurchaseOrdersLoadingMessage,
} from '../../../../actions/PerfectStock/OrderPlanning';
import { error, success } from '../../../../utils/notifications';

/* Constants */
import { CREATE_ORDER_STATUS } from '../../../../constants/PerfectStock/OrderPlanning';
import history from '../../../../history';

interface Props {
  open: boolean;
  onCloseModal: () => void;
  fetchPurchaseOrders: () => void;
  setActivePurchaseOrder: (order: PurchaseOrder) => void;
  setPurchaseOrdersLoadingMessage: (message: string) => void;
  isLoadingPurchaseOrders: (loading: boolean) => void;
}

const CreateOrder = (props: Props) => {
  const {
    open,
    onCloseModal,
    fetchPurchaseOrders,
    setActivePurchaseOrder,
    setPurchaseOrdersLoadingMessage,
    isLoadingPurchaseOrders,
  } = props;

  const DEFAULT_ORDER: CreateOrderPayload = {
    date: '',
    lead_time_group_id: -1,
    approach: 'inventory',
    auto_generate_orders_days: -1,
  };

  const [createOrderPayload, setCreateOrderPayload] = React.useState<CreateOrderPayload>(
    DEFAULT_ORDER
  );
  const [createOrderStatus, setCreateOrderStatus] = React.useState<number>(
    CREATE_ORDER_STATUS.SELECT_START_DATE
  );

  const handleCreateOrder = async () => {
    isLoadingPurchaseOrders(true);
    setPurchaseOrdersLoadingMessage('Order creation in progress...');
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/purchase-order-templates`;
      const res = await axios.post(url, createOrderPayload);
      if (res.status === 201) {
        setActivePurchaseOrder(res.data.purchase_order);
        fetchPurchaseOrders();
        success('Successfully created smart order template.');
        setCreateOrderStatus(createOrderStatus + 1);
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
  };

  /* Reset the create order flow every time user cancels/opens modal*/
  React.useEffect(() => {
    setCreateOrderPayload(DEFAULT_ORDER);
    setCreateOrderStatus(CREATE_ORDER_STATUS.SELECT_START_DATE);
  }, [open]);

  const handleRedirectToDraftOrder = () => {
    history.push('/aistock/create-order');
    onCloseModal();
  };

  let content: JSX.Element;
  let headerContent: string;
  switch (createOrderStatus) {
    case CREATE_ORDER_STATUS.SELECT_START_DATE:
      content = (
        <StartDateSelection
          onCloseModal={onCloseModal}
          createOrderPayload={createOrderPayload}
          setCreateOrderPayload={setCreateOrderPayload}
          handleNext={() => setCreateOrderStatus(createOrderStatus + 1)}
        />
      );
      headerContent = '1ST ORDER DATE';
      break;
    case CREATE_ORDER_STATUS.SELECT_LEAD_TIME:
      content = (
        <LeadTimeSelection
          handlePrevious={() => setCreateOrderStatus(createOrderStatus - 1)}
          createOrderPayload={createOrderPayload}
          setCreateOrderPayload={setCreateOrderPayload}
          handleNext={handleCreateOrder}
        />
      );
      headerContent = 'LEAD TIME';
      break;

    case CREATE_ORDER_STATUS.ORDER_CREATION_SUCCESS:
      content = <OrderCreated handleNext={handleRedirectToDraftOrder} />;
      headerContent = 'SMART ORDER TEMPLATE';
      break;

    default:
      content = <div>Error</div>;
      headerContent = 'Error';
  }

  return (
    <Modal open={open} className={styles.modalWrapper} onClose={onCloseModal}>
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

const mapStateToProps = () => ({});

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
