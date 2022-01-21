import React from 'react';
import { Table } from 'rsuite';
import axios from 'axios';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import DeleteCell from '../../../../../components/NewTable/DeleteCell';
import SelectionMultipleFilter from '../../../../../components/FormFilters/SelectionMultipleFilter';
import ActionButton from '../../../../../components/ActionButton';
import EditValueCell from '../../../../../components/NewTable/EditValueCell';

/* Containers */
import ProductInfo from './ProductInfo';

/* Utils */
import { truncateString } from '../../../../../utils/format';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { AppConfig } from '../../../../../config';

/* Types */
import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';

/* Constants */

interface Props {
  handleBack: () => void;
  handleSubmit: () => void;
  onCloseModal: () => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
}

const AssignProductsTable = (props: Props) => {
  const {
    createOrderPayload,
    setCreateOrderPayload,
    onCloseModal,
    handleSubmit,
    handleBack,
  } = props;
  const [orderProducts, setOrderProducts] = React.useState<any>([]);

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

  React.useEffect(() => {
    fetchOrderProducts();
  }, []);

  const handleDeleteProduct = (productId: number) => {
    const updatedCreateOrderPayload = {
      ...createOrderPayload,
      merchant_listing_ids: createOrderPayload.merchant_listing_ids.filter(
        (merchantListingId: any) => merchantListingId.id !== productId
      ),
    };
    setCreateOrderPayload(updatedCreateOrderPayload);
  };

  const handleUpdateQuantity = (key: string, value: number, id: number) => {
    const updatedCreateOrderPayload = {
      ...createOrderPayload,
      merchant_listing_ids: createOrderPayload.merchant_listing_ids.map(
        (merchantListingId: any) => {
          if (merchantListingId.id === id) {
            return {
              ...merchantListingId,
              quantity: value,
            };
          }
          return merchantListingId;
        }
      ),
    };
    setCreateOrderPayload(updatedCreateOrderPayload);
  };

  const isCreateOrderDisabled =
    createOrderPayload.date === '' ||
    createOrderPayload.number === '' ||
    createOrderPayload.lead_time_group_id === -1 ||
    createOrderPayload.merchant_listing_ids.length === 0;

  /* Product options in the dropdown selection menu */
  const orderProductOptions = orderProducts.map((orderProduct: any) => ({
    key: orderProduct.id?.toString() || '',
    value: orderProduct.id?.toString() || '',
    text: `${truncateString(orderProduct.title, 15)} | ${truncateString(orderProduct.sku, 15)}`,
  }));

  /* Display the selected products in the table, with asin and details */
  let selectedProducts = orderProducts.filter((orderProduct: any) => {
    return createOrderPayload.merchant_listing_ids.find(
      (merchantListingId: any) => merchantListingId.id === orderProduct.id
    );
  });

  /* Add inputted units to the display table */
  selectedProducts = selectedProducts.map((orderProduct: any) => ({
    ...orderProduct,
    quantity:
      createOrderPayload.merchant_listing_ids.find(
        (merchantListingId: any) => merchantListingId.id === orderProduct.id
      )?.quantity || 0,
  }));

  return (
    <>
      <div className={styles.createOrderBox}>
        <SelectionMultipleFilter
          className={styles.assignProductsField}
          label="Add More Products: *"
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
        <Table
          data={selectedProducts}
          height={300}
          hover={false}
          rowHeight={60}
          headerHeight={55}
          id="createOrderProductTable"
          shouldUpdateScroll={false}
          //  Props for table expansion
          rowExpandedHeight={300}
        >
          {/* Product Info */}
          <Table.Column width={600} verticalAlign="middle" align="left">
            <Table.HeaderCell>Product Information</Table.HeaderCell>
            <ProductInfo dataKey="productInfo" />
          </Table.Column>

          {/* Edit Quantity */}
          <Table.Column width={100} verticalAlign="middle" align="left">
            <Table.HeaderCell>Units</Table.HeaderCell>
            <EditValueCell handleChange={handleUpdateQuantity} dataKey={'quantity'} isNumber />
          </Table.Column>

          {/* Delete Cell */}
          <Table.Column width={50} verticalAlign="middle" align="right" flexGrow={1}>
            <Table.HeaderCell />
            <DeleteCell
              dataKey="id"
              deleteMessage="Unassign this product?"
              handleDelete={handleDeleteProduct}
            />
          </Table.Column>
        </Table>
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
        <div>
          <ActionButton
            className={styles.cancelButton}
            onClick={handleBack}
            variant="reset"
            size="md"
          >
            Previous
          </ActionButton>
          <ActionButton
            className={styles.createButton}
            onClick={handleSubmit}
            variant="primary"
            type="purpleGradient"
            size="md"
            disabled={isCreateOrderDisabled}
          >
            Submit
          </ActionButton>
        </div>
      </div>
    </>
  );
};

export default AssignProductsTable;
