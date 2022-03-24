import React from 'react';
import { Table } from 'rsuite';
import axios from 'axios';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Components */
import DeleteCell from '../../../../../components/NewTable/DeleteCell';
import EditValueCell from '../../../../../components/NewTable/EditValueCell';
import SelectionProductFilter from '../../../../../components/FormFilters/SelectionProductFilter';
import ActionButton from '../../../../../components/ActionButton';

/* Containers */
import ProductInfo from './ProductInfo';

/* Utils */
import { sellerIDSelector } from '../../../../../selectors/Seller';
import { AppConfig } from '../../../../../config';
import { error } from '../../../../../utils/notifications';

/* Types */
import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';
import { Checkbox } from 'semantic-ui-react';

interface Props {
  handlePrev: () => void;
  handleNext: () => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
}

const SkuSelection = (props: Props) => {
  const { handlePrev, handleNext, createOrderPayload, setCreateOrderPayload } = props;
  const isMoqApproach = createOrderPayload.approach === 'moq';
  const [orderSkus, setOrderSkus] = React.useState<any>([]);
  const [addedSkus, setAddedSkus] = React.useState<any[]>(
    createOrderPayload.merchant_listings || []
  );
  const [enableMOQ, setEnableMOQ] = React.useState<boolean>(isMoqApproach);
  const addedSkuIds = addedSkus.map((sku: any) => sku.id.toString());

  const fetchOrderProducts = async () => {
    try {
      const { data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/purchase-orders/products`
      );
      setOrderSkus(data);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (orderSkus.length === 0) {
      fetchOrderProducts();
    }
  }, [orderSkus.length]);

  const handleSubmit = () => {
    /* Check that all skus have valid moq */
    const moqErrors = addedSkus.filter((sku: any) => {
      return sku.moq === null || sku.moq === undefined || sku.moq === '';
    });

    if (moqErrors.length > 0 && enableMOQ) {
      error('Please enter a valid MOQ for all SKUs');
      return;
    } else {
      setCreateOrderPayload({
        ...createOrderPayload,
        merchant_listings: addedSkus,
        honor_moq: enableMOQ,
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

  const handleChange = (key: string, value: any, id: number) => {
    const neworderSkus = [...orderSkus];
    const index = neworderSkus.findIndex((sku: any) => sku.id === id);
    neworderSkus[index][key] = value;
    setOrderSkus(neworderSkus);
  };

  const handleAddSku = (newSkuIds: string[]) => {
    const newSkus = orderSkus.filter((sku: any) => {
      return newSkuIds.includes(sku.id.toString());
    });
    setAddedSkus([...newSkus]);
  };
  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>Please add your SKU for this Order:</h2>
        <div className={styles.skuSelectMeta}>
          <SelectionProductFilter
            className={styles.assignProductsField}
            label="Please add your SKU for this Order:"
            filterOptions={orderProductOptions}
            value={addedSkuIds}
            handleChange={handleAddSku}
            placeholder=""
          />
          <div className={styles.skuSelectHeader}>
            <p>MOQ/ Minimum Order Quantity</p>
            {!isMoqApproach && (
              <span>
                <Checkbox checked={enableMOQ} onChange={() => setEnableMOQ(!enableMOQ)} />
                &nbsp;&nbsp;Use MOQ for Next Order
              </span>
            )}
          </div>
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
          <Table.Column width={120} verticalAlign="middle" align="right">
            <Table.HeaderCell />
            <EditValueCell
              dataKey="moq"
              handleChange={handleChange}
              isNumber
              isInteger
              isPositiveOnly
              showEmptyError
              disabled={!enableMOQ}
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
