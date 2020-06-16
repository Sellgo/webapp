import { useRef, useEffect } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';

const ProfitFinderChart = (props: any) => {
  const chartComponentRef: any = useRef(null);
  const windowSize = useWindowSize();
  const profitFinderChartOptions = {
    chart: {
      height: 285,
    },
  };

  useEffect(() => {
    if (chartComponentRef && chartComponentRef.current && chartComponentRef.current.chart) {
      const chartHeight =
        windowSize.width && windowSize.width >= 2560
          ? 533
          : windowSize.width && windowSize.width >= 1920
          ? 400
          : windowSize.width && windowSize.width >= 1368
          ? 285
          : null;
      chartComponentRef.current.chart.setSize(undefined, chartHeight);
    }
  });

  const nextProps = { ...props, profitFinderChartOptions, chartComponentRef };
  return props.render(nextProps);
};

export default ProfitFinderChart;
