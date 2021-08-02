import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import InputFilter from '../../../components/FormFilters/InputFilter';
import FormFilterActions from '../../../components/FormFilters/FormFilterActions';
import MinMaxFilter from '../../../components/FormFilters/MinMaxFilter';

const SellerDatabase = () => {
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(true);

  /* Basic Filters */
  const [sellerName, setSellerName] = useState<string>('');
  const [asins, setAsins] = useState({
    include: '',
    exclude: '',
  });
  const [sellerIds, setSellerIds] = useState({
    include: '',
    exclude: '',
  });

  /* Advanced Filters */
  const [brands, setBrands] = useState({
    include: '',
    exclude: '',
  });
  const [numInventory, setNumInventory] = useState({
    min: '',
    max: '',
  });
  const [numBrands, setNumBrands] = useState({
    min: '',
    max: '',
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState({
    min: '',
    max: '',
  });
  const [totalSales, setTotalSales] = useState({
    min: '',
    max: '',
  });

  return (
    <>
      <section className={styles.filterSection}>
        <div className={styles.basicFilters}>
          <InputFilter
            label="Name"
            placeholder="seperated by comma"
            value={sellerName}
            handleChange={(value: string) => setSellerName(value)}
          />

          <InputFilter
            label="Include ASINs"
            placeholder="seperated by comma"
            value={asins.include}
            handleChange={(value: string) =>
              setAsins(prevState => ({ ...prevState, include: value }))
            }
          />
          <InputFilter
            label="Exclude ASINs"
            placeholder="seperated by comma"
            value={asins.exclude}
            handleChange={(value: string) =>
              setAsins(prevState => ({ ...prevState, exclude: value }))
            }
          />

          <InputFilter
            label="Include Seller IDs"
            placeholder="seperated by comma"
            value={sellerIds.include}
            handleChange={(value: string) =>
              setSellerIds(prevState => ({ ...prevState, include: value }))
            }
          />

          <InputFilter
            label="Exclude Seller IDs"
            placeholder="seperated by comma"
            value={sellerIds.exclude}
            handleChange={(value: string) =>
              setSellerIds(prevState => ({ ...prevState, exclude: value }))
            }
          />
        </div>

        <div className={styles.advancedFilterWrapper}>
          <div
            className={styles.advancedFilterToggle}
            onClick={() => setShowAdvancedFilter(prevState => !prevState)}
          >
            <span>Advanced Filters</span>
            <span>
              {showAdvancedFilter ? <Icon name="chevron up" /> : <Icon name="chevron down" />}
            </span>
          </div>

          {showAdvancedFilter && (
            <div className={styles.showAdvancedFilter}>
              <InputFilter
                label="Include Brands"
                placeholder="seperated by comma"
                value={brands.include}
                handleChange={(value: string) =>
                  setBrands(prevState => ({ ...prevState, include: value }))
                }
              />
              <InputFilter
                label="Exclude Brands"
                placeholder="seperated by comma"
                value={brands.exclude}
                handleChange={(value: string) =>
                  setBrands(prevState => ({ ...prevState, exclude: value }))
                }
              />
              <MinMaxFilter
                label="# of Inventory"
                minValue={numInventory.min}
                maxValue={numInventory.max}
                handleChange={(type: string, value: string) =>
                  setNumInventory(prevState => ({ ...prevState, [type]: value }))
                }
              />
              <MinMaxFilter
                label="# of Brands"
                minValue={numBrands.min}
                maxValue={numBrands.max}
                handleChange={(type: string, value: string) =>
                  setNumBrands(prevState => ({ ...prevState, [type]: value }))
                }
              />
              <MinMaxFilter
                label="Monthly Revenue"
                minValue={monthlyRevenue.min}
                maxValue={monthlyRevenue.max}
                handleChange={(type: string, value: string) =>
                  setMonthlyRevenue(prevState => ({ ...prevState, [type]: value }))
                }
              />

              <MinMaxFilter
                label="Total Sales"
                minValue={totalSales.min}
                maxValue={totalSales.max}
                handleChange={(type: string, value: string) =>
                  setTotalSales(prevState => ({ ...prevState, [type]: value }))
                }
              />
            </div>
          )}
        </div>

        <FormFilterActions
          onFind={() => console.log('Find')}
          onReset={() => console.log('Reset')}
        />
      </section>
    </>
  );
};

export default SellerDatabase;
