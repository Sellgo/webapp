import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';
import CreateOrderSettings from './CreateOrderSettings';
import AssignProductsTable from './AssignProductsTable';

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
  fetchInventoryTable,
  fetchPurchaseOrders,
  setActivePurchaseOrder,
  setInventoryTableShowAllSkus,
} from '../../../../actions/PerfectStock/OrderPlanning';
import { error, success } from '../../../../utils/notifications';

/* Constants */
import { CREATE_ORDER_STATUS } from '../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  open: boolean;
  onCloseModal: () => void;
  fetchPurchaseOrders: () => void;
  fetchInventoryTable: () => void;
  setActivePurchaseOrder: (order: PurchaseOrder) => void;
  setInventoryTableShowAllSkus: (showAllSkus: boolean) => void;
}

const CreateOrder = (props: Props) => {
  const {
    open,
    onCloseModal,
    fetchPurchaseOrders,
    fetchInventoryTable,
    setActivePurchaseOrder,
    setInventoryTableShowAllSkus,
  } = props;
  const DEFAULT_ORDER: CreateOrderPayload = {
    date: '',
    number: '',
    lead_time_group_id: -1,
    merchant_listing_ids: [],
  };

  const [createOrderPayload, setCreateOrderPayload] = React.useState<CreateOrderPayload>(
    DEFAULT_ORDER
  );
  const [createOrderStatus, setCreateOrderStatus] = React.useState<number>(
    CREATE_ORDER_STATUS.CREATE_ORDER_SETTINGS
  );

  const handleCreateOrder = async () => {
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/purchase-orders`;
      const res = await axios.post(url, createOrderPayload);
      if (res.status === 201) {
        fetchPurchaseOrders();

        /* Upon creating a new order, set the display mode in inventory table to view the newly created order */
        fetchInventoryTable();
        setInventoryTableShowAllSkus(false);
        setActivePurchaseOrder(res.data);
        success('Successfully added');
        onCloseModal();
      } else {
        error('Failed to create new order');
      }
    } catch (err) {
      console.error(err);
      error('Failed to add');
    }
  };

  /* Reset the create order flow everytime user cancels/opens modal*/
  React.useEffect(() => {
    setCreateOrderPayload(DEFAULT_ORDER);
    setCreateOrderStatus(CREATE_ORDER_STATUS.CREATE_ORDER_SETTINGS);
  }, [open]);

  return (
    <Modal open={open} className={styles.modalWrapper} onClose={onCloseModal}>
      <div>
        <BoxHeader>CREATE ORDER</BoxHeader>
        <BoxContainer className={styles.createOrderContent}>
          {createOrderStatus === CREATE_ORDER_STATUS.CREATE_ORDER_SETTINGS ? (
            <CreateOrderSettings
              onCloseModal={onCloseModal}
              createOrderPayload={createOrderPayload}
              setCreateOrderPayload={setCreateOrderPayload}
              handleNext={() => setCreateOrderStatus(createOrderStatus + 1)}
            />
          ) : (
            <AssignProductsTable
              handleSubmit={handleCreateOrder}
              onCloseModal={onCloseModal}
              createOrderPayload={createOrderPayload}
              setCreateOrderPayload={setCreateOrderPayload}
              handleBack={() => setCreateOrderStatus(createOrderStatus - 1)}
            />
          )}
        </BoxContainer>
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
    fetchInventoryTable: () => {
      dispatch(fetchInventoryTable());
    },
    setActivePurchaseOrder: (order: PurchaseOrder) => {
      dispatch(setActivePurchaseOrder(order));
    },
    setInventoryTableShowAllSkus: (showAllSkus: boolean) => {
      dispatch(setInventoryTableShowAllSkus(showAllSkus));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
