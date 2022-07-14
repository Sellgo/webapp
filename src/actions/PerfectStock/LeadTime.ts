import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Constants */
import { actionTypes } from '../../constants/PerfectStock/LeadTime';
/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';

export const setLeadTimeProjectionId = (payload: number) => {
  return {
    type: actionTypes.SET_LEAD_TIME_JOB_PROJECTION_ID,
    payload,
  };
};

export const setIsFetchingProgressForLeadTimeJob = (payload: boolean) => {
  return {
    type: actionTypes.SET_IS_FETCHING_PROGRESS_FOR_LEAD_TIME_JOB,
    payload,
  };
};

export const setRefreshProgress = (payload: number) => {
  return {
    type: actionTypes.SET_REFRESH_PROGRESS,
    payload,
  };
};

export const refreshLeadTimeProjection = (perfect_stock_job_id: number) => async (
  dispatch: any
) => {
  if (perfect_stock_job_id) {
    dispatch(setLeadTimeProjectionId(perfect_stock_job_id));
    dispatch(setIsFetchingProgressForLeadTimeJob(true));
  }
};

/* Action to get refresh progress */
export const fetchRefreshProgress = () => async (dispatch: any, getState: any) => {
  try {
    const sellerId = sellerIDSelector();
    const refreshId = getState().leadTime.leadTimeProjectionId;
    const URL =
      `${AppConfig.BASE_URL_API}sellers/${sellerId}/perfect-stock/job/progress` +
      `?perfect_stock_job_id=${refreshId}`;
    const { data } = await axios.get(URL);

    if (data && data.progress) {
      if (data.status === 'completed') {
        dispatch(setIsFetchingProgressForLeadTimeJob(false));
        dispatch(setLeadTimeProjectionId(-1));
      } else {
        dispatch(setRefreshProgress(parseFloat(data.progress)));
      }
    }
  } catch (err) {
    dispatch(setIsFetchingProgressForLeadTimeJob(false));
    console.error('Error fetching progress for AiStock', err);
  }
};
