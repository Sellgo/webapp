import React from 'react';
import { connect } from 'react-redux';
import { Radio } from 'semantic-ui-react';

/* Components */
import ActionButton from '../../../../../components/ActionButton';

/* Styles */
import styles from './index.module.scss';

/* Interfaces */
import {
  CreateOrderPayload,
  UpdatePurchaseOrderPayload,
} from '../../../../../interfaces/PerfectStock/OrderPlanning';
import { TplVendor } from '../../../../../interfaces/PerfectStock/Tpl';

/* Actions */
import { updatePurchaseOrder } from '../../../../../actions/PerfectStock/OrderPlanning';
import { fetchTplVendors } from '../../../../../actions/PerfectStock/Tpl';

/* Selectors */
import { getTplVendors } from '../../../../../selectors/PerfectStock/Tpl';

interface Props {
  tplVendors: TplVendor[];
  fetchTplVendors: () => void;
  handlePrev: () => void;
  handleCreateOrder: (payload: CreateOrderPayload) => void;
  createOrderPayload: CreateOrderPayload;
  setCreateOrderPayload: (payload: CreateOrderPayload) => void;
  isCreateOrderLoading: boolean;
}

const ConnectTplPopup = (props: Props) => {
  const {
    tplVendors,
    fetchTplVendors,
    handlePrev,
    handleCreateOrder,
    createOrderPayload,
    setCreateOrderPayload,
    isCreateOrderLoading,
  } = props;
  const [selectedTplVendor, setSelectedTplVendor] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (tplVendors.length === 0) {
      fetchTplVendors();
    }
  }, []);

  const handleSubmit = () => {
    const payload = {
      ...createOrderPayload,
      tpl_vendor_id: selectedTplVendor,
    };
    setCreateOrderPayload(payload);
    handleCreateOrder(payload);
  };

  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>Which 3PL warehouse would you like to connect?</h2>
        <div className={styles.tplVendorsContainer}>
          {tplVendors.map(tplVendor => (
            <Radio
              key={tplVendor.id}
              label={tplVendor.name}
              name="tplVendor"
              checked={selectedTplVendor === tplVendor.id}
              onChange={() => setSelectedTplVendor(tplVendor.id)}
              className={styles.tplVendorRadio}
            />
          ))}
          <Radio
            label={'I will connect later'}
            name="tplVendor"
            checked={selectedTplVendor === null}
            onChange={() => setSelectedTplVendor(null)}
            className={styles.tplVendorRadio}
          />
        </div>
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
        <ActionButton
          className={styles.createButton}
          onClick={handleSubmit}
          variant="secondary"
          type="purpleGradient"
          size="md"
          loading={isCreateOrderLoading}
        >
          Create Order
        </ActionButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    tplVendors: getTplVendors(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTplVendors: () => {
      dispatch(fetchTplVendors());
    },
    updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) => {
      dispatch(updatePurchaseOrder(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectTplPopup);
