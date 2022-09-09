import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';
import { DAILY_SUBSCRIPTION_PLANS } from '../../../../../constants/Subscription/Sellgo';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import ReconcillationPopup from './ReconcillationPopup';

/* Selectors */
import { getTplActiveVendor, getTplSkuData } from '../../../../../selectors/PerfectStock/Tpl';

/* Actions */
import { fetchTplSkuData } from '../../../../../actions/PerfectStock/Tpl';

/* Types */
import { TplVendor } from '../../../../../interfaces/PerfectStock/Tpl';
import { SellerSubscription } from '../../../../../interfaces/Seller';

/* Assets */
import BanIcon from '../../../../../assets/images/banIcon.svg';
import CreateStreamLineSmartTransferModal from '../../CreateStreamLineSmartTransferModal';
interface Props {
  fetchTplSkuData: () => void;
  tplSkuData: any[];
  activeTplVendor: TplVendor;
  sellerSubscription: SellerSubscription;
  label: string;
  onButtonClick?: () => void;
  loading: boolean;
}

const TplMeta = (props: Props) => {
  const {
    fetchTplSkuData,
    tplSkuData,
    activeTplVendor,
    sellerSubscription,
    label,
    onButtonClick,
    loading,
  } = props;
  const [isReconciling, setIsReconciling] = React.useState<boolean>(false);
  const [isCreatingStreamLine, setIsCreatingStreamLine] = useState<boolean>(false);

  const isExportAllowed = !DAILY_SUBSCRIPTION_PLANS.includes(sellerSubscription.subscription_id);

  return (
    <>
      <div className={styles.exportsContainer}>
        <ActionButton
          variant="secondary"
          size={'md'}
          type="purpleGradient"
          onClick={() => setIsCreatingStreamLine(true)}
          className={styles.confirmButton}
        >
          Stream line transfer
        </ActionButton>
        <button
          className={`${styles.exportBtn}`}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onButtonClick && onButtonClick();
          }}
          disabled={!isExportAllowed}
        >
          {isExportAllowed && !loading ? (
            label
          ) : isExportAllowed && loading ? (
            <div className={styles.loaderContainer}>
              <Loader active size="tiny" />
            </div>
          ) : (
            <img src={BanIcon} alt="ban-icon" className={styles.banIcon} />
          )}
        </button>
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
      <CreateStreamLineSmartTransferModal
        open={isCreatingStreamLine}
        setIsCreatingOrder={setIsCreatingStreamLine}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  tplSkuData: getTplSkuData(state),
  activeTplVendor: getTplActiveVendor(state),
  sellerSubscription: state.subscription.sellerSubscription,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchTplSkuData: () => dispatch(fetchTplSkuData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TplMeta);
