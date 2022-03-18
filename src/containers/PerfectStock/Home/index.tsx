import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* Actions */
import { fetchTplVendors, setTplActiveVendor } from '../../../actions/PerfectStock/Tpl';

/* Interfaces */
import { TplVendor } from '../../../interfaces/PerfectStock/Tpl';

/* Selectors */
import { getTplActiveVendor, getTplVendors } from '../../../selectors/PerfectStock/Tpl';

/* Containers */
import TopGraph from './TopGraph';

/* Styles */
import { AppConfig } from '../../../config';
import { sellerIDSelector } from '../../../selectors/Seller';

interface Props {
  fetchTplVendors: () => void;
}

const Home = (props: Props) => {
  const { fetchTplVendors } = props;
  console.log(fetchTplVendors);

  const [topChartData, setTopChartData] = React.useState<[Date, number][]>([]);

  const fetchTopGraph = async () => {
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/cash-flow-chart`;
      const { data } = await axios.get(url);
      const yAxisData = data.map((item: any) => [
        new Date(item.date).getTime(),
        parseFloat(item.balance),
      ]);
      setTopChartData(yAxisData);
    } catch (error) {
      console.log(error);
      setTopChartData([]);
    }
  };

  React.useEffect(() => {
    fetchTopGraph();
  }, []);

  return (
    <main>
      <TopGraph
        data={[
          {
            name: '',
            type: 'line',
            data: topChartData,
          },
        ]}
      />
      <p>Filters</p>
      <br />
      <p>Sub Charts</p>
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    tplVendors: getTplVendors(state),
    activeTplVendor: getTplActiveVendor(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTplVendors: () => dispatch(fetchTplVendors()),
    setTplActiveVendor: (vendor: TplVendor) => dispatch(setTplActiveVendor(vendor)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
