import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import ReconcillationPopup from './ReconcillationPopup';

/* Selectors */
import { getTplActiveVendor, getTplSkuData } from '../../../../../selectors/PerfectStock/Tpl';

/* Actions */
import { fetchTplSkuData } from '../../../../../actions/PerfectStock/Tpl';

/* Types */
import { TplVendor } from '../../../../../interfaces/PerfectStock/Tpl';

interface Props {
  fetchTplSkuData: () => void;
  tplSkuData: any[];
  activeTplVendor: TplVendor;
}

const TplMeta = (props: Props) => {
  const { fetchTplSkuData, tplSkuData, activeTplVendor } = props;
  const [isReconciling, setIsReconciling] = React.useState<boolean>(false);

  return (
    <>
      <div className={styles.exportsContainer}>
        <ActionButton
          variant="secondary"
          size={'md'}
          type="purpleGradient"
          onClick={() => setIsReconciling(true)}
          className={styles.confirmButton}
        >
          Reconcile Stock
        </ActionButton>
      </div>

      <ReconcillationPopup
        open={isReconciling}
        onCloseModal={() => setIsReconciling(false)}
        refreshData={fetchTplSkuData}
        skusAvailable={tplSkuData}
        vendorId={activeTplVendor.id}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  tplSkuData: getTplSkuData(state),
  activeTplVendor: getTplActiveVendor(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchTplSkuData: () => dispatch(fetchTplSkuData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TplMeta);
