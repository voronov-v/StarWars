export type graphDataType = {
  Cur_ID: number;
  Cur_OfficialRate: number;
  Date: Date;
};

export type onChartIntervalChangeType = (shortName?: string, curr?: number) => void;
