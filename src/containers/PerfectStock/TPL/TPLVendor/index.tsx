import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* Actions */
import { fetchTplSkuData } from '../../../../actions/PerfectStock/Tpl';

/* Interfaces */
import { DateRange, TplInbound, TplVendor } from '../../../../interfaces/PerfectStock/Tpl';

/* Components */
import TplMeta from './TplMeta';
import TplTable from './TplTable';
import TplGanttChart from './TplGanttChart';

/* Selectors */
import {
  getActiveTplInbound,
  getIsLoadingTplSkuData,
  getTplActiveVendor,
  getTplSkuData,
  getDateRange,
  getTimeSetting,
} from '../../../../selectors/PerfectStock/Tpl';

/* Constants */
import { TimeSetting } from '../../../../constants/PerfectStock/OrderPlanning';
import { TIME_SETTING } from '../../../../constants/PerfectStock/Tpl';

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
  dateRange: DateRange;
  timeSetting: TimeSetting;
  activeTplInbound: TplInbound;
}

const TPLVendor = (props: Props) => {
  const {
    fetchTplSkuData,
    activeTplVendor,
    tplSkuData,
    isLoadingTplSkuData,
    dateRange,
    timeSetting,
    activeTplInbound,
  } = props;

  const [exportLoading, setExportLoading] = React.useState<boolean>(false);
  const [headers, setHeaders] = React.useState<any>([]);

  const generateHeaders = (startDate: Date, endDate: Date) => {
    const DIFF = timeSetting === TIME_SETTING.DAY ? 1 : 7;
    if (startDate && endDate) {
      const dateArray = [];
      let currentDate = startDate;
      while (currentDate <= endDate) {
        const dateString = getDateOnly(currentDate);
        dateArray.push(dateString);
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + DIFF));
      }
      setHeaders(dateArray);
    } else {
      return [];
    }
  };

  React.useEffect(() => {
    fetchTplSkuData();
  }, [activeTplVendor.id, dateRange.startDate, dateRange.endDate, timeSetting, activeTplInbound]);

  React.useEffect(() => {
    if (tplSkuData && tplSkuData.length > 0) {
      const fba_inventories = tplSkuData[0]?.fba_inventories;
      const dateArray = Object.keys(fba_inventories);
      generateHeaders(
        new Date(dateArray[0].replace(/-/g, '/')),
        new Date(dateArray[dateArray.length - 1].replace(/-/g, '/'))
      );
    }
  }, [tplSkuData]);

  const handleOnExport = async () => {
    console.log('inbpund ashipp', activeTplInbound);
    setExportLoading(true);
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/perfect-stock/export`;
      const payload: any = {
        type: 'tpl_mgr',
        vendor_id: activeTplVendor.id,
      };
      if (activeTplInbound.id > 0) {
        payload.inbound_shipping_id = activeTplInbound.id;
      }
      const { data } = await axios.post(url, payload);
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
      <TplGanttChart />
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
    activeTplInbound: getActiveTplInbound(state),
    dateRange: getDateRange(state),
    timeSetting: getTimeSetting(state),
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
