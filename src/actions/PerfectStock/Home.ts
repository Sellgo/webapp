import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Constants */
import { actionTypes } from '../../constants/PerfectStock/Cashflow';

/* Interfaces */
import { SubChartSettings, Chart } from '../../interfaces/PerfectStock/Home';
import { getSubChartSettings } from '../../selectors/PerfectStock/Cashflow';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';

export const setCashflowOnboardingStatus = (payload: any) => {
  return {
    type: actionTypes.SET_CASHFLOW_ONBOARDING_STATUS,
    payload,
  };
};

/* Action to set loading state for tpl */
export const isLoadingTopChart = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_MAIN_CHART,
    payload,
  };
};

/* Action to set tpl vendors results */
export const isLoadingSubCharts = (payload: boolean) => {
  return {
    type: actionTypes.IS_LOADING_SUB_CHARTS,
    payload,
  };
};

/* Action to set active tpl vendor */
export const setMainChart = (payload: Chart) => {
  return {
    type: actionTypes.SET_MAIN_CHART,
    payload,
  };
};

export const setSubCharts = (payload: Chart[]) => {
  return {
    type: actionTypes.SET_SUB_CHART,
    payload,
  };
};

export const setSubChartSettings = (payload: SubChartSettings) => {
  return {
    type: actionTypes.SET_SUB_CHART_SETTINGS,
    payload,
  };
};
/*********** Async Actions ************************ */
/* Action to fetch products database */
export const fetchTopGraph = (granularity?: number) => async (dispatch: any) => {
  dispatch(isLoadingTopChart(true));
  try {
    const now = new Date();
    const numOfWeeks =
      granularity === 1
        ? 1
        : granularity === 7
        ? 4
        : granularity === 14
        ? 12
        : granularity === 30
        ? 52
        : 1;
    const end_date = now.setDate(now.getDate() + numOfWeeks * 7);

    const dates =
      `?start_date=` +
      `${new Date().toISOString().slice(0, 10)}` +
      `&end_date=${new Date(end_date).toISOString().slice(0, 10)}`;

    const url =
      `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/cash-flow-chart` +
      `${dates}` +
      `${granularity ? `&granularity=${granularity}` : ''}`;

    const { data } = await axios.get(url);

    if (data) {
      const mainGraph = data[0];
      const chartData = mainGraph.data.map((item: any) => [
        new Date(item.date).getTime(),
        parseFloat(item.amount),
      ]);

      dispatch(
        setMainChart({
          total: mainGraph.total,
          data: [
            {
              name: '',
              type: 'line',
              data: chartData,
            },
          ],
        })
      );
    }
  } catch (err) {
    dispatch(
      setMainChart({
        total: 0,
        data: [],
      })
    );
    console.error('Error fetching Tpl', err);
  }
  dispatch(isLoadingTopChart(false));
};

/* Action to fetch products database */
export const fetchSubCharts = (payload?: SubChartSettings) => async (
  dispatch: any,
  getState: any
) => {
  dispatch(isLoadingSubCharts(true));
  const state = getState();
  const chartSettings: SubChartSettings = payload ? payload : getSubChartSettings(state);
  const type = encodeURIComponent(chartSettings.types.join(','));
  const dates =
    `&start_date=` + `${chartSettings.start_date}` + `&end_date=${chartSettings.end_date}`;
  const granularity = `&granularity=${chartSettings.granularity}`;
  try {
    const url = `${
      AppConfig.BASE_URL_API
    }sellers/${sellerIDSelector()}/cash-flow-chart?types=${type}${dates}${granularity}`;
    const { data } = await axios.get(url);
    const subCharts = data.map((chart: any) => {
      const chartData = chart.data.map((item: any) => [
        new Date(item.date).getTime(),
        parseFloat(item.amount),
      ]);
      return {
        total: chart.total,
        data: [
          {
            name: chart.type,
            type: 'column',
            data: chartData,
          },
        ],
      };
    });
    dispatch(setSubCharts(subCharts));
  } catch (err) {
    dispatch(setSubCharts([]));
    console.error('Error fetching sub charts', err);
  }
  dispatch(isLoadingSubCharts(false));
};

/* Action to fetch onboarding status */
export const fetchCashflowOnboardingStatus = () => async (dispatch: any) => {
  try {
    const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/cash-flow-status`;
    const { data, status } = await axios.get(url);
    if (data && status === 200) {
      dispatch(setCashflowOnboardingStatus(data));
    }
  } catch (err) {
    dispatch(setCashflowOnboardingStatus({}));
    console.error('Error fetching onboarding status', err);
  }
};

/* Action to update cashflow onboarding status */
export const updateCashflowOnboardingStatus = (
  onboardingCostId: number,
  newStatus: boolean
) => async (dispatch: any) => {
  try {
    const url = `${
      AppConfig.BASE_URL_API
    }sellers/${sellerIDSelector()}/cash-flow-status/${onboardingCostId}`;
    const payload = {
      is_completed: newStatus,
      id: onboardingCostId,
    };
    const { data, status } = await axios.patch(url, payload);
    if (data && status === 200) {
      dispatch(fetchCashflowOnboardingStatus());
    }
  } catch (err) {
    dispatch(fetchCashflowOnboardingStatus());
    console.error('Error fetching onboarding status', err);
  }
};
