import { Map } from 'immutable';
import {
  SET_PRODUCTS,
  SET_SELLERS,
  SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION,
  SET_PRODUCT_TRACK_DATA,
  SET_CHART_VALUES_1,
  SET_CHART_VALUES_2,
  SET_Product_Detail,
  SET_Product_Detail_Chart_Values,
  SET_Product_Detail_Chart_Values_2, SET_TIME_EFFICIENCY, UPDATE_PRODUCT,

} from '../constant/constant';
import { Product, TimeEfficiency } from '../Action/SYNActions';

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
  chart_values_1: [],
  chart_values_2: [],
  product_detail: [],
  product_detail_chart_values: [],
  product_detail_chart_values_2: [],
});

export const SYNReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SELLERS:
      const { data } = action;
      const newState = state.setIn(['suppliers'], data);
      return newState;
    case SET_PRODUCTS:
      const newStateData = state.setIn(['products'], action.data);
      return newStateData;
    case UPDATE_PRODUCT:
      let products = [];
      for (const product of state.get('products')!) {
        if (product.product_id === action.data.product_id) {
          product.tracking_status = action.data.status;
        }
        products.push(product);
      }
      const updatedProducts = state.setIn(['products'], products);
      return updatedProducts;
      return {
        ...state,
        products: products!.map((content, i) =>
          content.product_id === action.data.product_id
            ? { ...content, tracking_status: action.data.status }
            : content,
        ),
      };

    case SET_TIME_EFFICIENCY:
      const timeEfficiencyState = state.setIn(['time_efficiency_data'], action.data);
      return timeEfficiencyState;
    case SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION:
      const new_supplier = state.setIn(['new_supplier'], action.data.id);
      return new_supplier;
    case SET_PRODUCT_TRACK_DATA:
      const set_product_track_data = state.setIn(['products_track_data'], action.data);
      return set_product_track_data;
    case SET_CHART_VALUES_1:
      const set_chart_values_1 = state.setIn(['chart_values_1'], action.data);
      return set_chart_values_1;
    case SET_CHART_VALUES_2:
      const set_chart_values_2 = state.setIn(['chart_values_2'], action.data);
      return set_chart_values_2;
    case SET_Product_Detail:
      const product_detail = state.setIn(['product_detail'], action.data);
      return product_detail;
    case SET_Product_Detail_Chart_Values:
      const product_detail_chart_values = state.setIn(['product_detail_chart_values'], action.data);
      return product_detail_chart_values;
    case SET_Product_Detail_Chart_Values_2:
      const product_detail_chart_values_2 = state.setIn(['product_detail_chart_values_2'], action.data);
      return product_detail_chart_values_2;
    default:
      return state;
  }
};
