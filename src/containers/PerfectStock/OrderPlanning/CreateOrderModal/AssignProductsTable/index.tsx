import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import DeleteCell from '../../../../../components/NewTable/DeleteCell';

/* Containers */
import ProductInfo from './ProductInfo';
import SelectionMultipleFilter from '../../../../../components/FormFilters/SelectionMultipleFilter';
import { truncateString } from '../../../../../utils/format';
import { sellerIDSelector } from '../../../../../selectors/Seller';
import axios from 'axios';
import { AppConfig } from '../../../../../config';
import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';
import ActionButton from '../../../../../components/ActionButton';
import EditValueCell from '../../../../../components/NewTable/EditValueCell';

/* Constants */

interface Props {
  handleSubmit: (payload: CreateOrderPayload) => void;
  onCloseModal: () => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
}

const AssignProductsTable = (props: Props) => {
  const { createOrderPayload, setCreateOrderPayload, onCloseModal, handleSubmit } = props;
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

  // const handleUpdateQuantity = (productId: number, quantity: number) => {
  //   const updatedCreateOrderPayload = {
  //     ...createOrderPayload,
  //     merchant_listing_ids: createOrderPayload.merchant_listing_ids.map(
  //       (merchantListingId: any) => {
  //         if (merchantListingId.id === productId) {
  //           return {
  //             ...merchantListingId,
  //             quantity,
  //           };
  //         }
  //         return merchantListingId;
  //       }
  //     ),
  //   };
  //   setCreateOrderPayload(updatedCreateOrderPayload);
  // };

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
    <section className={styles.keywordTrackerTableWrapper}>
      <div className={styles.createOrderBox}>
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
          <Table.Column minWidth={300} verticalAlign="top" fixed="left" align="left" flexGrow={1}>
            <Table.HeaderCell>Product Information</Table.HeaderCell>
            <ProductInfo dataKey="productInfo" />
          </Table.Column>

          {/* Keywords */}
          <Table.Column width={200} verticalAlign="top" align="left">
            <Table.HeaderCell>Units</Table.HeaderCell>
            <EditValueCell handleChange={() => null} dataKey={'units'} />
          </Table.Column>

          {/* Delete Cell */}
          <Table.Column width={50} verticalAlign="top" align="left">
            <Table.HeaderCell />
            <DeleteCell
              dataKey="keyword_track_product_id"
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
        <ActionButton
          className={styles.createButton}
          onClick={() => handleSubmit(createOrderPayload)}
          variant="primary"
          type="purpleGradient"
          size="md"
          disabled={false}
        >
          Submit
        </ActionButton>
      </div>
    </section>
  );
};

export default AssignProductsTable;
