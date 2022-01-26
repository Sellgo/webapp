import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* Actions */
import {
  fetchDraftOrderInformation,
  fetchPurchaseOrders,
  fetchRefreshProgress,
  setActiveDraftOrderTemplate,
} from '../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getActiveDraftOrderTemplate,
  getActivePurchaseOrder,
  getIsFetchingProgressForRefresh,
  getRefreshProgress,
} from '../../../selectors/PerfectStock/OrderPlanning';
import { sellerIDSelector } from '../../../selectors/Seller';

/* Components */
import ProgressBar from '../../../components/ProgressBar';
import OrderGanttChart from '../Inventory/OrderGanttChart';
import OrderPlanningMeta from './OrderPlanningMeta';
import OrderSummary from './OrderSummary';
import OrderProducts from './OrderProducts';
import ExpectedDaysOfInventoryTable from './ExpectedDaysOfInventoryTable';

/* Types */
import {
  DraftOrderTemplate,
  GanttChartPurchaseOrder,
} from '../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { AppConfig } from '../../../config';

interface Props {
  isFetchingProgressForRefresh: boolean;
  fetchRefreshProgress: () => void;
  refreshProgress: number;
  fetchPurchaseOrders: (isDraftMode: boolean) => void;
  activeDraftOrderTemplate: DraftOrderTemplate;
  setActiveDraftOrderTemplate: (payload: DraftOrderTemplate) => void;

  fetchDraftOrderInformation: () => void;
  activePurchaseOrder: GanttChartPurchaseOrder;
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
  } = props;

  const [filterOptions, setFilterOptions] = React.useState<IOption[]>([]);
  const [draftTemplates, setDraftTemplates] = React.useState<DraftOrderTemplate[]>([]);

  /* Action to fetch draft templates */
  const fetchDraftTemplates = async () => {
    try {
      const sellerId = sellerIDSelector();
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/purchase-order-templates`;

      const { data } = await axios.get(URL);
      const filterOptions = data.map((template: any) => {
        return {
          key: template.id,
          value: template.id,
          text: `Template ${template.id}`,
        };
      });
      setDraftTemplates(data);
      setFilterOptions(filterOptions);
    } catch (err) {
      console.error('Error fetching draft templates', err);
    }
  };

  const handleSelectTemplate = (id: string) => {
    const selectedTemplate = draftTemplates.find(
      (option: DraftOrderTemplate) => option.id === parseInt(id)
    );

    if (selectedTemplate) {
      setActiveDraftOrderTemplate(selectedTemplate);
    }
  };

  const selectedDraftOrderTemplateOption = filterOptions.find(
    (option: IOption) => option.value === activeDraftOrderTemplate?.id?.toString()
  );

  React.useEffect(() => {
    fetchDraftOrderInformation();
    fetchDraftTemplates();
  }, [activePurchaseOrder]);

  React.useEffect(() => {
    fetchPurchaseOrders(true);
  }, [activeDraftOrderTemplate]);

  return (
    <main>
      <OrderGanttChart
        hideBottomBorder
        viewFilterOptions={filterOptions}
        handleChangeFilterOption={handleSelectTemplate}
        viewFilter={selectedDraftOrderTemplateOption}
        isDraftMode
      />
      <ExpectedDaysOfInventoryTable />
      <OrderSummary />
      <OrderPlanningMeta />
      <OrderProducts />
      <ProgressBar
        fetchProgress={fetchRefreshProgress}
        progress={refreshProgress}
        shouldFetchProgress={isFetchingProgressForRefresh}
      />
    </main>
  );
};

const mapStateToProps = (state: any) => ({
  refreshProgress: getRefreshProgress(state),
  isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
  activePurchaseOrder: getActivePurchaseOrder(state),
  activeDraftOrderTemplate: getActiveDraftOrderTemplate(state),
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanning);
