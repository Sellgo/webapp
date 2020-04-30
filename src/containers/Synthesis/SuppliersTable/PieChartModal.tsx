import React from 'react';
import { Modal } from 'semantic-ui-react';
import SupplierHitChart from '../../../components/Chart/SupplierHitChart';

const PieChartModal = (props: any) => {
  const { supplier, showPieChartModalOpen, handleClose } = props;
  if (!supplier) return <div />;
  return (
    <Modal size={'small'} open={showPieChartModalOpen} onClose={handleClose} closeIcon={true}>
      <Modal.Content>
        <SupplierHitChart supplier={supplier} />
      </Modal.Content>
    </Modal>
  );
};

export default PieChartModal;
