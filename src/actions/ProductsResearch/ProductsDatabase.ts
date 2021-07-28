/* Constants */
import { actionTypes } from '../../constants/ProductResearch/ProductsDatabase';

/* Action to update filters */
export const updateProductsDatabaseFilter = (payload: any) => {
  return {
    type: actionTypes.UPDATE_PRODUCTS_DATABASE_FILTER,
    payload,
  };
};
