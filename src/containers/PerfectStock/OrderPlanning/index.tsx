import React from 'react';
import { connect } from 'react-redux';

/* Styles */
import styles from './index.module.scss';

/* Actions */
import {
  fetchDraftOrderInformation,
  fetchDraftTemplates,
  fetchPurchaseOrders,
  fetchRefreshProgress,
  setActiveDraftOrderTemplate,
  setPurchaseOrders,
} from '../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getActiveDraftOrderTemplate,
  getActivePurchaseOrder,
  getDraftOrderTemplates,
  getIsFetchingProgressForRefresh,
  getRefreshProgress,
} from '../../../selectors/PerfectStock/OrderPlanning';

/* Components */
import ProgressBar from '../../../components/ProgressBar';
import OrderGanttChart from '../Inventory/OrderGanttChart';
import OrderPlanningMeta from './OrderPlanningMeta';
import OrderSummary from './OrderSummary';
import OrderProducts from './OrderProducts';
import ExpectedDaysOfInventoryTable from './ExpectedDaysOfInventoryTable';
import AddEditSkuModal from './AddEditSkuModal';

/* Types */
import {
  DraftOrderTemplate,
  GanttChartPurchaseOrder,
  PurchaseOrder,
} from '../../../interfaces/PerfectStock/OrderPlanning';

interface Props {
  isFetchingProgressForRefresh: boolean;
  fetchRefreshProgress: () => void;
  refreshProgress: number;
  fetchPurchaseOrders: (isDraftMode: boolean) => void;
  activeDraftOrderTemplate: DraftOrderTemplate;
  setActiveDraftOrderTemplate: (payload: DraftOrderTemplate) => void;

  fetchDraftOrderInformation: () => void;
  setPurchaseOrders: (payload: PurchaseOrder[]) => void;
  activePurchaseOrder: GanttChartPurchaseOrder;
  fetchDraftTemplates: () => void;
  draftOrderTemplates: DraftOrderTemplate[];
}

type IOption = {
  key: string;
  value: string;
  text: string;
};

const OrderPlanning = (props: Props) => {
  const {
    isFetchingProgressForRefresh,
    refreshProgress,
    fetchRefreshProgress,
    fetchDraftOrderInformation,
    fetchPurchaseOrders,
    activePurchaseOrder,
    activeDraftOrderTemplate,
    setActiveDraftOrderTemplate,
    setPurchaseOrders,
    fetchDraftTemplates,
    draftOrderTemplates,
  } = props;

  // const [filterOptions, setFilterOptions] = React.useState<IOption[]>([]);
  const [isEditingSKUs, setIsEditingSKUs] = React.useState(false);

  const handleSelectTemplate = (id: string) => {
    const selectedTemplate = draftOrderTemplates.find(
      (option: DraftOrderTemplate) => option.id === parseInt(id)
    );

    if (selectedTemplate) {
      setActiveDraftOrderTemplate(selectedTemplate);
    }
  };

  /* Fetch draft order SKU information and meta-data upon clicking on an order */
  React.useEffect(() => {
    fetchDraftOrderInformation();
  }, [activePurchaseOrder]);

  /* Re-fetch all purchase orders when template selected changes */
  React.useEffect(() => {
    fetchPurchaseOrders(true);
  }, [activeDraftOrderTemplate]);

  /* Fetch full list of templates upon component mount */
  React.useEffect(() => {
    setPurchaseOrders([]);
    fetchDraftTemplates();
  }, []);

  const filterOptions = draftOrderTemplates.map((template: any) => {
    return {
      key: template.id,
      value: template.id.toString(),
      text: `Template ${template.id}`,
    };
  });
  const emptySkuContent = (
    <div className={styles.emptySkuContent}>
      No SKUs have been added.
      {activeDraftOrderTemplate.id && (
        <button onClick={() => setIsEditingSKUs(true)}> Add SKUs now. </button>
      )}
    </div>
  );
  return (
    <main>
      <OrderGanttChart
        hideBottomBorder
        viewFilterOptions={filterOptions}
        handleChangeFilterOption={handleSelectTemplate}
        viewFilter={activeDraftOrderTemplate.id ? activeDraftOrderTemplate.id.toString() : ''}
        isDraftMode
      />
      <ExpectedDaysOfInventoryTable emptySkuContent={emptySkuContent} />
      <OrderSummary />
      <OrderPlanningMeta setIsEditingSKUs={setIsEditingSKUs} />
      <OrderProducts />
      <ProgressBar
        fetchProgress={fetchRefreshProgress}
        progress={refreshProgress}
        shouldFetchProgress={isFetchingProgressForRefresh}
      />
      <AddEditSkuModal
        open={isEditingSKUs}
        onCloseModal={() => setIsEditingSKUs(false)}
        templateId={activeDraftOrderTemplate.id}
        selectedSKUs={activeDraftOrderTemplate.merchant_listings}
        refreshData={(updatedTemplate: DraftOrderTemplate) => {
          setActiveDraftOrderTemplate(updatedTemplate);
          fetchDraftTemplates();
          fetchPurchaseOrders(true);
        }}
      />
    </main>
  );
};

const mapStateToProps = (state: any) => ({
  refreshProgress: getRefreshProgress(state),
  isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
  activePurchaseOrder: getActivePurchaseOrder(state),
  activeDraftOrderTemplate: getActiveDraftOrderTemplate(state),
  draftOrderTemplates: getDraftOrderTemplates(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchRefreshProgress: () => dispatch(fetchRefreshProgress()),
    fetchDraftOrderInformation: () => dispatch(fetchDraftOrderInformation()),
    setActiveDraftOrderTemplate: (payload: DraftOrderTemplate) =>
      dispatch(setActiveDraftOrderTemplate(payload)),
    fetchPurchaseOrders: (isDraftMode: boolean) => {
      dispatch(fetchPurchaseOrders(isDraftMode));
    },
    setPurchaseOrders: (payload: PurchaseOrder[]) => {
      dispatch(setPurchaseOrders(payload));
    },
    fetchDraftTemplates: () => dispatch(fetchDraftTemplates()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanning);
