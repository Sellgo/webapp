export interface DataQualityReport {
  upcMissing: number;
  upcNonNumeric: number;
  costMissing: number;
  costInvalid: number;
  msrpMissing: number;
  msrpInvalid: number;
  errorCells: [number, number][];
  totalValidProducts: number;
}
