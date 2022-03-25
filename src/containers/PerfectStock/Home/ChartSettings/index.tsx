import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Components */
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';

/* Constants */
import { TIME_RANGE_OPTIONS } from '../../../../constants/PerfectStock/Home';

/* Types */
import { SubChartSettings } from '../../../../interfaces/PerfectStock/Home';
import { setSubChartSettings } from '../../../../actions/PerfectStock/Home';
import { getSubChartSettings } from '../../../../selectors/PerfectStock/Home';

interface Props {
  subChartSettings: SubChartSettings;
  setSubChartSettings: (settings: SubChartSettings) => void;
}

const ChartSettings = (props: Props) => {
  const { subChartSettings, setSubChartSettings } = props;
  console.log(setSubChartSettings, subChartSettings);
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<number>(0);
  const [startEndDate, setStartEndDate] = React.useState<any>([undefined, undefined]);
  return (
    <>
      <div className={styles.exportsContainer}>
        <SelectionFilter
          label="Time Range"
          filterOptions={TIME_RANGE_OPTIONS}
          placeholder={''}
          value={selectedTimeRange.toString()}
          handleChange={(value: string) => setSelectedTimeRange(parseInt(value))}
        />
        <DateRangePicker
          preventOverflow
          className={styles.dateRangePicker}
          value={startEndDate}
          showOneCalendar
          limitEndYear={2}
          character="/"
          onChange={value => setStartEndDate(value)}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  subChartSettings: getSubChartSettings(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSubChartSettings: (settings: SubChartSettings) => {
      dispatch(setSubChartSettings(settings));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartSettings);
