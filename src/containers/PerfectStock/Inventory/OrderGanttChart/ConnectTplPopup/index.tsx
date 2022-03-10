import React from 'react';
import { connect } from 'react-redux';
import { Radio } from 'semantic-ui-react';

/* Components */
import BoxHeader from '../../../../../components/BoxHeader';
import BoxContainer from '../../../../../components/BoxContainer';
import { ReactComponent as LinkIcon } from '../../../../../assets/images/link-simple-solid.svg';
import ActionButton from '../../../../../components/ActionButton';

/* Styles */
import styles from './index.module.scss';

/* Interfaces */
import { UpdatePurchaseOrderPayload } from '../../../../../interfaces/PerfectStock/OrderPlanning';
import { TplVendor } from '../../../../../interfaces/PerfectStock/Tpl';

/* Actions */
import { updatePurchaseOrder } from '../../../../../actions/PerfectStock/OrderPlanning';
import { fetchTplVendors } from '../../../../../actions/PerfectStock/Tpl';

/* Selectors */
import { getTplVendors } from '../../../../../selectors/PerfectStock/Tpl';

/* Utils */
import { success } from '../../../../../utils/notifications';

interface Props {
  handleCancel: () => void;
  tplVendors: TplVendor[];
  fetchTplVendors: () => void;
  updatePurchaseOrder: (payload: UpdatePurchaseOrderPayload) => void;
  connectTplDetails: { id: number; selectedVendor: number | null };
}

const ConnectTplPopup = (props: Props) => {
  const {
    handleCancel,
    tplVendors,
    fetchTplVendors,
    updatePurchaseOrder,
    connectTplDetails,
  } = props;
  const [selectedTplVendor, setSelectedTplVendor] = React.useState<number | null>(
    connectTplDetails.selectedVendor
  );

  React.useEffect(() => {
    if (tplVendors.length === 0) {
      fetchTplVendors();
    }
  }, []);

  const handleSave = async () => {
    await updatePurchaseOrder({
      id: connectTplDetails.id,
      vendor_id: selectedTplVendor,
    });
    success('Updated 3PL Vendor');
    handleCancel();
  };

  return (
    <>
      <BoxHeader>CONNECT TO 3PL MANAGER</BoxHeader>
      <BoxContainer className={styles.boxContainer}>
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
        <div className={styles.buttonsRow}>
          <ActionButton variant={'reset'} size={'md'} onClick={handleCancel}>
            Cancel
          </ActionButton>
          <ActionButton
            type="purpleGradient"
            variant={'secondary'}
            size={'md'}
            onClick={handleSave}
          >
            <LinkIcon />
            &nbsp; Connect to 3PL
          </ActionButton>
        </div>
      </BoxContainer>
    </>
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
