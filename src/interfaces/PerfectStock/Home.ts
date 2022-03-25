import { GraphDataSeries } from './SalesProjection';

export interface Foo {
  bar: number;
}

export interface SubChartSettings {
  types: string[];
  start_time: Date;
  end_time: Date;
  granularity: number;
}

export interface Chart {
  total: number;
  data: GraphDataSeries[];
}
