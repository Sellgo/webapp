import React from 'react';
import { Button, Checkbox, Dropdown, Input } from 'semantic-ui-react';
import './index.scss';
const Filters = () => {
  return (
    <div className="sd-filters-container">
      <div className="sd-filters">
        <div>
          <div className="sf-filter-container">
            <div className="search-input-container">
              <p className="search-label">SELLER DATABASE</p>
              <Input placeholder="Insert search..." className="sd-search-input" />
              <Dropdown
                placeholder="Amazon Links"
                className="amazon-links"
                fluid
                selection
                options={[
                  {
                    key: 'ASIN',
                    text: 'ASIN',
                    value: 'ASIN',
                  },
                  {
                    key: 'Seller ID',
                    text: 'Seller ID',
                    value: 'Seller ID',
                  },
                  {
                    key: 'Seller Name',
                    text: 'Seller Name',
                    value: 'Seller Name',
                  },
                ]}
              />
              <span className="or">Or</span>
              <Dropdown placeholder="State" fluid className="state" selection options={[]} />
            </div>
            <p className="filters-label">FILTERS</p>

            <div className="input-search-filters">
              <div>
                <div className="input-filter">
                  <Checkbox />
                  <Input placeholder="Min # of Inventory" />
                  <Input placeholder="Max # of Inventory" />
                </div>
                <div className="input-filter">
                  <Checkbox />
                  <Input placeholder="Min Seller Ratings" />
                  <Input placeholder="Max Seller Ratings" />
                </div>
                <div>
                  <Checkbox />
                  <Input placeholder="Min # of Brand" />
                  <Input placeholder="Max # of Brand" />
                </div>
                <div className="input-filter">
                  <Checkbox />
                  <Input placeholder="Min Total Sales" />
                  <Input placeholder="Max Total Sales" />
                </div>
                <div className="input-filter">
                  <Checkbox />
                  <Input placeholder="Min Revenue" />
                  <Input placeholder="Max Revenue" />
                </div>
              </div>

              <div>
                <div className="input-filter">
                  <Checkbox />
                  <Input placeholder="Min # of Inventory" />
                  <Input placeholder="Max # of Inventory" />
                  <Dropdown
                    placeholder="30D"
                    className="list-filter"
                    fluid
                    selection
                    options={[]}
                  />
                </div>
                <div className="input-filter">
                  <Checkbox />
                  <Input placeholder="Min Seller Ratings" />
                  <Input placeholder="Max Seller Ratings" />
                  <Dropdown
                    placeholder="30D"
                    className="list-filter"
                    fluid
                    selection
                    options={[]}
                  />
                </div>
                <div className="input-filter">
                  <Checkbox />
                  <Input placeholder="Min # of Brand" />
                  <Input placeholder="Max # of Brand" />
                  <Dropdown
                    placeholder="30D"
                    className="list-filter"
                    fluid
                    selection
                    options={[]}
                  />
                </div>
                <div className="input-filter">
                  <Checkbox />
                  <Input placeholder="Min Total Sales" />
                  <Input placeholder="Max Total Sales" />
                  <Dropdown
                    placeholder="30D"
                    className="list-filter"
                    fluid
                    selection
                    options={[]}
                  />
                </div>
                <div className="input-filter">
                  <Checkbox />
                  <Input placeholder="Min Revenue" />
                  <Input placeholder="Max Revenue" />
                  <Dropdown
                    placeholder="30D"
                    className="list-filter"
                    selection
                    fluid
                    options={[]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="sf-filter-container right-filters">
            <div className="search-input-container right-filters">
              <p className="filters-label">Marketplace</p>
              <Dropdown placeholder="United States" selection options={[]} />
            </div>
            <div className="right-filters seller-tier">
              <p className="filters-label">Seller Tier</p>
              <div>
                <div className="input-filter">
                  <Checkbox label="FBA" />
                  <Checkbox radio label="Launched < 1-yr" className=" right-filters" />
                </div>
                <div className="input-filter">
                  <Checkbox label="FBM" />
                  <Checkbox radio label="Launched > 1-yr" className=" right-filters" />
                </div>
              </div>
              <div>
                <p className="filters-label">Include Brands</p>
                <div>
                  <Input fluid placeholder="Enter brands separated by commas" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sd-filter-buttons">
        <Button size="small" className="reset-btn">
          Reset
        </Button>
        <Button size="small" className="submit-btn">
          Find
        </Button>
      </div>
    </div>
  );
};

export default Filters;
