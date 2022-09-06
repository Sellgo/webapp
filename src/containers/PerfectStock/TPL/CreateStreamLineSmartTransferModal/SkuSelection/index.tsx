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
import { getOrderProducts } from '../../../../../libs/api/orderProducts';

interface Props {
  handlePrev: () => void;
  handleNext: () => void;
  createStreamLinePayload: any;
  setCreateStreamLinePayload: (payload: any) => void;
}

const SkuSelection = (props: Props) => {
  const { handlePrev, handleNext, createStreamLinePayload, setCreateStreamLinePayload } = props;
  const [orderSkus, setOrderSkus] = React.useState<any>([]);
  const [addedSkus, setAddedSkus] = React.useState<any[]>(
    createStreamLinePayload.merchant_listings || []
  );
  const addedSkuIds = addedSkus.map((sku: any) => sku.id.toString());

  const fetchOrderProducts = async () => {
    const result = await getOrderProducts();
    if (result.hasError) {
      error(result.err);
      return;
    }
    setOrderSkus(result.data);
  };

  React.useEffect(() => {
    if (orderSkus.length === 0) {
      fetchOrderProducts();
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
          merchant_listing_id: addedSku.id,
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
          id="skuSelectionTable"
          shouldUpdateScroll={false}
          //  Props for table expansion
          rowExpandedHeight={300}
        >
          {/* Product Info */}
          <Table.Column width={520} verticalAlign="middle" align="left">
            <Table.HeaderCell />
            <ProductInfo dataKey="productInfo" />
          </Table.Column>

          {/* Edit Cell */}
          {/* <Table.Column width={120} verticalAlign="middle" align="right">
            <Table.HeaderCell />
            <EditValueCell
              dataKey="moq"
              handleChange={handleChange}
              isNumber
              isInteger
              isPositiveOnly
              showEmptyError
            />
          </Table.Column> */}

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
