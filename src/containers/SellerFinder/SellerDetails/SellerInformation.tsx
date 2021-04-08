import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import SellerSampleLogo from '../../../assets/images/Image 1.png';
import SellerSampleMarketpalce from '../../../assets/images/Ellipse 180.png';

const SellerInformation = () => {
  return (
    <div className="seller-information">
      <div className="action-button-container">
        <div className="action-buttons">
          <Button basic className="check-inventory">
            <Icon name="apple" />
            Check Inventory
          </Button>
          <Icon name={'refresh'} color={'grey'} />
          <span>{' 2 Mins'}</span>
        </div>
      </div>
      <div className="seller-logo-container">
        <img src={SellerSampleLogo} className={'seller-logo'} />
        <div className={'business-details-container'}>
          <div>
            <p className="seller-name">Kikkoman</p>
            <p className={'seller-info'}>{'Business Name:'}</p>
            <p className={'seller-info'}>{'Business Address:'}</p>
          </div>
          <div className="seller-address-container">
            <Icon name={'external'} />
            <p className={'seller-info'}>{'Fantasia Trading LLC'}</p>
            <p className={'seller-info-address'}>
              {'9155 Archibald Ave ste 202 Rancho Cucamonga California, 91730 US'}
            </p>
          </div>
        </div>
      </div>
      <div className={'seller-products-container'}>
        <p className={'seller-product-label'}>{'Seller ID: seller_id'}</p>
        <p className={'seller-product-marketplace'}>
          {'Marketplace:'}{' '}
          <span className="place-image-container">
            <img src={SellerSampleMarketpalce} className="place-image" />
            <img src={SellerSampleMarketpalce} className="place-image" />
            <img src={SellerSampleMarketpalce} className="place-image" />
            <img src={SellerSampleMarketpalce} className="place-image" />
          </span>
        </p>
        <p className={'seller-product-label'}>{'Launched: launched_date'}</p>
        <p className={'seller-product-label'}>
          {'Inventory:'} <span className="value">{'77'}</span>
        </p>
        <p className={'seller-product-label'}>
          {'Brands: Ninja, Hamilton Beach, Keurig, Instant Pot ...'}{' '}
          <span>
            <Icon name={'copy outline'} />
          </span>
        </p>
        <p className={'seller-product-label'}>
          {'ASINs: B07FDJMC9Q, B089TQWJKK, B00939I7EK, ...'}
          {'   '}
          <span>
            <Icon name={'copy outline'} />
          </span>
        </p>
      </div>
      <div className="statistics-container">
        <div className="static-row">
          <div className="head-cell-row" />
          <div className="head-cell">{'30 Days'}</div>
          <div className="head-cell">{'90 Days'}</div>
          <div className="head-cell">{'12 Months'}</div>
          <div className="head-cell">{'LifeTime'}</div>
        </div>
        <div className="static-row">
          <div className="head-cell-row">{'Positive'}</div>
          <div className="cell">{'100%'}</div>
          <div className="cell">{'99%'}</div>
          <div className="cell">{'97%'}</div>
          <div className="cell">{'99%'}</div>
        </div>
        <div className="static-row">
          <div className="head-cell-row">{'Neutral'}</div>
          <div className="cell">{'0%'}</div>
          <div className="cell">{'0%'}</div>
          <div className="cell">{'0%'}</div>
          <div className="cell">{'0%'}</div>
        </div>
        <div className="static-row">
          <div className="head-cell-row">{'Negative'}</div>
          <div className="cell negative">{'0%'}</div>
          <div className="cell negative">{'-1%'}</div>
          <div className="cell negative">{'0%'}</div>
          <div className="cell negative">{'0%'}</div>
        </div>
        <div className="static-row">
          <div className="head-cell-row">{'Count'}</div>
          <div className="cell">{'98'}</div>
          <div className="cell">{'150'}</div>
          <div className="cell">{'150'}</div>
          <div className="cell">{'150'}</div>
        </div>
      </div>
    </div>
  );
};
export default SellerInformation;
