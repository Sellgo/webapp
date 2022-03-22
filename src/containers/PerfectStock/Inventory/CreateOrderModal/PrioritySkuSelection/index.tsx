import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Components */
import RadioCell from '../../../../../components/NewTable/RadioCell';
import ActionButton from '../../../../../components/ActionButton';

/* Containers */
import ProductInfo from './ProductInfo';

/* Types */
import { CreateOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { error } from '../../../../../utils/notifications';

interface Props {
  handlePrev: () => void;
  handleNext: () => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
}

const PrioritySkuSelection = (props: Props) => {
  const { handlePrev, handleNext, createOrderPayload, setCreateOrderPayload } = props;
  const [selectedPrioritySku, setSelectedPrioritySku] = React.useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedPrioritySku) {
      setCreateOrderPayload({
        ...createOrderPayload,
        priority_merchant_listing_id: selectedPrioritySku,
      });
      handleNext();
    } else {
      error('Please select a priority sku');
    }
  };

  const handleChange = (rowData: any) => {
    setSelectedPrioritySku(rowData.id);
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>Please select your priority SKU</h2>
        <Table
          data={createOrderPayload.merchant_listings}
          height={300}
          hover={false}
          rowHeight={60}
          headerHeight={55}
          id="prioritySkuSelection"
          shouldUpdateScroll={false}
          //  Props for table expansion
          rowExpandedHeight={300}
        >
          {/* Delete Cell */}
          <Table.Column width={50} verticalAlign="middle" align="right">
            <Table.HeaderCell />
            <RadioCell
              dataKey="id"
              handleCheckboxClick={handleChange}
              selectedValue={selectedPrioritySku}
              isRadio
            />
          </Table.Column>
          {/* Product Info */}
          <Table.Column width={600} verticalAlign="middle" align="left" flexGrow={1}>
            <Table.HeaderCell>Product Information</Table.HeaderCell>
            <ProductInfo dataKey="productInfo" />
          </Table.Column>
          <Table.Column width={100} verticalAlign="middle" align="left">
            <Table.HeaderCell>MOQ</Table.HeaderCell>
            <Table.Cell dataKey="moq" />
          </Table.Column>
        </Table>
      </div>
      <span className={styles.helperMessage}>
        *You can also change Priority SKU in the Order Planning.
      </span>
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

export default PrioritySkuSelection;
