import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import {
  fetchInventoryTable,
  fetchPurchaseOrders,
  fetchRefreshProgress,
  setPurchaseOrders,
} from '../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getActivePurchaseOrder,
  getIsFetchingProgressForRefresh,
  getRefreshProgress,
} from '../../../selectors/PerfectStock/OrderPlanning';

/* Components */
import ProgressBar from '../../../components/ProgressBar';
import OrderGanttChart from '../Inventory/OrderGanttChart';
import OrderPlanningMeta from './OrderPlanningMeta';
import OrderSummary from './OrderSummary';
import EditingOrderStatusBanner from './EditingOrderStatusBanner';
import InventoryTable from './InventoryTable';
import AddEditSkuModal from './AddEditSkuModal';

/* Types */
import {
  InventoryTablePayload,
  PurchaseOrder,
} from '../../../interfaces/PerfectStock/OrderPlanning';

/* Styles */
import styles from './index.module.scss';

interface Props {
  isFetchingProgressForRefresh: boolean;
  fetchRefreshProgress: () => void;
  refreshProgress: number;
  fetchPurchaseOrders: () => void;
  fetchInventoryTable: (payload: InventoryTablePayload) => void;

  setPurchaseOrders: (payload: PurchaseOrder[]) => void;
  activePurchaseOrder: PurchaseOrder;
}

const OrderPlanning = (props: Props) => {
  const {
    isFetchingProgressForRefresh,
    refreshProgress,
    fetchRefreshProgress,
    fetchPurchaseOrders,
    activePurchaseOrder,
    setPurchaseOrders,
    fetchInventoryTable,
  } = props;

  const [isEditingSKUs, setIsEditingSKUs] = React.useState(false);
  const [isShowingDaysUntilStockout, setIsShowingDaysUntilStockout] = React.useState(false);

  const emptySkusContent = (
    <div className={styles.emptySkuContent}>
      You do not have any SKUs added.&nbsp;
      <button onClick={() => setIsEditingSKUs(true)}>Add SKUs now.</button>
    </div>
  );
  /* Fetch full list of templates upon component mount */
  React.useEffect(() => {
    setPurchaseOrders([]);
  }, []);

  return (
    <main>
      <EditingOrderStatusBanner />
      <OrderGanttChart isDraftMode />
      <OrderSummary />
      <OrderPlanningMeta
        setIsEditingSKUs={setIsEditingSKUs}
        isShowingDaysUntilStockout={isShowingDaysUntilStockout}
        setIsShowingDaysUntilStockout={setIsShowingDaysUntilStockout}
      />
      <ProgressBar
        fetchProgress={fetchRefreshProgress}
        progress={refreshProgress}
        shouldFetchProgress={isFetchingProgressForRefresh}
      />
      <InventoryTable
        emptySkusContent={emptySkusContent}
        isShowingDaysUntilStockout={isShowingDaysUntilStockout}
      />
      <AddEditSkuModal
        open={isEditingSKUs}
        onCloseModal={() => setIsEditingSKUs(false)}
        templateId={activePurchaseOrder.purchase_order_template_id}
        selectedSKUs={activePurchaseOrder.merchant_listings}
        refreshData={() => {
          fetchPurchaseOrders();
          fetchInventoryTable({});
        }}
      />
    </main>
  );
};

const mapStateToProps = (state: any) => ({
  refreshProgress: getRefreshProgress(state),
  isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
  activePurchaseOrder: getActivePurchaseOrder(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchRefreshProgress: () => dispatch(fetchRefreshProgress()),
    fetchPurchaseOrders: () => {
      dispatch(fetchPurchaseOrders());
    },
    setPurchaseOrders: (payload: PurchaseOrder[]) => {
      dispatch(setPurchaseOrders(payload));
    },
    fetchInventoryTable: (payload: InventoryTablePayload) => {
      dispatch(fetchInventoryTable(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanning);
