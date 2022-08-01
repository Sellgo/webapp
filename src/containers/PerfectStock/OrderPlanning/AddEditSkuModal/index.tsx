import React from 'react';
import { Table } from 'rsuite';
import axios from 'axios';
import { Modal } from 'semantic-ui-react';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import DeleteCell from '../../../../components/NewTable/DeleteCell';
import SelectionProductFilter from '../../../../components/FormFilters/SelectionProductFilter';
import ActionButton from '../../../../components/ActionButton';

/* Containers */
import ProductInfo from './ProductInfo';

/* Utils */
import { sellerIDSelector } from '../../../../selectors/Seller';
import { AppConfig } from '../../../../config';
import { error, success } from '../../../../utils/notifications';

interface Props {
  open: boolean;
  onCloseModal: () => void;
  templateId: number;
  refreshData: () => void;
  selectedSKUs: any[];
}

const AddEditSkuModal = (props: Props) => {
  const { open, onCloseModal, templateId, refreshData, selectedSKUs } = props;
  const [orderProducts, setOrderProducts] = React.useState<any>([]);
  const [selectedProductIds, setSelectedProductIds] = React.useState<string[]>([]);
  const [prioritySkuId, setPrioritySkuId] = React.useState<string | null>(null);
  const [isSubmitingProductAssignments, setIsSubmitingProductAssignments] =
    React.useState<boolean>(false);

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
    if (open) {
      setOrderProducts([]);
      const selectedSkuIds: any = [];

      selectedSKUs?.forEach((sku: any) => {
        if (sku.is_priority) {
          setPrioritySkuId(sku.merchant_listing_id);
        } else {
          selectedSkuIds.push(sku.merchant_listing_id.toString());
        }
      });

      setSelectedProductIds(selectedSkuIds ? selectedSkuIds : []);
      fetchOrderProducts();
    }
  }, [open]);

  const handleSubmit = async () => {
    setIsSubmitingProductAssignments(true);
    try {
      const { status } = await axios.patch(
        `${
          AppConfig.BASE_URL_API
        }sellers/${sellerIDSelector()}/purchase-order-templates/${templateId}`,
        {
          merchant_listing_ids: [
            ...selectedProductIds.map((id: string) => parseInt(id)),
            prioritySkuId,
          ],
        }
      );
      if (status === 200) {
        success('Products assigned successfully');
        onCloseModal();
        refreshData();
      } else {
        error('Something went wrong');
      }
    } catch (err) {
      error('Something went wrong');
      console.error(err);
    }
    setIsSubmitingProductAssignments(false);
  };

  const handleDeleteProduct = (productId: number) => {
    const newSelectedProductIds = selectedProductIds.filter(
      (id: string) => parseInt(id) !== productId
    );
    setSelectedProductIds(newSelectedProductIds);
  };

  const isCreateOrderDisabled = false;

  /* Product options in the dropdown selection menu */
  const orderProductOptions: any = [];

  orderProducts.forEach((orderProduct: any) => {
    if (orderProduct.id !== prioritySkuId) {
      orderProductOptions.push({
        id: orderProduct.id?.toString() || '',
        productName: orderProduct.title,
        asin: orderProduct.asin,
        img: orderProduct.image_url,
        skuName: orderProduct.sku,
        activePurchaseOrders: orderProduct.active_purchase_orders,
        fulfillmentChannel: orderProduct.fulfillment_channel,
        skuStatus: orderProduct.sku_status,
      });
    }
  });

  /* Display the selected products in the table, with asin and details */
  const selectedProducts = orderProducts.filter((orderProduct: any) => {
    return selectedProductIds.includes(orderProduct.id.toString() || '');
  });

  return (
    <Modal open={open} className={styles.modalWrapper} onClose={onCloseModal}>
      <div className={styles.createOrderBox}>
        <SelectionProductFilter
          className={styles.assignProductsField}
          label="Add More Products: *"
          filterOptions={orderProductOptions}
          value={selectedProductIds}
          handleChange={(newProducts: any[]) => {
            setSelectedProductIds(newProducts);
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
            onClick={handleSubmit}
            variant="primary"
            type="purpleGradient"
            size="md"
            disabled={isCreateOrderDisabled}
            loading={isSubmitingProductAssignments}
          >
            Save
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditSkuModal;
