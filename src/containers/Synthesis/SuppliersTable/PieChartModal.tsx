import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import SupplierHitChart from '../../../components/Chart/SupplierHitChart';

class PieChartModal extends Component<any, any> {
  shouldComponentUpdate(nextProps: any): boolean {
    const { supplier } = this.props;
    return JSON.stringify(supplier) !== JSON.stringify(nextProps.supplier);
  }
  render() {
    const { supplier, showPieChartModalOpen, handleClose } = this.props;
    if (!supplier) return <div />;
    return (
      <Modal size={'small'} open={showPieChartModalOpen} onClose={handleClose} closeIcon={true}>
        <Modal.Content>
          <SupplierHitChart supplier={supplier} />
        </Modal.Content>
      </Modal>
    );
  }
}

export default PieChartModal;
