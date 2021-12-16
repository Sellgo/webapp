import React from 'react';

/* Components */
import InventoryTable from './InventoryTable';
import OrderGanttChart from './OrderGanttChart';
import OrderPlanningMeta from './OrderPlanningMeta';

const OrderPlanning = () => {
  return (
    <main>
      <OrderGanttChart />
      <OrderPlanningMeta />
      <InventoryTable />
    </main>
  );
};

export default OrderPlanning;
