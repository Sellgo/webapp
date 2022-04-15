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
import SelectionFilter from '../../../../../components/FormFilters/SelectionFilter';
import { error } from '../../../../../utils/notifications';

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
  const [usingTpl, setUsingTpl] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (tplVendors.length === 0) {
      fetchTplVendors();
    }
  }, []);

  const handleSubmit = () => {
    if (usingTpl && !selectedTplVendor) {
      error('Please select a vendor');
    }

    const payload = {
      ...createOrderPayload,
      tpl_vendor_id: usingTpl ? selectedTplVendor : null,
    };
    setCreateOrderPayload(payload);
    handleCreateOrder(payload);
  };

  const tplSelectionOptions = tplVendors.map(tplVendor => ({
    key: tplVendor.name,
    text: tplVendor.name,
    value: tplVendor.id.toString(),
  }));
  return (
    <div className={styles.createOrderWrapper}>
      <div className={styles.createOrderBox}>
        <h2>Which 3PL warehouse would you like to connect?</h2>
        <div className={styles.tplVendorsContainer}>
          <div className={styles.tplRow}>
            <Radio
              label={''}
              name="tplVendor"
              checked={usingTpl}
              onChange={() => setUsingTpl(true)}
              className={styles.tplVendorRadio}
            />
            <SelectionFilter
              filterOptions={tplSelectionOptions}
              placeholder="Select 3PL"
              value={selectedTplVendor?.toString() || ''}
              handleChange={(value: string) => {
                setSelectedTplVendor(parseInt(value));
                setUsingTpl(true);
              }}
            />
          </div>
          <Radio
            label={'I will connect later'}
            name="tplVendor"
            checked={!usingTpl}
            onChange={() => setUsingTpl(false)}
            className={styles.tplVendorRadio}
          />
        </div>
      </div>
      <span className={styles.helperMessage}>
        *You can also connect this order to 3PL Manager in the Order Planning.
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
