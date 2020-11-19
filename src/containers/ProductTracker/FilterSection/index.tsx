import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import './index.scss';
import { DEFAULT_PERIOD, filterPeriods } from '../../../constants/Tracker';
import _ from 'lodash';
import { Button, Icon, Popup } from 'semantic-ui-react';
import PresetFilter from '../../../components/ProductTrackerFilter/PresetFilter';

interface FilterSectionProps {
  subscriptionPlan: any;
  applyPresetFilter: (data: any) => void;
  localFilterData: any;
  resetPreset: () => void;
  resetSingleFilter: (data: any, type: any) => void;
  setProfitability: (data: any) => void;
  setPeriod: (data: any) => void;
  filteredRanges: any;
  periodValue: any;
}
export class FilterSection extends React.Component<FilterSectionProps, any> {
  constructor(props: FilterSectionProps) {
    super(props);
    this.state = {
      openPresetFilter: false,
    };
  }

  // componentDidMount() {}

  togglePresetFilter = (data: boolean) => {
    this.setState({ openPresetFilter: data });
  };

  render() {
    const { openPresetFilter } = this.state;
    const {
      setPeriod,
      applyPresetFilter,
      resetPreset,
      localFilterData,
      resetSingleFilter,
    } = this.props;

    const periodValue = JSON.parse(localStorage.getItem('trackerPeriod') || `${DEFAULT_PERIOD}`);
    return (
      <div className="tracker-filter-section">
        <div className="tracker-filter-section__header">
          <div className="tracker-filter-section__header__filters-container">
            {
              <Popup
                on="click"
                open={openPresetFilter}
                onOpen={() => this.togglePresetFilter(true)}
                onClose={() => this.togglePresetFilter(false)}
                position="bottom left"
                className="pt-preset-filter-popup"
                basic={true}
                trigger={
                  <Button
                    basic
                    icon
                    labelPosition="left"
                    className={`more-filter`}
                    onClick={() => {
                      this.togglePresetFilter(!openPresetFilter);
                    }}
                  >
                    <span className="filter-name">More</span>
                    <Icon name="angle down" />
                  </Button>
                }
                content={
                  <PresetFilter
                    togglePresetFilter={this.togglePresetFilter}
                    applyFilter={applyPresetFilter}
                    filterData={localFilterData}
                    resetPreset={resetPreset}
                    resetSingleFilter={resetSingleFilter}
                  />
                }
              />
            }

            {/* <ProfitabilityFilterPreset
              setProfitability={setProfitability}
              filterData={localFilterData}
              filteredRanges={filteredRanges}
            /> */}
          </div>
          <div className="tracker-filter-section__header__period-container">
            {_.map(filterPeriods.data, period => {
              return (
                <div
                  className={`tracker-filter-section__header__period-container__period-items ${period.value ===
                    periodValue && 'active'}`}
                  key={period.dataKey}
                >
                  <span
                    onClick={() => {
                      setPeriod(period.value);
                    }}
                  >
                    {period.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  supplierDetails: get(state, 'supplier.details'),
  filteredProducts: get(state, 'supplier.filteredProducts'),
  stickyChartSelector: get(state, 'supplier.setStickyChart'),
  scrollTopSelector: get(state, 'supplier.setScrollTop'),
  subscriptionPlan: get(state, 'subscription.plan'),
  subscriptionType: get(state, 'subscription.subscriptionType'),
});

export default connect(mapStateToProps)(FilterSection);
