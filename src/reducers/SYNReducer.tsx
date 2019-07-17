import { Map } from 'immutable';
import {
  SET_PRODUCTS,
  SET_SELLERS,
  SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION,
  SET_PRODUCT_TRACK_DATA,
  SET_CHART_VALUES_PRICE,
  SET_CHART_VALUES_RANK,
  SET_Product_Detail,
  SET_Product_Detail_Chart_Values_Rank,
  SET_Product_Detail_Chart_Values_Price, SET_TIME_EFFICIENCY, UPDATE_PRODUCT,

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
  chart_values_price: [],
  chart_values_rank: [],
  product_detail: [],
  product_detail_chart_values_rank: [],
  product_detail_chart_values_price: [],
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
          product.product_track_id = action.data.id;
        }
        products.push(product);
      }
      const updatedProducts = state.setIn(['products'], products);
      return updatedProducts;
      // return {
      //   ...state,
      //   products: products!.map((content, i) =>
      //     content.product_id === action.data.product_id
      //       ? { ...content, tracking_status: action.data.status }
      //       : content,
      //   ),
      // };

    case SET_TIME_EFFICIENCY:
      const timeEfficiencyState = state.setIn(['time_efficiency_data'], action.data);
      return timeEfficiencyState;
    case SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION:
      console.log(action.data);
      const new_supplier = state.setIn(['new_supplier'], action.data.id);
      return new_supplier;
    case SET_PRODUCT_TRACK_DATA:
      const set_product_track_data = state.setIn(['products_track_data'], action.data);
      return set_product_track_data;
    case SET_CHART_VALUES_PRICE:
      const set_chart_values_1 = state.setIn(['chart_values_price'], action.data);
      return set_chart_values_1;
    case SET_CHART_VALUES_RANK:
      const set_chart_values_2 = state.setIn(['chart_values_rank'], action.data);
      return set_chart_values_2;
    case SET_Product_Detail:
      const product_detail = state.setIn(['product_detail'], action.data);
      return product_detail;
    case SET_Product_Detail_Chart_Values_Rank:
      const product_detail_chart_values_rank = state.setIn(['product_detail_chart_values_rank'], action.data);
      return product_detail_chart_values_rank;
    case SET_Product_Detail_Chart_Values_Price:
      const product_detail_chart_values_price = state.setIn(['product_detail_chart_values_price'], action.data);
      return product_detail_chart_values_price;
    default:
      return state;
  }
};
