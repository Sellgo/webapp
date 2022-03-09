import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import SellerDatabaseIcon from '../Icons/SellerResearch/SellerDatabase';
import SellerFinderIcon from '../Icons/SellerResearch/SellerFinder';
import SellerMapIcon from '../Icons/SellerResearch/SellerMap';

import KeywordFinderIcon from '../Icons/KeywordResearch/KeywordFinder';
import KeywordDatabaseIcon from '../Icons/KeywordResearch/KeywordDatabase';
import KeywordTrackerIcon from '../Icons/KeywordResearch/KeywordTracker';
import ZapierIcon from '../Icons/KeywordResearch/Zapier';

import ProductDatabaseIcon from '../Icons/ProductResearch/ProductDatabase';
import ProductTrackerIcon from '../Icons/ProductResearch/ProductTracker';

import SalesEstimationIcon from '../Icons/PerfectStock/SalesEstimation';
import OrderPlanningIcon from '../Icons/PerfectStock/Order Planning';
import TplIcon from '../Icons/PerfectStock/TPL';
import PerfectStockHomeIcon from '../Icons/PerfectStock/Home';

import BetaLabel from '../BetaLabel';
import ComingSoonLabel from '../ComingSoonLabel';

interface Props {
  label: string;
  icon:
    | 'Seller Database'
    | 'Seller Finder'
    | 'Seller Map'
    | 'Product Database'
    | 'Product Tracker'
    | 'Keyword Finder'
    | 'Keyword Database'
    | 'Keyword Tracker'
    | 'Zapier'
    | 'Sales Estimation'
    | 'Order Planning'
    | 'Tpl'
    | 'Perfect Stock Home';
  isActive?: boolean;
  className?: string;
  activeClassName?: string;
  isBeta?: boolean;
  isDisabled?: boolean;
  isIncoming?: boolean;
}

const ProductLabel = (props: Props) => {
  const {
    label,
    icon,
    isActive,
    className,
    activeClassName,
    isBeta,
    isIncoming,
    isDisabled,
  } = props;

  const iconFill = isActive ? '#323232' : '#636D76';
  let iconPicture;

  switch (icon) {
    case 'Seller Database':
      iconPicture = <SellerDatabaseIcon fill={iconFill} />;
      break;

    case 'Seller Map':
      iconPicture = <SellerMapIcon fill={iconFill} />;
      break;

    case 'Seller Finder':
      iconPicture = <SellerFinderIcon fill={iconFill} />;
      break;

    case 'Keyword Database':
      iconPicture = <KeywordDatabaseIcon fill={iconFill} />;
      break;

    case 'Keyword Finder':
      iconPicture = <KeywordFinderIcon fill={iconFill} />;
      break;

    case 'Keyword Tracker':
      iconPicture = <KeywordTrackerIcon fill={iconFill} />;
      break;

    case 'Zapier':
      iconPicture = <ZapierIcon fill={iconFill} />;
      break;

    case 'Product Database':
      iconPicture = <ProductDatabaseIcon fill={iconFill} />;
      break;

    case 'Product Tracker':
      iconPicture = <ProductTrackerIcon fill={iconFill} />;
      break;

    case 'Sales Estimation':
      iconPicture = <SalesEstimationIcon fill={iconFill} />;
      break;

    case 'Order Planning':
      iconPicture = <OrderPlanningIcon fill={iconFill} />;
      break;

    case 'Tpl':
      iconPicture = <TplIcon fill={iconFill} />;
      break;

    case 'Perfect Stock Home':
      iconPicture = <PerfectStockHomeIcon fill={iconFill} />;
      break;

    default:
      iconPicture = <ProductDatabaseIcon fill={iconFill} />;
      break;
  }
  return (
    <div className={`${styles.productLabel} ${className} ${isActive ? activeClassName : ''}`}>
      {iconPicture}
      <div className={isActive ? styles.gradientWrapper : ''}>
        <div
          className={`
            ${isActive ? `${styles.labelText} ${styles.labelText__active}` : styles.labelText}
            ${isDisabled ? styles.labelText__disabled : ''}
            `}
        >
          {label}
        </div>
      </div>
      {isBeta && <BetaLabel />}
      {isIncoming && <ComingSoonLabel />}
    </div>
  );
};

export default ProductLabel;
