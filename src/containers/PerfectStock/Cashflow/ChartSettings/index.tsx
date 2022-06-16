import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Components */
import SelectionFilter from '../../../../components/FormFilters/SelectionFilter';
import InputTabSelection from '../../../../components/InputTabSelection';

/* Constants */
import {
  TIME_RANGE_OPTIONS,
  VALID_PRESET_TIME_RANGE,
  GRANULARITIES,
  getGranularityLabel,
  getGranularityValue,
} from '../../../../constants/PerfectStock/Cashflow';

/* Types */
import { SubChartSettings } from '../../../../interfaces/PerfectStock/Home';
import { fetchSubCharts, setSubChartSettings } from '../../../../actions/PerfectStock/Home';
import { getSubChartSettings } from '../../../../selectors/PerfectStock/Cashflow';
import { getDateOnly } from '../../../../utils/date';

interface Props {
  fetchSubCharts: () => void;
  subChartSettings: SubChartSettings;
  setSubChartSettings: (settings: SubChartSettings) => void;
}

const ChartSettings = (props: Props) => {
  const { subChartSettings, setSubChartSettings, fetchSubCharts } = props;
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<number>(0);
  const startDate = new Date(subChartSettings.start_date);
  const endDate = new Date(subChartSettings.end_date);
  const startEndDate: [Date | undefined, Date | undefined] = [
    new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60000),
    new Date(endDate.getTime() + endDate.getTimezoneOffset() * 60000),
  ];
  const daysBetweenEndAndStart =
    (new Date(subChartSettings.end_date).getTime() -
      new Date(subChartSettings.start_date).getTime()) /
    (1000 * 60 * 60 * 24);

  const handleUpdateTimeRange = (start: Date | undefined, end: Date | undefined) => {
    setSubChartSettings({
      ...subChartSettings,
      start_date: getDateOnly(start),
      end_date: getDateOnly(end),
    });
  };

  React.useEffect(() => {
    if (selectedTimeRange !== 0) {
      const startDate = new Date();
      const endDate = new Date(new Date().getTime() + selectedTimeRange * 24 * 60 * 60 * 1000);
      handleUpdateTimeRange(startDate, endDate);
    }
  }, [selectedTimeRange]);

  /* Update drop down when manually inputting start and end dates */
  React.useEffect(() => {
    if (
      subChartSettings.start_date &&
      subChartSettings.end_date &&
      subChartSettings.start_date === getDateOnly(new Date())
    ) {
      if (VALID_PRESET_TIME_RANGE.includes(daysBetweenEndAndStart)) {
        setSelectedTimeRange(daysBetweenEndAndStart);
        return;
      }
    }
    setSelectedTimeRange(0);
  }, [subChartSettings.start_date, subChartSettings.end_date]);

  /* Refetching when start or end date is updated */
  React.useEffect(() => {
    /* Refetch */
    if (subChartSettings.start_date && subChartSettings.end_date) {
      /*  ==========================  */
      /* Enforce granularity checks */
      /*  ==========================  */

      /* Selects more than 3 months, available options are 7, 14, 30 */
      if (daysBetweenEndAndStart >= 85) {
        if (subChartSettings.granularity < 7) {
          setSubChartSettings({
            ...subChartSettings,
            granularity: 7,
          });
        }
        /* Selects between 30days and 3 months, available options are 1, 7 */
      } else if (daysBetweenEndAndStart >= 28) {
        if (subChartSettings.granularity > 7) {
          setSubChartSettings({
            ...subChartSettings,
            granularity: 7,
          });
        }
        /* Selects less than 30 days, available options are 1 */
      } else {
        setSubChartSettings({
          ...subChartSettings,
          granularity: 1,
        });
      }
    }
  }, [subChartSettings.start_date, subChartSettings.end_date]);

  React.useEffect(() => {
    fetchSubCharts();
  }, [subChartSettings.start_date, subChartSettings.end_date, subChartSettings.granularity]);

  const granularityOptions = GRANULARITIES.map((granularity: any) => {
    /* Gap is more than 3 months */
    if (daysBetweenEndAndStart >= 85) {
      if (granularity.value >= 7) {
        return granularity.text;
      }

      /* Gap is between 30days and 3 months */
    } else if (daysBetweenEndAndStart >= 28) {
      if (granularity.value <= 7) {
        return granularity.text;
      }
      /* Gap is less than 7days */
    } else {
      if (granularity.value === 1) {
        return granularity.text;
      }
    }
    return null;
  });
  return (
    <>
      <div className={styles.exportsContainer}>
        <SelectionFilter
          label=""
          filterOptions={TIME_RANGE_OPTIONS}
          placeholder={''}
          value={selectedTimeRange.toString()}
          handleChange={(value: string) => setSelectedTimeRange(parseInt(value))}
          className={styles.timeRangeSelector}
        />
        <DateRangePicker
          preventOverflow
          className={styles.dateRangePicker}
          value={startEndDate}
          showOneCalendar
          limitEndYear={2}
          character="/"
          onChange={value => handleUpdateTimeRange(value[0], value[1])}
        />

        <InputTabSelection
          className={styles.granularitySelector}
          options={granularityOptions}
          selectedOption={getGranularityLabel(subChartSettings.granularity)}
          setSelectedOption={(option: string) => {
            setSubChartSettings({
              ...subChartSettings,
              granularity: getGranularityValue(option),
            });
          }}
          isPurple
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
    fetchSubCharts: () => {
      dispatch(fetchSubCharts());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartSettings);
