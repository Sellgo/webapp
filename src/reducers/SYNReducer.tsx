import {
  GET_PRODUCT_TRACK_GROUP,
  SET_CHART_VALUES_PRICE,
  SET_CHART_VALUES_RANK,
  SET_Product_Detail,
  SET_Product_Detail_Chart_Values_Price,
  SET_Product_Detail_Chart_Values_Rank,
  SET_Product_Detail_Chart_Values_Kpi,
  SET_PRODUCT_TRACK_DATA,
  SET_PRODUCTS,
  SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION,
  SET_SELLERS,
  SET_TIME_EFFICIENCY,
  UPDATE_PRODUCT,
  UPLOAD_CSV_RESPONSE,
  UPLOAD_SYNTHESIS_FILE_ID,
} from '../constant/constant';

const initialState = {
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
  product_detail_chart_values_kpi: [],
  productTrackGroup: [{ id: 0 }],
  synthesisFileID: { synthesis_file_id: 0 },
  uploadCSVResponse: [],
};

export const SYNReducer = (state = initialState, action: any) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_SELLERS:
      newState.suppliers = action.data;
      return newState;
    case SET_PRODUCTS:
      newState.products = action.data;
      return newState;
    case UPDATE_PRODUCT:
      const products = [];
      for (const product of state.products) {
        if (product.product_id === action.data.product_id) {
          product.tracking_status = action.data.status;
          product.product_track_id = action.data.id;
        }
        products.push(product);
      }
      newState.products = products;
      return newState;
    case SET_TIME_EFFICIENCY:
      newState.time_efficiency_data = action.data;
      return newState;
    case SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION:
      newState.new_supplier = action.data.id;
      return newState;
    case SET_PRODUCT_TRACK_DATA:
      newState.products_track_data = action.data;
      return newState;
    case SET_CHART_VALUES_PRICE:
      newState.chart_values_price = action.data;
      return newState;
    case SET_CHART_VALUES_RANK:
      newState.chart_values_rank = action.data;
      return newState;
    case SET_Product_Detail:
      newState.product_detail = action.data;
      return newState;
    case SET_Product_Detail_Chart_Values_Rank:
      newState.product_detail_chart_values_rank = action.data;
      return newState;
    case SET_Product_Detail_Chart_Values_Kpi:
      newState.product_detail_chart_values_kpi = action.data;
      return newState;
    case SET_Product_Detail_Chart_Values_Price:
      newState.product_detail_chart_values_price = action.data;
      return newState;
    case GET_PRODUCT_TRACK_GROUP:
      newState.productTrackGroup = action.data;
      return newState;
    case UPLOAD_SYNTHESIS_FILE_ID:
      newState.synthesisFileID = action.data;
      return newState;
    case UPLOAD_CSV_RESPONSE:
      newState.uploadCSVResponse = action.data;
      return newState;
    default:
      return state;
  }
};
