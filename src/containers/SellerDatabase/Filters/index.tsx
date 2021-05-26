import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Dropdown, Input } from 'semantic-ui-react';
import ReactChipInput from 'react-chip-input';
import './index.scss';
import { sellerDatabaseFilters, sellerDatabaseMarket } from '../../../selectors/SellerDatabase';
import {
  fetchSellersDatabase,
  loadFilters,
  SellerDatabaseFilter,
  SellerDatabasePayload,
  updateMarketplace,
  updateSellerDatabaseFilters,
} from '../../../actions/SellerDatabase';
import { connect } from 'react-redux';
import {
  DURATIONS,
  FILTERS,
  SEARCH_TYPE,
  SEARCH_TYPES,
  STATES,
} from '../../../constants/SellerDatabase';
import { defaultMarketplaces } from '../../../constants/Settings';

interface Props {
  updateFilter: (filter: SellerDatabaseFilter) => void;
  loadFilters: () => void;
  filters: SellerDatabaseFilter[];
  fetchSellersDatabase: (payload: SellerDatabasePayload) => void;
  updateMarketplace: (market: string) => void;
  market: string;
}
const Filters = (props: Props) => {
  const {
    updateFilter,
    filters,
    loadFilters,
    fetchSellersDatabase,
    updateMarketplace,
    market,
  } = props;
  const [keyword, setKeyword] = useState('');
  const [searchType, setSearchType] = useState(SEARCH_TYPE.AMAZON_LINK);
  const [state, setState] = useState('');
  const getFilterValue = (type: string): SellerDatabaseFilter => {
    const filter = filters.find(f => f.type === type);
    return filter
      ? filter
      : { active: false, value: null, type, values: [], max: 0, min: 0, duration: '' };
  };
  const inventory = getFilterValue(FILTERS.INVENTORY);
  const ratings = getFilterValue(FILTERS.SELLER_RATINGS);
  const brand = getFilterValue(FILTERS.BRAND);
  // const totalSales = getFilterValue(FILTERS.TOTAL_SALES);
  // const revenue = getFilterValue(FILTERS.REVENUE);
  const reviewRatings = getFilterValue(FILTERS.REVIEW_RATINGS);
  const reviewCount = getFilterValue(FILTERS.REVIEW_COUNT);
  const positiveReview = getFilterValue(FILTERS.POSITIVE_REVIEW);
  const neutralReview = getFilterValue(FILTERS.NEUTRAL_REVIEW);
  const negativeReview = getFilterValue(FILTERS.NEGATIVE_REVIEW);
  const includeBrands = getFilterValue(FILTERS.INCLUDE_BRANDS);
  // const fba = getFilterValue(FILTERS.FBA);
  // const fbm = getFilterValue(FILTERS.FBM);
  const launched = getFilterValue(FILTERS.LAUNCHED);

  const updateInputFilterValue = (update: SellerDatabaseFilter) => {
    updateFilter(update);
  };

  useEffect(() => {
    loadFilters();
  }, []);

  const addBrand = (brand: string) => {
    const brands = includeBrands.values.slice();
    brands.push(brand);
    updateFilter({ ...includeBrands, values: brands });
  };

  const removeBrand = (index: number) => {
    const brands = includeBrands.values.slice();
    brands.splice(index, 1);
    updateFilter({ ...includeBrands, values: brands });
  };

  const states = STATES.map((state: any) => ({
    key: state.code,
    value: state.code,
    text: state.name,
  }));
  const marketplaceOptions = defaultMarketplaces.map(({ name, id, disabled }, key) => {
    return { key, text: name, value: id, disabled };
  });
  return (
    <div className="sd-filters-container">
      <div className="sd-filters">
        <div>
          <div className="sf-filter-container">
            <div className="search-input-container">
              <p className="search-label">SELLER DATABASE</p>
              <Input
                placeholder="Insert search..."
                className="sd-search-input"
                value={keyword}
                onChange={evt => setKeyword(evt.target.value)}
              />
              <Dropdown
                placeholder="Amazon Links"
                className="amazon-links"
                fluid
                selection
                options={SEARCH_TYPES}
                defaultValue={searchType}
                onChange={(evt, { value }: any) => setSearchType(value)}
              />
              <span className="or">Or</span>
              <Dropdown
                placeholder="State"
                fluid
                className="state"
                defaultValue={state}
                onChange={(evt, { value }: any) => setState(value)}
                selection
                options={states}
              />
            </div>
            <p className="filters-label">FILTERS</p>

            <div className="input-search-filters">
              <div>
                <div className="input-filter">
                  <Checkbox
                    checked={inventory.active}
                    onChange={() => updateFilter({ ...inventory, active: !inventory.active })}
                  />
                  <Input
                    placeholder="Min # of Inventory"
                    value={inventory.min ? inventory.min : ''}
                    onChange={evt =>
                      updateInputFilterValue({ ...inventory, min: +evt.target.value })
                    }
                    error={Number.isNaN(inventory.min)}
                  />
                  <Input
                    placeholder="Max # of Inventory"
                    value={inventory.max ? inventory.max : ''}
                    onChange={evt =>
                      updateInputFilterValue({ ...inventory, max: +evt.target.value })
                    }
                    error={Number.isNaN(inventory.max)}
                  />
                </div>
                <div className="input-filter">
                  <Checkbox
                    checked={ratings.active}
                    onChange={() => updateFilter({ ...ratings, active: !ratings.active })}
                  />
                  <Input
                    placeholder="Min Seller Ratings"
                    value={ratings.min > 0 ? ratings.min : ''}
                    onChange={evt => updateInputFilterValue({ ...ratings, min: +evt.target.value })}
                    error={Number.isNaN(ratings.min)}
                  />
                  <Input
                    placeholder="Max Seller Ratings"
                    value={ratings.max > 0 ? ratings.max : ''}
                    onChange={evt => updateInputFilterValue({ ...ratings, max: +evt.target.value })}
                    error={Number.isNaN(ratings.max)}
                  />
                </div>
                <div>
                  <Checkbox
                    checked={brand.active}
                    onChange={() => updateFilter({ ...brand, active: !brand.active })}
                  />
                  <Input
                    placeholder="Min # of Brand"
                    value={brand.min > 0 ? brand.min : ''}
                    onChange={evt => updateInputFilterValue({ ...brand, min: +evt.target.value })}
                    error={Number.isNaN(brand.min)}
                  />
                  <Input
                    placeholder="Max # of Brand"
                    value={brand.max > 0 ? brand.max : ''}
                    onChange={evt => updateInputFilterValue({ ...brand, max: +evt.target.value })}
                    error={Number.isNaN(brand.max)}
                  />
                </div>
                {/*<div className="input-filter">*/}
                {/*  <Checkbox*/}
                {/*    checked={totalSales.active}*/}
                {/*    onChange={() => updateFilter({ ...totalSales, active: !totalSales.active })}*/}
                {/*  />*/}
                {/*  <Input*/}
                {/*    placeholder="Min Total Sales"*/}
                {/*    value={totalSales.min > 0 ? totalSales.min : ''}*/}
                {/*    onChange={evt =>*/}
                {/*      updateInputFilterValue({ ...totalSales, min: +evt.target.value })*/}
                {/*    }*/}
                {/*    error={Number.isNaN(totalSales.min)}*/}
                {/*  />*/}
                {/*  <Input*/}
                {/*    placeholder="Max Total Sales"*/}
                {/*    value={totalSales.max > 0 ? totalSales.max : ''}*/}
                {/*    onChange={evt =>*/}
                {/*      updateInputFilterValue({ ...totalSales, max: +evt.target.value })*/}
                {/*    }*/}
                {/*    error={Number.isNaN(totalSales.max)}*/}
                {/*  />*/}
                {/*</div>*/}
                {/*<div className="input-filter">*/}
                {/*  <Checkbox*/}
                {/*    checked={revenue.active}*/}
                {/*    onChange={() => updateFilter({ ...revenue, active: !revenue.active })}*/}
                {/*  />*/}
                {/*  <Input*/}
                {/*    placeholder="Min Revenue"*/}
                {/*    value={revenue.min > 0 ? revenue.min : ''}*/}
                {/*    onChange={evt => updateInputFilterValue({ ...revenue, min: +evt.target.value })}*/}
                {/*    error={Number.isNaN(revenue.min)}*/}
                {/*  />*/}
                {/*  <Input*/}
                {/*    placeholder="Max Revenue"*/}
                {/*    value={revenue.max > 0 ? revenue.max : ''}*/}
                {/*    onChange={evt => updateInputFilterValue({ ...revenue, max: +evt.target.value })}*/}
                {/*    error={Number.isNaN(revenue.max)}*/}
                {/*  />*/}
                {/*</div>*/}
              </div>

              <div>
                <div className="input-filter">
                  <Checkbox
                    checked={reviewRatings.active}
                    onChange={() =>
                      updateFilter({ ...reviewRatings, active: !reviewRatings.active })
                    }
                  />
                  <Input
                    placeholder="Min Review Ratings"
                    value={reviewRatings.min > 0 ? reviewRatings.min : ''}
                    onChange={evt =>
                      updateInputFilterValue({ ...reviewRatings, min: +evt.target.value })
                    }
                    error={Number.isNaN(reviewRatings.min)}
                  />
                  <Input
                    placeholder="Max Review Ratings"
                    value={reviewRatings.max > 0 ? reviewRatings.max : ''}
                    onChange={evt =>
                      updateInputFilterValue({ ...reviewRatings, max: +evt.target.value })
                    }
                    error={Number.isNaN(reviewRatings.max)}
                  />
                  <Dropdown
                    placeholder="30D"
                    className="list-filter"
                    fluid
                    selection
                    value={reviewRatings.duration}
                    onChange={(evt, { value }: any) =>
                      updateInputFilterValue({ ...reviewRatings, duration: value })
                    }
                    options={DURATIONS}
                  />
                </div>
                <div className="input-filter">
                  <Checkbox
                    checked={reviewCount.active}
                    onChange={() => updateFilter({ ...reviewCount, active: !reviewCount.active })}
                  />
                  <Input
                    placeholder="Min Review Count"
                    value={reviewCount.min > 0 ? reviewCount.min : ''}
                    onChange={evt =>
                      updateInputFilterValue({ ...reviewCount, min: +evt.target.value })
                    }
                    error={Number.isNaN(reviewCount.min)}
                  />
                  <Input
                    placeholder="Max Review Count"
                    value={reviewCount.max > 0 ? reviewCount.max : ''}
                    onChange={evt =>
                      updateInputFilterValue({ ...reviewCount, max: +evt.target.value })
                    }
                    error={Number.isNaN(reviewCount.max)}
                  />
                  <Dropdown
                    placeholder="30D"
                    className="list-filter"
                    fluid
                    selection
                    value={reviewCount.duration}
                    onChange={(evt, { value }: any) =>
                      updateInputFilterValue({ ...reviewCount, duration: value })
                    }
                    options={DURATIONS}
                  />
                </div>
                <div className="input-filter">
                  <Checkbox
                    checked={positiveReview.active}
                    onChange={() =>
                      updateFilter({ ...positiveReview, active: !positiveReview.active })
                    }
                  />
                  <Input
                    placeholder="Min Positive Review"
                    value={positiveReview.min > 0 ? positiveReview.min : ''}
                    onChange={evt =>
                      updateInputFilterValue({ ...positiveReview, min: +evt.target.value })
                    }
                    error={Number.isNaN(positiveReview.min)}
                  />
                  <Input
                    placeholder="Max Positive Review"
                    value={positiveReview.max > 0 ? positiveReview.max : ''}
                    onChange={evt =>
                      updateInputFilterValue({ ...positiveReview, max: +evt.target.value })
                    }
                    error={Number.isNaN(positiveReview.max)}
                  />
                  <Dropdown
                    placeholder="30D"
                    className="list-filter"
                    fluid
                    selection
                    value={positiveReview.duration}
                    onChange={(evt, { value }: any) =>
                      updateInputFilterValue({ ...positiveReview, duration: value })
                    }
                    options={DURATIONS}
                  />
                </div>
                <div className="input-filter">
                  <Checkbox
                    checked={neutralReview.active}
                    onChange={() =>
                      updateFilter({ ...neutralReview, active: !neutralReview.active })
                    }
                  />
                  <Input
                    placeholder="Min Neutral Review"
                    value={neutralReview.min > 0 ? neutralReview.min : ''}
                    onChange={evt =>
                      updateInputFilterValue({ ...neutralReview, min: +evt.target.value })
                    }
                    error={Number.isNaN(neutralReview.min)}
                  />
                  <Input
                    placeholder="Max Neutral Review"
                    value={neutralReview.max > 0 ? neutralReview.max : ''}
                    onChange={evt =>
                      updateInputFilterValue({ ...neutralReview, max: +evt.target.value })
                    }
                    error={Number.isNaN(neutralReview.max)}
                  />
                  <Dropdown
                    placeholder="30D"
                    className="list-filter"
                    selection
                    fluid
                    value={neutralReview.duration}
                    onChange={(evt, { value }: any) =>
                      updateInputFilterValue({ ...neutralReview, duration: value })
                    }
                    options={DURATIONS}
                  />
                </div>
                <div className="input-filter">
                  <Checkbox
                    checked={negativeReview.active}
                    onChange={() =>
                      updateFilter({ ...negativeReview, active: !negativeReview.active })
                    }
                  />
                  <Input
                    placeholder="Min Negative Review"
                    value={negativeReview.min > 0 ? negativeReview.min : ''}
                    onChange={evt =>
                      updateInputFilterValue({ ...negativeReview, min: +evt.target.value })
                    }
                    error={Number.isNaN(negativeReview.min)}
                  />
                  <Input
                    placeholder="Max Negative Review"
                    value={negativeReview.max > 0 ? negativeReview.max : ''}
                    onChange={evt =>
                      updateInputFilterValue({ ...negativeReview, max: +evt.target.value })
                    }
                    error={Number.isNaN(negativeReview.max)}
                  />
                  <Dropdown
                    placeholder="30D"
                    className="list-filter"
                    fluid
                    selection
                    value={negativeReview.duration}
                    onChange={(evt, { value }: any) =>
                      updateInputFilterValue({ ...negativeReview, duration: value })
                    }
                    options={DURATIONS}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="sf-filter-container right-filters-container">
            <div className="marketplace-container">
              <p className="filters-label">Marketplace</p>
              <Dropdown
                placeholder="United States"
                defaultValue={market}
                className="right-filters"
                onChange={(evt, { value }: any) => updateMarketplace(value)}
                selection
                options={marketplaceOptions}
              />
            </div>
            <div className="right-filters-container seller-tier">
              {/*<p className="filters-label">Seller Tier</p>*/}
              <div>
                <div className="checkbox-filter">
                  {/*<Checkbox*/}
                  {/*  label="FBA"*/}
                  {/*  checked={fba.active}*/}
                  {/*  onChange={() => updateFilter({ ...fba, active: !fba.active })}*/}
                  {/*/>*/}
                  <Checkbox
                    radio
                    label="Launched < 1-yr"
                    // className="right-filters"
                    name="launched"
                    checked={launched.value === '<1Y'}
                    onChange={() => updateFilter({ ...launched, value: '<1Y' })}
                  />
                </div>
                <div className="checkbox-filter">
                  {/*<Checkbox*/}
                  {/*  label="FBM"*/}
                  {/*  checked={fbm.active}*/}
                  {/*  onChange={() => updateFilter({ ...fbm, active: !fbm.active })}*/}
                  {/*/>*/}
                  <Checkbox
                    radio
                    label="Launched > 1-yr"
                    // className="right-filters"
                    name="launched"
                    checked={launched.value === '>1Y'}
                    onChange={() => updateFilter({ ...launched, value: '>1Y' })}
                  />
                </div>
              </div>
              <div>
                <p className="filters-label">Include Brands</p>
                <div>
                  <ReactChipInput
                    classes={'multiple-brand-container__wrapper'}
                    chips={includeBrands.values}
                    onSubmit={(value: string) => addBrand(value)}
                    onRemove={(index: number) => removeBrand(index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sd-filter-buttons">
        <Button
          size="small"
          className="reset-btn"
          onClick={() => fetchSellersDatabase({ resetFilters: true })}
        >
          Reset
        </Button>
        <Button
          size="small"
          className="submit-btn"
          onClick={() =>
            fetchSellersDatabase({
              filters: true,
              search: keyword,
              searchType,
              state,
            })
          }
        >
          Find
        </Button>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  filters: sellerDatabaseFilters(state),
  market: sellerDatabaseMarket(state),
});

const mapDispatchToProps = {
  loadFilters: () => loadFilters(),
  updateFilter: (filter: SellerDatabaseFilter) => updateSellerDatabaseFilters(filter),
  fetchSellersDatabase: (payload: SellerDatabasePayload) => fetchSellersDatabase(payload),
  updateMarketplace: (market: string) => updateMarketplace(market),
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
