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

/* Constants */
// import { TIME_SETTING } from '../../../../constants/PerfectStock/Tpl';

/* Utils */
import { getDateOnly } from '../../../../utils/date';
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
  const [headers, setHeaders] = React.useState<any>([]);

  const generateHeaders = (startDate: Date, endDate: Date) => {
    if (startDate && endDate) {
      const dateArray = [];
      let currentDate = startDate;
      while (currentDate <= endDate) {
        const dateString = getDateOnly(currentDate);
        dateArray.push(dateString);
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }
      setHeaders(dateArray);
    } else {
      return [];
    }
  };

  React.useEffect(() => {
    fetchTplSkuData();
  }, [activeTplVendor.id]);

  React.useEffect(() => {
    if (tplSkuData && tplSkuData.length > 0) {
      const fba_inventories = tplSkuData[0]?.fba_inventories;
      const dateArray = Object.keys(fba_inventories);
      generateHeaders(new Date(dateArray[0]), new Date(dateArray[dateArray.length - 1]));
    }
  }, [tplSkuData]);

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
      <TplTable
        tplSkuData={tplSkuData}
        isLoadingTplSkuData={isLoadingTplSkuData}
        dateHeaders={headers}
      />
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
