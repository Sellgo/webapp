import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';

/* Assets */
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';

/* Interfaces */
import { CreateOrderPayload } from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';
import InputFilter from '../../../../components/FormFilters/InputFilter';
import { SingleLeadTimeGroup } from '../../../../interfaces/PerfectStock/SalesProjection';
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';
import LeadTimeBar from '../../../../components/LeadTimeBar';
import SelectionMultipleFilter from '../../../../components/FormFilters/SelectionMultipleFilter';
import { truncateString } from '../../../../utils/format';
import { error, success } from '../../../../utils/notifications';
import { fetchPurchaseOrders } from '../../../../actions/PerfectStock/OrderPlanning';

interface Props {
  open: boolean;
  onCloseModal: () => void;
  fetchPurchaseOrders: () => void;
}
const CreateOrder = (props: Props) => {
  const { open, onCloseModal, fetchPurchaseOrders } = props;
  const DEFAULT_ORDER: CreateOrderPayload = {
    date: '',
    number: '',
    lead_time_group_id: -1,
    merchant_listing_ids: [],
  };

  const [createOrderPayload, setCreateOrderPayload] = React.useState<CreateOrderPayload>(
    DEFAULT_ORDER
  );
  const [leadTimeGroups, setLeadTimeGroups] = React.useState<SingleLeadTimeGroup[]>([]);
  const [orderProducts, setOrderProducts] = React.useState<any>([]);

  const isCreateOrderDisabled =
    createOrderPayload.date === '' ||
    createOrderPayload.number === '' ||
    createOrderPayload.lead_time_group_id === -1 ||
    createOrderPayload.merchant_listing_ids.length === 0;

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

  const fetchOrderProducts = async () => {
    try {
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/purchase-orders/products`
      );
      setOrderProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
  const leadTimeOptions = leadTimeGroups.map(leadTimeGroup => ({
    key: leadTimeGroup.id?.toString() || '',
    value: leadTimeGroup.id?.toString() || '',
    text: leadTimeGroup.name,
  }));

  const orderProductOptions = orderProducts.map((orderProduct: any) => ({
    key: orderProduct.id?.toString() || '',
    value: orderProduct.id?.toString() || '',
    text: `${truncateString(orderProduct.title, 15)} | ${truncateString(orderProduct.sku, 15)}`,
  }));

  React.useEffect(() => {
    fetchLeadTimeGroups();
    fetchOrderProducts();
  }, []);
  return (
    <Modal open={open} className={styles.modalWrapper} onClose={onCloseModal}>
      <div>
        <BoxHeader>CREATE PROJECT</BoxHeader>
        <BoxContainer className={styles.createOrderContent}>
          <div className={styles.createOrderBox}>
            <p>SMART ORDER TEMPLATE</p>
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
            <SelectionMultipleFilter
              className={styles.inputField}
              label="Products*"
              filterOptions={orderProductOptions}
              value={createOrderPayload.merchant_listing_ids.map(product => product.id.toString())}
              handleChange={(newProducts: any[]) =>
                setCreateOrderPayload({
                  ...createOrderPayload,
                  merchant_listing_ids: newProducts.map((product: any) => {
                    return {
                      id: parseInt(product),
                      quantity: 100,
                    };
                  }),
                })
              }
              placeholder=""
            />
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
              onClick={handleCreateOrder}
              variant="primary"
              type="purpleGradient"
              size="md"
              disabled={isCreateOrderDisabled}
            >
              Submit
            </ActionButton>
          </div>
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
