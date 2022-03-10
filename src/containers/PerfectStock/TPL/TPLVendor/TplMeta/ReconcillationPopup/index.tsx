import React from 'react';
import { Table } from 'rsuite';
import axios from 'axios';
import { Modal } from 'semantic-ui-react';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Components */
import BoxHeader from '../../../../../../components/BoxHeader';
import BoxContainer from '../../../../../../components/BoxContainer';
import DeleteCell from '../../../../../../components/NewTable/DeleteCell';
import EditValueCell from '../../../../../../components/NewTable/EditValueCell';
import SelectionProductFilter from '../../../../../../components/FormFilters/SelectionProductFilter';
import ActionButton from '../../../../../../components/ActionButton';

/* Containers */
import ProductInfo from './ProductInfo';

/* Utils */
import { sellerIDSelector } from '../../../../../../selectors/Seller';
import { AppConfig } from '../../../../../../config';
import { error, success } from '../../../../../../utils/notifications';

interface Props {
  open: boolean;
  onCloseModal: () => void;
  refreshData: () => void;
  skusAvailable: any[];
  vendorId: number;
}

const AddEditSkuModal = (props: Props) => {
  const { open, onCloseModal, refreshData, skusAvailable, vendorId } = props;
  const [vendorSkus, setVendorSkus] = React.useState<any>([]);
  const [reconciledSkuIds, setReconciledSkuIds] = React.useState<string[]>([]);
  const [isReconciling, setIsReconciling] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (open) {
      setVendorSkus(JSON.parse(JSON.stringify(skusAvailable)));
      setReconciledSkuIds([]);
    }
  }, [open]);

  const handleSubmit = async () => {
    setIsReconciling(true);
    const payload = {
      tpl_quantities: reconciledSkuIds.map((id: string) => {
        return {
          merchant_listing_id:
            vendorSkus.find((sku: any) => sku.id === parseInt(id))?.merchant_listing_id || 0,
          quantity: vendorSkus.find((sku: any) => sku.id === parseInt(id))?.quantity || 0,
        };
      }),
    };
    try {
      const { status } = await axios.post(
        `${
          AppConfig.BASE_URL_API
        }sellers/${sellerIDSelector()}/perfect-stock/vendor/${vendorId}/reconcile`,
        payload
      );
      if (status === 200) {
        success('Reconciled SKUs successfully');
        refreshData();
        onCloseModal();
      } else {
        error('Something went wrong');
      }
    } catch (err) {
      error('Something went wrong');
      console.error(err);
    }
    setIsReconciling(false);
  };

  const handleDeleteProduct = (productId: number) => {
    const newSelectedProductIds = reconciledSkuIds.filter(
      (id: string) => parseInt(id) !== productId
    );
    setReconciledSkuIds(newSelectedProductIds);
  };

  const isCreateOrderDisabled = false;

  /* Product options in the dropdown selection menu */
  const orderProductOptions = vendorSkus.map((orderProduct: any) => ({
    id: orderProduct.id?.toString() || '',
    productName: orderProduct.title,
    asin: orderProduct.asin,
    img: orderProduct.image_url,
    skuName: orderProduct.sku,
    activePurchaseOrders: orderProduct.active_purchase_orders,
    fulfillmentChannel: orderProduct.fulfillment_channel,
    skuStatus: orderProduct.sku_status,
  }));

  /* Display the selected products in the table, with asin and details */
  const selectedProducts = vendorSkus.filter((orderProduct: any) => {
    return reconciledSkuIds.includes(orderProduct.id.toString() || '');
  });

  const handleChange = (key: string, value: any, id: number) => {
    const newVendorSkus = [...vendorSkus];
    const index = newVendorSkus.findIndex((sku: any) => sku.id === id);
    newVendorSkus[index][key] = value;
    setVendorSkus(newVendorSkus);
  };
  return (
    <Modal open={open} className={styles.modalWrapper} onClose={onCloseModal}>
      <BoxHeader>RECONCILE STOCK</BoxHeader>
      <BoxContainer>
        <div className={styles.createOrderBox}>
          <h2>Please add your SKU and quantity for reconciliation:</h2>
          <SelectionProductFilter
            className={styles.assignProductsField}
            label="Enter Title or SKU or ASIN"
            filterOptions={orderProductOptions}
            value={reconciledSkuIds}
            handleChange={(newProducts: any[]) => {
              setReconciledSkuIds(newProducts);
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

            {/* Edit Cell */}
            <Table.Column width={50} verticalAlign="middle" align="right" flexGrow={1}>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <EditValueCell
                dataKey="quantity"
                handleChange={handleChange}
                isNumber
                isInteger
                isPositiveOnly
                showEmptyError
              />
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
              variant="secondary"
              type="purpleGradient"
              size="md"
              disabled={isCreateOrderDisabled}
              loading={isReconciling}
            >
              Apply
            </ActionButton>
          </div>
        </div>
      </BoxContainer>
    </Modal>
  );
};

export default AddEditSkuModal;
