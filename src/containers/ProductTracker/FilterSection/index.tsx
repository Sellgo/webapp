import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import './index.scss';

interface FilterSectionProps {
  subscriptionPlan: any;
  applyPresetFilter: (data: any) => void;
  localFilterData: any;
  resetPreset: () => void;
  resetSingleFilter: (data: any, type: any) => void;
  setProfitability: (data: any) => void;
  filteredRanges: any;
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
    return (
      <div className="tracker-filter-section">
        <div className="tracker-filter-section__header">
          <div className="tracker-filter-section__header__all-container">
            {`` /* <Popup
              on="click"
              open={openPresetFilter}
              onOpen={() => this.togglePresetFilter(true)}
              onClose={() => this.togglePresetFilter(false)}
              position="bottom left"
              className="pf-preset-filter-popup"
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
            /> */}

            {/* <ProfitabilityFilterPreset
              setProfitability={setProfitability}
              filterData={localFilterData}
              filteredRanges={filteredRanges}
            /> */}
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
