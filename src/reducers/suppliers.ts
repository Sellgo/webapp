import { setIn } from './../utils/immutablity/setIn';
import { Supplier } from './../Action/SYNActions';
import { AnyAction } from 'redux';
import { SET_SUPPLIERS, RESET_SUPPLIERS, UPDATE_SUPPLIER } from '../constant/constant';
import { Suppliers } from '../Action/suppliers';
import keyBy from 'lodash/keyBy';
import get from 'lodash/get';

const initialState = {
  supplierIds: [],
  suppliersById: {},
};

export default (state: Suppliers = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_SUPPLIERS: {
      const newState = setIn(
        state,
        'supplierIds',
        action.payload.map((supplier: Supplier) => supplier.supplier_id)
      );

      const suppliersWithCorrectId = action.payload.map((supplier: Supplier) => ({
        ...supplier,
        id: supplier.supplier_id,
      }));

      const suppliersById = keyBy(
        suppliersWithCorrectId,
        (supplier: Supplier) => supplier.supplier_id
      );

      return setIn(newState, 'suppliersById', suppliersById);
    }

    case UPDATE_SUPPLIER: {
      const supplier: Supplier = action.payload;
      return setIn(state, `suppliersById.${supplier.id}`, {
        ...get(state, `suppliersById.${supplier.id}`),
        ...supplier,
        supplier_id: supplier.id,
      });
    }

    case RESET_SUPPLIERS:
      return initialState;

    default:
      return state;
  }
};
