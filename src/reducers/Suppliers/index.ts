import { setIn } from '../../utils/immutablity';
import { AnyAction } from 'redux';
import {
  SET_SUPPLIERS,
  RESET_SUPPLIERS,
  UPDATE_SUPPLIER,
  ADD_SUPPLIER,
  SET_SUPPLIERS_TABLE_COLUMNS,
  SET_SUPPLIERS_TABLE_TAB,
  SET_TIME_EFFICIENCY,
  SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION,
  SET_SAVE_ADD_NEW_SEARCH,
} from '../../constants/Suppliers';
import { Suppliers } from '../../actions/Suppliers';
import keyBy from 'lodash/keyBy';
import get from 'lodash/get';
import { Supplier } from '../../interfaces/Supplier';

const initialState = {
  supplierIds: [-1],
  suppliersById: {},
  suppliersTableColumns: {},
  suppliersTableTab: 'all',
  timeEfficiency: [],
  newSupplier: null,
  newSearchName: null,
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

    case RESET_SUPPLIERS: {
      return { ...state, ...{ supplierIds: [-1], suppliersById: {} } };
    }

    case SET_SUPPLIERS_TABLE_TAB: {
      return setIn(state, 'suppliersTableTab', action.payload);
    }

    case SET_SUPPLIERS_TABLE_COLUMNS: {
      return setIn(state, 'suppliersTableColumns', {
        ...get(state, 'suppliersTableColumns'),
        ...action.payload,
      });
    }

    case SET_TIME_EFFICIENCY:
      return setIn(state, 'timeEfficiency', action.payload);

    case SET_SAVE_SUPPLIER_NAME_AND_DESCRIPTION:
      return setIn(state, 'newSupplier', action.payload.id);

    case SET_SAVE_ADD_NEW_SEARCH:
      return setIn(state, 'newSearchName', action.payload.id);

    default:
      return state;
  }
};
