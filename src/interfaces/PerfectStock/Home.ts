import { GraphDataSeries } from './SalesProjection';

export interface Foo {
  bar: number;
}

export interface SubChartSettings {
  types: string[];
}

export interface Chart {
  total: number;
  data: GraphDataSeries[];
}
