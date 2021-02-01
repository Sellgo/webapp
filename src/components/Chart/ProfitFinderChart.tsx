import { useRef, useEffect, memo } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';

const ProfitFinderChart = (props: any) => {
  const chartComponentRef: any = useRef(null);
  const windowSize = useWindowSize();
  const profitFinderChartOptions = {
    chart: {
      height: 260,
    },
  };

  useEffect(() => {
    if (chartComponentRef && chartComponentRef.current && chartComponentRef.current.chart) {
      const chartHeight =
        windowSize.width && windowSize.width >= 2560
          ? 483
          : windowSize.width && windowSize.width >= 1920
          ? 363
          : windowSize.width && windowSize.width >= 1368
          ? 260
          : null;
      chartComponentRef.current.chart.setSize(undefined, chartHeight);
    }
  });

  const nextProps = { ...props, profitFinderChartOptions, chartComponentRef };
  return props.supplier || props.products.length > 0 ? props.render(nextProps) : null;
};

export default memo(ProfitFinderChart);
