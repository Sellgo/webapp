import { GraphDataSeries } from './SalesProjection';

export interface Foo {
  bar: number;
}

export interface SubChartSettings {
  types: string[];
  start_date: string;
  end_date: string;
  granularity: number;
}

export interface Chart {
  total: number;
  data: GraphDataSeries[];
}
