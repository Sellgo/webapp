import React from 'react';
import { connect } from 'react-redux';
import { Progress } from 'semantic-ui-react';

/* Styling */
import '../../../../styles/progressReset.scss';

/* Selectors */
import { getSellerInventoryTableExport } from '../../../../selectors/SellerResearch/SellerInventory';
import { SellerInventoryTableExportPayload } from '../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  sellerInventoryTableExport: SellerInventoryTableExportPayload;
}

const InventoryExportProgress = (props: Props) => {
  const { sellerInventoryTableExport } = props;

  const { showProgress, progress } = sellerInventoryTableExport;

  const progressPercent = Number.parseFloat(String(progress || '0'));

  return (
    <>
      {showProgress && (
        <Progress
          percent={progressPercent || 0}
          progress
          indicating
          className={'defaultProgressBar'}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellerInventoryTableExport: getSellerInventoryTableExport(state),
  };
};

export default connect(mapStateToProps)(InventoryExportProgress);
