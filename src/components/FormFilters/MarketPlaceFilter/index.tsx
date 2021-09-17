import React from 'react';
import { Dropdown } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { MarketplaceOption } from '../../../interfaces/SellerResearch/SellerDatabase';

interface Props {
  label: string;
  marketplaceDetails: MarketplaceOption;
  marketPlaceChoices: MarketplaceOption[];
  handleChange: (option: MarketplaceOption) => void;
}

const MarketPlaceFilter = (props: Props) => {
  const { label, marketplaceDetails, marketPlaceChoices, handleChange } = props;

  const trigger = (
    <>
      <div className={styles.marketPlaceDropdownTrigger}>
        <img
          src={require(`../../../assets/flags/${marketplaceDetails.code}.png`)}
          alt={marketplaceDetails.text}
        />
        <span>{marketplaceDetails.text}</span>
      </div>
    </>
  );

  return (
    <div className={styles.marketplaceFilter}>
      <p>{label}</p>

      <Dropdown className={styles.marketplaceDropdown} floating scrolling trigger={trigger}>
        <Dropdown.Menu className={styles.marketplaceMenu}>
          {marketPlaceChoices.map(option => {
            return (
              <Dropdown.Item
                key={option.value}
                value={option.value}
                className={styles.marketplaceItem}
                onClick={() => {
                  handleChange(option);
                }}
                disabled={option.disabled}
              >
                <img src={require(`../../../assets/flags/${option.code}.png`)} alt={option.text} />
                <span>{option.text}</span>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default MarketPlaceFilter;
