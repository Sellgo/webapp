import { GraphDataSeries } from './SalesProjection';

export interface Foo {
  bar: number;
}

export interface SubChartSettings {
  types: string[];
  start_time: string;
  end_time: string;
  granularity: number;
}

export interface Chart {
  total: number;
  data: GraphDataSeries[];
}
