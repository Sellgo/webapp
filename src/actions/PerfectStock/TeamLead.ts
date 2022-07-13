import axios from 'axios';

/* Config */
import { AppConfig } from '../../config';

/* Constants */
import { actionTypes } from '../../constants/PerfectStock/TeamLead';
/* Selectors */
import { sellerIDSelector } from '../../selectors/Seller';

export const setTeamLeadProjectionId = (payload: number) => {
  return {
    type: actionTypes.SET_TEAM_LEAD_JOB_PROJECTION_ID,
    payload,
  };
};

export const setIsFetchingProgressForTeamLeadJob = (payload: boolean) => {
  return {
    type: actionTypes.SET_IS_FETCHING_PROGRESS_FOR_TEAM_LEAD_JOB,
    payload,
  };
};

export const setRefreshProgress = (payload: number) => {
  return {
    type: actionTypes.SET_REFRESH_PROGRESS,
    payload,
  };
};

export const refreshTeamLeadProjection = (perfect_stock_job_id: number) => async (
  dispatch: any
) => {
  if (perfect_stock_job_id) {
    dispatch(setTeamLeadProjectionId(perfect_stock_job_id));
    dispatch(setIsFetchingProgressForTeamLeadJob(true));
  }
};

/* Action to get refresh progress */
export const fetchRefreshProgress = () => async (dispatch: any, getState: any) => {
  try {
    const sellerId = sellerIDSelector();
    const refreshId = getState().teamLead.teamLeadProjectionId;
    const URL =
      `${AppConfig.BASE_URL_API}sellers/${sellerId}/perfect-stock/job/progress` +
      `?perfect_stock_job_id=${refreshId}`;
    const { data } = await axios.get(URL);

    if (data && data.progress) {
      if (data.status === 'completed') {
        dispatch(setIsFetchingProgressForTeamLeadJob(false));
        dispatch(setTeamLeadProjectionId(-1));
      } else {
        dispatch(setRefreshProgress(parseFloat(data.progress)));
      }
    }
  } catch (err) {
    dispatch(setIsFetchingProgressForTeamLeadJob(false));
    console.error('Error fetching progress for AiStock', err);
  }
};
