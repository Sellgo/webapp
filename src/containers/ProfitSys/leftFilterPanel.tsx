import * as React from 'react';
import { Divider, Grid, Dropdown, Checkbox, List } from 'semantic-ui-react';
import AdviceCard from '../../components/AdviceCard';
import FilterSection from '../../components/FilterSection';
import RangeSlider from '../../components/RangeSlider';
import MinMaxInput from '../../components/MinMaxInput';
import CheckboxRangeSlider from '../../components/CheckboxRangeSlider';
import './profitSys.css';

class ProfitSysLeftPanel extends React.Component<any, {}> {
  public render() {
    return (
      <>
        <AdviceCard />
        <p className={'products'}>xxx of xxx products</p>

        <div className="searchDropdown">
          <Dropdown placeholder="Select a Preset" fluid search selection />
        </div>
        <FilterSection title={'Basic KPI'}>
          <RangeSlider title={'Unit Profit'}></RangeSlider>
          <RangeSlider title={'Margin (%)'}></RangeSlider>
          <RangeSlider title={'Units Per Month'}></RangeSlider>
          <RangeSlider title={'ROI/ Return On Investment'}></RangeSlider>
        </FilterSection>
        <FilterSection title={'Revenue'}>
          <MinMaxInput
            title={'Avg Monthly Revenue'}
            minPlaceHolder={'Min Mo Rev'}
            maxPlaceHolder={'Max Mo Rev'}
          />
          <CheckboxRangeSlider title={'ROI Inventory'} />
        </FilterSection>
        <FilterSection title={'Pricing'}>
          <MinMaxInput
            title={'Avg BB price'}
            minPlaceHolder={'Min BB price'}
            maxPlaceHolder={'Max BB price'}
          />
          <CheckboxRangeSlider title={'Price Stability in 30 days'} />
          <Checkbox label={<label>Show Price History</label>} className="customCheck" />
        </FilterSection>
        <FilterSection title={'Seasonal'}>
          <Checkbox label={<label>Show Peak Season</label>} className="customCheck" />
        </FilterSection>
        <FilterSection title={'Rating'}>
          <CheckboxRangeSlider title={'Avg Rating'} />
        </FilterSection>
        <FilterSection title={'Sales'}>
          <MinMaxInput
            title={'Avg Best Seller Rating'}
            minPlaceHolder={'Min BSR'}
            maxPlaceHolder={'Max BSR'}
          />
          <MinMaxInput
            title={'Sales to Review'}
            minPlaceHolder={'Min S2R'}
            maxPlaceHolder={'Max S2R'}
          />
        </FilterSection>
        <FilterSection title={'Sellers'}>
          <List
            className="listDisplay"
            items={[
              <Checkbox label={<label>FBA</label>} className="customCheck" />,
              <Checkbox label={<label>FBM</label>} className="customCheck" />,
              <Checkbox label={<label>Amazon</label>} className="customCheck" />,
            ]}
          />
        </FilterSection>
        <FilterSection title={'Product Tier'}>
          <List
            className="listDisplay"
            items={[
              <Checkbox label={<label>Standard</label>} className="customCheck" />,
              <Checkbox label={<label>Oversize</label>} className="customCheck" />,
              <Checkbox label={<label>Overweight</label>} className="customCheck" />,
            ]}
          />
        </FilterSection>
        <FilterSection title={'Sellability'}>
          <List
            className="listDisplay"
            items={[
              <Checkbox label={<label>Show approval</label>} className="customCheck" />,
              <Checkbox label={<label>Show hazmat</label>} className="customCheck" />,
              <Checkbox label={<label>Show size variation</label>} className="customCheck" />,
              <Checkbox label={<label>Show color variation</label>} className="customCheck" />,
            ]}
          />
        </FilterSection>
        <FilterSection title={'Multi-pack Analysis'}>
          <List
            className="listDisplay"
            items={[
              <Checkbox label={<label>Show multi-pack Analysis</label>} className="customCheck" />,
            ]}
          />
        </FilterSection>
        <FilterSection title={'Review'}>
          <MinMaxInput
            title={'Total Review Count'}
            minPlaceHolder={'Min review'}
            maxPlaceHolder={'Max review'}
          />
          <MinMaxInput
            title={'Avg Review'}
            minPlaceHolder={'Min avg rev'}
            maxPlaceHolder={'Max avg rev'}
          />
          <RangeSlider title={'Avg Review Rate'}></RangeSlider>
        </FilterSection>
      </>
    );
  }
}

export default ProfitSysLeftPanel;
