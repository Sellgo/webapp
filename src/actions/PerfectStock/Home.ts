import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Constants */
import { actionTypes } from '../../constants/PerfectStock/Home';

/* Interfaces */
import { SubChartSettings, Chart } from '../../interfaces/PerfectStock/Home';
import { getSubChartSettings } from '../../selectors/PerfectStock/Home';

/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';
// import { error, success } from '../../utils/notifications';

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
export const fetchTopGraph = () => async (dispatch: any) => {
  dispatch(isLoadingTopChart(true));
  try {
    const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/cash-flow-chart`;
    const { data } = await axios.get(url);
    if (data) {
      const chartData = data.results.map((item: any) => [
        new Date(item.date).getTime(),
        parseFloat(item.amount),
      ]);

      dispatch(
        setMainChart({
          total: data.total,
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
export const fetchSubCharts = () => async (dispatch: any, getState: any) => {
  dispatch(isLoadingSubCharts(true));
  const state = getState();
  const chartSettings: SubChartSettings = getSubChartSettings(state);
  const type = chartSettings.types.join(',');
  const dates = '&start_time=2022-03-15&end_time=2022-05-15';
  console.log(type, dates);
  try {
    const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/cash-flow-chart`;
    const { data } = await axios.get(url);
    const graphData = data.results.map((item: any) => [
      new Date(item.date).getTime(),
      parseFloat(item.amount),
    ]);
    dispatch(
      setSubCharts([
        {
          total: data.total,
          data: [
            {
              name: '',
              type: 'line',
              data: graphData,
            },
          ],
        },
      ])
    );
  } catch (err) {
    dispatch(setSubCharts([]));
    console.error('Error fetching sub charts', err);
  }
  dispatch(isLoadingSubCharts(false));
};
