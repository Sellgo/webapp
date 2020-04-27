import React from 'react';
import { Modal } from 'semantic-ui-react';
import PieChart from '../../../components/Chart/PieChart';

const PieChartModal = (props: any) => {
  const { supplier, showPieChartModalOpen, handleClose } = props;
  if (!supplier) return <div />;
  const rate = parseFloat(supplier.rate);
  const p2l_ratio = supplier.p2l_ratio - parseFloat(supplier.rate);
  const miss = 100 - supplier.p2l_ratio;
  const chartOptions = {
    title: 'Hit/Miss vs Profitable SKUs',
    name: 'SKUs',
    data: [
      {
        name: 'Profitable SKUs',
        y: rate,
        sliced: true,
        selected: true,
        //RWP: swap color begin
        //color: '#FBC4C4',
        color: '#CAE1F3',
        //RWP: swap color end
      },
      {
        name: 'Hit Non-Profitable SKUs',
        y: p2l_ratio,
        //RWP: swap color begin
        //color: '#CAE1F3',
        color: '#FBC4C4',
        //RWP: swap color end
      },
      {
        name: 'Miss',
        y: miss,
        color: '#ECEBEB',
      },
    ],
  };
  return (
    <Modal size={'small'} open={showPieChartModalOpen} onClose={handleClose} closeIcon={true}>
      <Modal.Content>
        <PieChart options={chartOptions} />
      </Modal.Content>
    </Modal>
  );
};

export default PieChartModal;
