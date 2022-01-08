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
import { CreateOrderPayload } from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';

/* Actions */
import { fetchPurchaseOrders } from '../../../../actions/PerfectStock/OrderPlanning';
import { error, success } from '../../../../utils/notifications';

/* Constants */
import { CREATE_ORDER_STATUS } from '../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  open: boolean;
  onCloseModal: () => void;
  fetchPurchaseOrders: () => void;
}
const CreateOrder = (props: Props) => {
  const { open, onCloseModal } = props;
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

  // const isCreateOrderDisabled =
  //   createOrderPayload.date === '' ||
  //   createOrderPayload.number === '' ||
  //   createOrderPayload.lead_time_group_id === -1 ||
  //   createOrderPayload.merchant_listing_ids.length === 0;

  const handleCreateOrder = async () => {
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/purchase-orders`;
      const res = await axios.post(url, createOrderPayload);
      if (res.status === 201) {
        fetchPurchaseOrders();
        success('Successfully added');
        onCloseModal();
      } else {
        error('Failed to add');
      }
    } catch (err) {
      console.error(err);
      error('Failed to add');
    }
  };

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
