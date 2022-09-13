import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Components */
import DeleteCell from '../../../../../components/NewTable/DeleteCell';
import SelectionProductFilter from '../../../../../components/FormFilters/SelectionProductFilter';
import ActionButton from '../../../../../components/ActionButton';

/* Containers */
import ProductInfo from './ProductInfo';

/* Utils */
import { error } from '../../../../../utils/notifications';

/* APIs */
import { getOrderProducts } from '../../../../../libs/api/orderProducts';

interface Props {
  handlePrev: () => void;
  handleNext: () => void;
  createStreamLinePayload: any;
  vendorId: number;
  setCreateStreamLinePayload: (payload: any) => void;
}

const SkuSelection = (props: Props) => {
  const {
    handlePrev,
    handleNext,
    createStreamLinePayload,
    vendorId,
    setCreateStreamLinePayload,
  } = props;
  const [orderSkus, setOrderSkus] = React.useState<any>([]);
  const [addedSkus, setAddedSkus] = React.useState<any[]>([]);
  const addedSkuIds = addedSkus.map((sku: any) => sku?.id?.toString());

  const fetchOrderProducts = async () => {
    const result = await getOrderProducts(vendorId);
    if (result.hasError) {
      error(result.err);
      return;
    }
    setOrderSkus(result.data);
  };

  React.useEffect(() => {
    if (orderSkus.length === 0) {
      fetchOrderProducts();
    } else {
      const merchantListIds: string[] = [];
      createStreamLinePayload.merchant_listings.forEach((merchant_listing: any) => {
        merchantListIds.push(merchant_listing.merchant_listing_id.toString());
      });
      if (merchantListIds.length > 0) {
        handleAddSkusOnModalLoad(merchantListIds);
      }
    }
  }, [orderSkus.length]);

  const handleSubmit = () => {
    /* Check that all skus have valid moq */
    if (!(addedSkus.length > 0)) {
      error('Please select SKUs to continue');
      return;
    } else {
      const tempMerchantListings: any = [];
      addedSkus.forEach(addedSku => {
        tempMerchantListings.push({
          merchant_listing_id: addedSku.merchant_listing_id,
        });
      });
      setCreateStreamLinePayload({
        ...createStreamLinePayload,
        merchant_listings: tempMerchantListings,
      });
      handleNext();
    }
  };

  const handleDeleteProduct = (productId: number) => {
    const newAddedSkus = addedSkus.filter((sku: any) => sku.id !== productId);
    setAddedSkus(newAddedSkus);
  };

  /* Product options in the dropdown selection menu */
  const orderProductOptions = orderSkus.map((orderProduct: any) => ({
    id: orderProduct.id?.toString() || '',
    productName: orderProduct.title,
    asin: orderProduct.asin,
    img: orderProduct.image_url,
    skuName: orderProduct.sku,
    activePurchaseOrders: orderProduct.active_purchase_orders,
    fulfillmentChannel: orderProduct.fulfillment_channel,
    skuStatus: orderProduct.sku_status,
  }));

  const handleAddSku = (newSkuIds: string[]) => {
    const newSkus = orderSkus.filter((sku: any) => {
      return newSkuIds.includes(sku.id.toString());
    });
    setAddedSkus([...newSkus]);
  };

  const handleAddSkusOnModalLoad = (merchantListingIds: string[]) => {
    const newSkus = orderSkus.filter((sku: any) => {
      return merchantListingIds.includes(sku.merchant_listing_id.toString());
    });
    setAddedSkus([...newSkus]);
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>Please add your SKU for this Replenishment:</h2>
        <div className={styles.skuSelectMeta}>
          <SelectionProductFilter
            className={styles.assignProductsField}
            label="Please add your SKU:"
            filterOptions={orderProductOptions}
            value={addedSkuIds}
            handleChange={handleAddSku}
            placeholder=""
          />
        </div>
        <Table
          data={addedSkus}
          height={300}
          hover={false}
          rowHeight={60}
          headerHeight={0}
          id="skuSelectionTableStreamLine"
          shouldUpdateScroll={false}
          //  Props for table expansion
          rowExpandedHeight={300}
          width={800}
        >
          {/* Product Info */}
          <Table.Column width={350} verticalAlign="middle" align="left">
            <Table.HeaderCell />
            <ProductInfo dataKey="productInfo" />
          </Table.Column>

          {/* Storage Type */}
          <Table.Column width={120} verticalAlign="middle" align="right">
            <Table.HeaderCell>Size Category</Table.HeaderCell>
            {/* <Table.Cell dataKey="storage_type" /> */}
            <Table.Cell dataKey="storage_type" />
          </Table.Column>

          {/* {Total qty} */}
          <Table.Column width={120} verticalAlign="middle" align="right">
            <Table.HeaderCell>Total Restock Limit Qty</Table.HeaderCell>
            <Table.Cell dataKey="max_allowed_quantity" />
          </Table.Column>
          <Table.Column width={120} verticalAlign="middle" align="right">
            <Table.HeaderCell>Current 3PL Qty</Table.HeaderCell>
            <Table.Cell dataKey="tpl_quantity" />
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
          onClick={handlePrev}
          variant="reset"
          size="md"
        >
          Back
        </ActionButton>
        <div>
          <ActionButton
            className={styles.createButton}
            onClick={handleSubmit}
            variant="secondary"
            type="purpleGradient"
            size="md"
          >
            Continue
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default SkuSelection;
