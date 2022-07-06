import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../components/ActionButton';
import TooltipWrapper from '../../../../components/TooltipWrapper';
import InputTabSelection from '../../../../components/InputTabSelection';
import AistockSelectionFilter from '../../../../components/AistockSelectionFilter';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';

/* Actions */
import {
  refreshInventoryTable,
  setInventoryTableFilters,
} from '../../../../actions/PerfectStock/OrderPlanning';

/* Selectors */
import {
  getActivePurchaseOrder,
  getInventoryTableFilters,
  getInventoryTableUpdateDate,
  getIsFetchingProgressForRefresh,
} from '../../../../selectors/PerfectStock/OrderPlanning';

/* Types */
import {
  PurchaseOrder,
  InventoryTableFilters,
} from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Constants */
import {
  ACTIVE_FILTER_OPTIONS,
  FBA_FILTER_OPTIONS,
} from '../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  setIsEditingSKUs: (isEditingSKUs: boolean) => void;
  activePurchaseOrder: PurchaseOrder;
  tableViewMode: 'Inventory' | 'Stockout' | 'Today';
  setTableViewMode: (tableViewMode: 'Inventory' | 'Stockout' | 'Today') => void;
  inventoryTableFilters: InventoryTableFilters;
  setInventoryTableFilters: (filters: InventoryTableFilters) => void;
}

const OrderPlanningMeta = (props: Props) => {
  const {
    setIsEditingSKUs,
    activePurchaseOrder,
    tableViewMode,
    setTableViewMode,
    inventoryTableFilters,
    setInventoryTableFilters,
  } = props;

  const [hasActivePurchaseOrder, setHasActivePurchaseOrder] = useState(false);

  console.log(hasActivePurchaseOrder, 'hasActivePurchaseOrder');

  useEffect(() => {
    console.log('activePurchaseOrder', activePurchaseOrder);
    if (activePurchaseOrder && activePurchaseOrder.id !== -1) {
      setHasActivePurchaseOrder(true);
    } else {
      setHasActivePurchaseOrder(false);
    }
  }, [activePurchaseOrder?.id]);

  return (
    <>
      <div className={styles.orderPlanningMeta}>
        <div className={styles.filterContainer}>
          <TooltipWrapper tooltipKey="Add/Edit Sku">
            <ActionButton
              variant="secondary"
              type="purpleGradient"
              size="md"
              className={styles.editSkuButton}
              onClick={() => setIsEditingSKUs(true)}
              disabled={!hasActivePurchaseOrder}
            >
              <ThinAddIcon />
              <span>Add/ Edit SKUs</span>
            </ActionButton>
          </TooltipWrapper>
          <AistockSelectionFilter
            filterOptions={ACTIVE_FILTER_OPTIONS}
            value={inventoryTableFilters.active}
            handleChange={(value: string) => {
              setInventoryTableFilters({ ...inventoryTableFilters, active: value });
            }}
            placeholder={''}
          />
          <AistockSelectionFilter
            filterOptions={FBA_FILTER_OPTIONS}
            value={inventoryTableFilters.fba}
            handleChange={(value: string) => {
              setInventoryTableFilters({ ...inventoryTableFilters, fba: value });
            }}
            placeholder={''}
          />
        </div>
        <TooltipWrapper tooltipKey="Toggle Show Days Until Stockout">
          <InputTabSelection
            options={['Inventory', 'Stockout', 'Today']}
            selectedOption={tableViewMode}
            setSelectedOption={setTableViewMode}
            isPurple
            borderless
          />
        </TooltipWrapper>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isFetchingProgressForRefresh: getIsFetchingProgressForRefresh(state),
  inventoryTableUpdateDate: getInventoryTableUpdateDate(state),
  activePurchaseOrder: getActivePurchaseOrder(state),
  inventoryTableFilters: getInventoryTableFilters(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    refreshInventoryTable: () => dispatch(refreshInventoryTable()),
    setInventoryTableFilters: (filters: InventoryTableFilters) =>
      dispatch(setInventoryTableFilters(filters)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanningMeta);
