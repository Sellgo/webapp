import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { filterSupplierProducts, setLeadsTracker } from '../../../../actions/Suppliers';
import './index.scss';
import _ from 'lodash';
import { Button, List, Image, Popup, Icon } from 'semantic-ui-react';
import LeadsTrackerToggle from '../../../../components/LeadsTrackerToggle';
import { isPlanEnterprise } from '../../../../utils/subscriptions';
import csvIcon from '../../../../assets/images/csv.svg';
import msExcelIcon from '../../../../assets/images/microsoft-excel.png';
import PresetFilter from '../../../../components/FilterContainer/PresetFilter';
import ProfitabilityFilterPreset from '../../../../components/ProfitabilityFilterPreset';

interface FilterSectionProps {
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
  subscriptionType: string;
  supplierDetails: any;
  subscriptionPlan: any;
  setLeadsTracker: (sellerId: number, supplierId: number) => void;
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

  renderExportButtons = () => {
    const { supplierDetails } = this.props;
    return (
      <Popup
        className="export__list"
        trigger={
          <Button
            className={`selection export-wrapper__dropdown`}
            content={<Image src={csvIcon} wrapped={true} />}
            icon="caret down"
          />
        }
        content={
          <List divided>
            <List.Item disabled={_.isEmpty(supplierDetails.report_url_csv)}>
              <a href={supplierDetails.report_url_csv}>
                <Image src={csvIcon} wrapped={true} />
                <span>{`.CSV`}</span>
              </a>
            </List.Item>
            <List.Item disabled={_.isEmpty(supplierDetails.report_url)}>
              <a href={supplierDetails.report_url}>
                <Image src={msExcelIcon} wrapped={true} />
                <span>{`.XSLS`}</span>
              </a>
            </List.Item>
          </List>
        }
        position="bottom center"
        on="click"
        basic
        hideOnScroll
      />
    );
  };
  render() {
    const { openPresetFilter } = this.state;
    const {
      stickyChartSelector,
      scrollTopSelector,
      subscriptionType,
      subscriptionPlan,
      setLeadsTracker,
      supplierDetails,
      applyPresetFilter,
      resetPreset,
      localFilterData,
      resetSingleFilter,
      setProfitability,
      filteredRanges,
    } = this.props;
    const isStickyChartActive = stickyChartSelector ? 'sticky-chart-active' : '';
    const isScrollTop = scrollTopSelector ? 'scroll-top' : '';
    const leadsStatus =
      supplierDetails.leads_tracker_status === null ||
      supplierDetails.leads_tracker_status === 'inactive';
    const isToggle = leadsStatus ? false : true;

    return (
      <div className={`filter-section ${isStickyChartActive} ${isScrollTop}`}>
        <div className="filter-header">
          {' '}
          <div className="filter-header__options">
            <Popup
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
            />

            <ProfitabilityFilterPreset
              setProfitability={setProfitability}
              filterData={localFilterData}
              filteredRanges={filteredRanges}
            />
          </div>
          <div className="leads-export-wrapper">
            <p className={`${!isPlanEnterprise(subscriptionType) && 'hidden'}`}>Leads Tracking</p>
            {isPlanEnterprise(subscriptionPlan) && (
              <LeadsTrackerToggle
                setLeadsTracker={setLeadsTracker}
                seller_id={supplierDetails.seller_id}
                supplier_id={supplierDetails.supplier_id}
                isToggle={isToggle}
              />
            )}
            {this.renderExportButtons()}
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

const mapDispatchToProps = {
  filterProducts: (value: string, filterData: any) => filterSupplierProducts(value, filterData),
  setLeadsTracker: (sellerId: number, supplierId: number) => setLeadsTracker(sellerId, supplierId),
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterSection);
