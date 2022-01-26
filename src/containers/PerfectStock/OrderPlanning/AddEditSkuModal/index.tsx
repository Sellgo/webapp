import React from 'react';
import { Table } from 'rsuite';
import axios from 'axios';
import { Modal } from 'semantic-ui-react';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import DeleteCell from '../../../../components/NewTable/DeleteCell';
import SelectionMultipleFilter from '../../../../components/FormFilters/SelectionMultipleFilter';
import ActionButton from '../../../../components/ActionButton';

/* Containers */
import ProductInfo from './ProductInfo';

/* Utils */
import { truncateString } from '../../../../utils/format';
import { sellerIDSelector } from '../../../../selectors/Seller';
import { AppConfig } from '../../../../config';

interface Props {
  open: boolean;
  onCloseModal: () => void;
}

const AssignProductsTable = (props: Props) => {
  const { open, onCloseModal } = props;
  const [orderProducts, setOrderProducts] = React.useState<any>([]);
  const [selectedProductIds, setSelectedProductIds] = React.useState<string[]>([]);

  const fetchOrderProducts = async () => {
    try {
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/purchase-orders/products`
      );
      console.log(data);
      setOrderProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchOrderProducts();
  }, []);

  const handleDeleteProduct = (productId: number) => {
    console.log(productId);
  };

  const isCreateOrderDisabled = false;

  /* Product options in the dropdown selection menu */
  const orderProductOptions = orderProducts.map((orderProduct: any) => ({
    key: orderProduct.id?.toString() || '',
    value: orderProduct.id?.toString() || '',
    text: `${truncateString(orderProduct.title, 15)} | ${truncateString(orderProduct.sku, 15)}`,
  }));

  /* Display the selected products in the table, with asin and details */
  const selectedProducts = orderProducts.filter((orderProduct: any) => {
    return selectedProductIds.find(
      (merchantListingId: any) => merchantListingId.id === orderProduct.id
    );
  });

  return (
    <Modal open={open} className={styles.modalWrapper} onClose={onCloseModal}>
      <div className={styles.createOrderBox}>
        <SelectionMultipleFilter
          className={styles.assignProductsField}
          label="Add More Products: *"
          filterOptions={orderProductOptions}
          value={selectedProductIds}
          handleChange={(newProducts: any[]) => {
            setSelectedProductIds(newProducts.map((product: any) => product.value));
          }}
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
            className={styles.createButton}
            onClick={() => null}
            variant="primary"
            type="purpleGradient"
            size="md"
            disabled={isCreateOrderDisabled}
          >
            Submit
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
};

export default AssignProductsTable;
