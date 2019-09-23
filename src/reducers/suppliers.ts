import { setIn } from './../utils/immutablity/setIn';
import { Supplier } from './../Action/SYNActions';
import { AnyAction } from 'redux';
import {
  SET_SUPPLIERS,
  RESET_SUPPLIERS,
  SELECT_SUPPLIER,
  UPDATE_SUPPLIER,
  ADD_SUPPLIER,
  SET_SUPPLIERS_TABLE_COLUMNS,
  SET_SUPPLIERS_TABLE_TAB,
} from '../constant/constant';
import { Suppliers } from '../Action/suppliers';
import keyBy from 'lodash/keyBy';
import get from 'lodash/get';

const initialState = {
  supplierIds: [-1],
  suppliersById: {},
  suppliersTableColumns: {},
  suppliersTableTab: 'all',
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

    case ADD_SUPPLIER: {
      const supplier: Supplier = action.payload;
      const supplierId: number = supplier.id;
      const newState = setIn(state, 'supplierIds', [...get(state, 'supplierIds'), supplierId]);

      const newSupplierById: any = {};
      newSupplierById[supplierId] = {
        ...supplier,
        supplier_id: supplierId,
        progress: -1,
        speed: -1,
      };
      return setIn(newState, 'suppliersById', {
        ...get(state, 'suppliersById'),
        ...newSupplierById,
      });
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
      return { ...state, ...{ supplierIds: [-1], suppliersById: {} } };

    case SET_SUPPLIERS_TABLE_TAB: {
      return setIn(state, 'suppliersTableTab', action.payload);
    }

    case SET_SUPPLIERS_TABLE_COLUMNS: {
      return setIn(state, 'suppliersTableColumns', {
        ...get(state, 'suppliersTableColumns'),
        ...action.payload,
      });
    }

    case SELECT_SUPPLIER: {
      return setIn(state, 'supplier', action.payload);
    }

    default:
      return state;
  }
};
