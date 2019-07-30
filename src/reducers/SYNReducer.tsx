import { Map } from 'immutable';
import {
  GET_PRODUCT_TRACK_GROUP,
  SET_CHART_VALUES_PRICE,
  SET_CHART_VALUES_RANK,
  SET_Product_Detail,
  SET_Product_Detail_Chart_Values_Price,
  SET_Product_Detail_Chart_Values_Rank,
  SET_PRODUCT_TRACK_DATA,
  SET_PRODUCTS,
  SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION,
  SET_SELLERS,
  SET_TIME_EFFICIENCY, SYN_RESET_PRODUCT_REDUCED_VALUES,
  UPDATE_PRODUCT, UPLOAD_CSV_RESPONSE,
  UPLOAD_SYNTHESIS_FILE_ID, UPLOAD_SYNTHESIS_PROGRESS_UPDATES,
} from '../constant/constant';

const initialState = Map({
  suppliers: [],
  products: [
    {
      amazon_url: '',
      asin: '',
      id: '',
      image_url: '',
      last_syn: '',
      margin: '',
      product_id: '',
      profit_monthly: '',
      sales_monthly: '',
      title: '',
      tracking_status: '',
      profit: '',
      product_track_id: '',
    },
  ],
  time_efficiency_data: [],
  products_track_data: [],
  new_supplier: null,
  chart_values_price: [],
  chart_values_rank: [],
  product_detail: [],
  product_detail_chart_values_rank: [],
  product_detail_chart_values_price: [],
  productTrackGroup: [],
  synthesisFileID: [],
  synthesisFileProgressUpdates: [],
  uploadCSVResponse: [],
});

export const SYNReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SELLERS:
      const {data} = action;
      return state.setIn(['suppliers'], data);
    case SET_PRODUCTS:
      return state.setIn(['products'], action.data);
    case UPDATE_PRODUCT:
      let products = [];
      for (const product of state.get('products')!) {
        if (product.product_id === action.data.product_id) {
          product.tracking_status = action.data.status;
          product.product_track_id = action.data.id;
        }
        products.push(product);
      }
      return state.setIn(['products'], products);
    case SET_TIME_EFFICIENCY:
      return state.setIn(['time_efficiency_data'], action.data);
    case SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION:
      return state.setIn(['new_supplier'], action.data.id);
    case SET_PRODUCT_TRACK_DATA:
      return state.setIn(['products_track_data'], action.data);
    case SET_CHART_VALUES_PRICE:
      return state.setIn(['chart_values_price'], action.data);
    case SET_CHART_VALUES_RANK:
      return state.setIn(['chart_values_rank'], action.data);
    case SET_Product_Detail:
      return state.setIn(['product_detail'], action.data);
    case SET_Product_Detail_Chart_Values_Rank:
      return state.setIn(['product_detail_chart_values_rank'], action.data);
    case SET_Product_Detail_Chart_Values_Price:
      return state.setIn(['product_detail_chart_values_price'], action.data);
    case GET_PRODUCT_TRACK_GROUP:
      return state.setIn(['productTrackGroup'], action.data);
    case UPLOAD_SYNTHESIS_FILE_ID:
      return state.setIn(['synthesisFileID'], action.data);
    case UPLOAD_SYNTHESIS_PROGRESS_UPDATES:
      return state.setIn(['synthesisFileProgressUpdates'], action.data);
    case UPLOAD_CSV_RESPONSE:
      return state.setIn(['uploadCSVResponse'], action.data);
    case SYN_RESET_PRODUCT_REDUCED_VALUES:
      let updatedState = state.setIn(['synthesisFileProgressUpdates'], {progress: 0});
      updatedState = updatedState.setIn(['synthesisFileID'], {synthesis_file_id: 0});
      updatedState = updatedState.setIn(['productTrackGroup'], [{id: -10}]);
      return updatedState;

    default:
      return state;
  }
};
