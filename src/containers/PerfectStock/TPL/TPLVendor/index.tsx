import React from 'react';
import { connect } from 'react-redux';

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

interface Props {
  fetchTplSkuData: () => void;
  activeTplVendor: TplVendor;
  tplSkuData: any;
  isLoadingTplSkuData: boolean;
}

const TPLVendor = (props: Props) => {
  const { fetchTplSkuData, activeTplVendor, tplSkuData, isLoadingTplSkuData } = props;

  React.useEffect(() => {
    fetchTplSkuData();
  }, [activeTplVendor.id]);

  return (
    <main>
      <TplSettings />
      <TplMeta />
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
