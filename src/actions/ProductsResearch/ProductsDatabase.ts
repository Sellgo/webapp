/* Constants */
import { actionTypes } from '../../constants/ProductResearch/ProductsDatabase';

/* Interfaces */

/* Action to update filters */
export const updateProductsDatabaseFilter = (payload: any) => {
  return {
    type: actionTypes.UPDATE_PRODUCTS_DATABASE_FILTER,
    payload,
  };
};
