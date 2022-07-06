import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* Actions */
import { fetchTplSkuData } from '../../../../actions/PerfectStock/Tpl';

/* Interfaces */
import { TplVendor } from '../../../../interfaces/PerfectStock/Tpl';

/* Selectors */

/* Containers */
import TplMeta from './TplMeta';
import TplTable from './TplTable';
import TplSettings from './TplSettings';
import {
  getIsLoadingTplSkuData,
  getTplActiveVendor,
  getTplSkuData,
} from '../../../../selectors/PerfectStock/Tpl';

/* Utils */
import { downloadFile } from '../../../../utils/download';
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';
import { error, success } from '../../../../utils/notifications';

interface Props {
  fetchTplSkuData: () => void;
  activeTplVendor: TplVendor;
  tplSkuData: any;
  isLoadingTplSkuData: boolean;
}

const TPLVendor = (props: Props) => {
  const { fetchTplSkuData, activeTplVendor, tplSkuData, isLoadingTplSkuData } = props;

  const [exportLoading, setExportLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    fetchTplSkuData();
  }, [activeTplVendor.id]);

  const handleOnExport = async () => {
    setExportLoading(true);
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/export`;
      const { data } = await axios.post(url, {
        type: 'tpl_mgr',
        vendor_id: activeTplVendor.id,
      });
      const exportUrl = data.report_xlsx_url;
      await downloadFile(exportUrl);
      success('File successfully downloaded');
    } catch (err) {
      error('Failed to export file');
      console.error(err);
    }
    setExportLoading(false);
  };

  return (
    <main>
      <TplSettings />
      <TplMeta
        label="Export FBA Shipping Quantity"
        loading={exportLoading}
        onButtonClick={handleOnExport}
      />
      <TplTable tplSkuData={tplSkuData} isLoadingTplSkuData={isLoadingTplSkuData} />
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    activeTplVendor: getTplActiveVendor(state),
    tplSkuData: getTplSkuData(state),
    isLoadingTplSkuData: getIsLoadingTplSkuData(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTplSkuData: () => dispatch(fetchTplSkuData()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TPLVendor);
