import React from 'react';
import { Button, Icon, Progress } from 'semantic-ui-react';
import { formatString, showNAIfZeroOrNull } from '../../../utils/format';
import { loadingInventory } from '../../../selectors/SellerFinder';
import { connect } from 'react-redux';
import { SEARCH_STATUS } from '../../../constants/SellerFinder';
import { copyToClipboard } from '../../../utils/file';

interface SellerInformationProps {
  details: any;
  onCheckInventory: (data: any) => void;
  loadingInventory: any;
}

const SellerInformation = (props: SellerInformationProps) => {
  const { details, loadingInventory } = props;
  const [copied, setCopied] = React.useState(false);

  const getTotal30DaysReview = () => {
    let review = 0;
    if (details.positive_30_days) {
      review += parseFloat(details.positive_30_days);
    }
    if (details.neutral_30_days) {
      review += parseFloat(details.neutral_30_days);
    }
    if (details.negative_30_days) {
      review += parseFloat(details.negative_30_days);
    }
    return review;
  };

  const getTotal90DaysReview = () => {
    let review = 0;
    if (details.positive_90_days) {
      review += parseFloat(details.positive_90_days);
    }
    if (details.neutral_90_days) {
      review += parseFloat(details.neutral_90_days);
    }
    if (details.negative_90_days) {
      review += parseFloat(details.negative_90_days);
    }
    return review;
  };
  const getTotal365DaysReview = () => {
    let review = 0;
    if (details.positive_12_month) {
      review += parseFloat(details.positive_12_month);
    }
    if (details.neutral_12_month) {
      review += parseFloat(details.neutral_12_month);
    }
    if (details.negative_12_month) {
      review += parseFloat(details.negative_12_month);
    }
    return review;
  };
  const getTotalLifeTimeReview = () => {
    let review = 0;
    if (details.positive_lifetime) {
      review += parseFloat(details.positive_lifetime);
    }
    if (details.neutral_lifetime) {
      review += parseFloat(details.neutral_lifetime);
    }
    if (details.negative_lifetime) {
      review += parseFloat(details.negative_lifetime);
    }
    return review;
  };

  const copyText = (text: string) => {
    copyToClipboard(text).then(() => setCopied(true));
    setTimeout(() => setCopied(false), 500);
  };

  const noInventory = showNAIfZeroOrNull(details.inventory_count, details.inventory_count) === '-';

  return (
    <div className="seller-information">
      <div className="action-button-container">
        <div className="action-buttons">
          <Button
            basic
            className={`check-inventory ${noInventory ? 'check-inventory-disabled' : ''}`}
            onClick={() =>
              props.onCheckInventory({
                payload: JSON.stringify({ merchant_ids: `${details.merchant_id}` }),
                merchant: details,
              })
            }
          >
            <Icon name="apple" />
            Check Inventory
          </Button>
          <Icon
            name={'refresh'}
            color={'grey'}
            disabled={noInventory}
            loading={
              loadingInventory &&
              loadingInventory.status === SEARCH_STATUS.PENDING &&
              details.merchant_id === loadingInventory.merchant_id
            }
          />
          {/*<span>{' 2 Mins'}</span>*/}
        </div>
        {loadingInventory && loadingInventory.status === SEARCH_STATUS.PENDING && (
          <div className="inventory-progress">
            <Progress
              percent={loadingInventory.error_status ? 100 : loadingInventory.progress}
              size="tiny"
              success={!loadingInventory.error_status}
              error={loadingInventory.error_status}
              active={loadingInventory.progress !== 100}
            />
          </div>
        )}
      </div>
      <div className="seller-logo-container">
        {details.merchant_logo && <img src={details.merchant_logo} className={'seller-logo'} />}
        {!details.merchant_logo && <span className={'seller-logo'} />}

        <div className={'business-details-container'}>
          <div>
            <p className="seller-name">{formatString(details.merchant_name)}</p>
            <p className={'seller-info'}>{'Business Name:'}</p>
            <p className={'seller-info'}>{'Business Address:'}</p>
          </div>
          <div className="seller-address-container">
            <Icon name={'external'} onClick={() => window.open(details.inventory_link, '_blank')} />
            <p className={'seller-info'}>{formatString(details.business_name)}</p>
            <p className={'seller-info-address'}>
              {`${formatString(details.address)} ${formatString(details.city)} ${formatString(
                details.state
              )} ${formatString(details.country)}`}
            </p>
          </div>
        </div>
      </div>
      <div className={'seller-products-container'}>
        <p className={'seller-product-label'}>{`Seller ID: ${showNAIfZeroOrNull(
          details.merchant_id,
          details.merchant_id
        )}`}</p>
        <p className={'seller-product-label'}>{`Launched: ${formatString(details.launched)}`}</p>
        <p className={'seller-product-label'}>
          {'Inventory:'}{' '}
          <span className="value">
            {showNAIfZeroOrNull(details.inventory_count, details.inventory_count)}
          </span>
        </p>
        <p className={'seller-product-label label-flex'}>
          Brands: <span className="seller-product-value">{` ${details.brands}`}</span>
          {formatString(details.brands) !== '-' && (
            <span className="tooltip">
              <span className="tooltiptext" id="myTooltip">
                {copied ? 'Copied !' : 'Copy to clipboard'}
              </span>
              <Icon name={'copy outline'} onClick={() => copyText(details.brands)} />
            </span>
          )}
        </p>
        <p className={'seller-product-label label-flex'}>
          ASINs: <span className="seller-product-value">{` ${details.asins}`}</span>
          {formatString(details.asins) !== '-' && (
            <span className="tooltip">
              <span className="tooltiptext" id="myTooltip">
                {copied ? 'Copied !' : 'Copy to clipboard'}
              </span>
              <Icon name={'copy outline'} onClick={() => copyText(details.asins)} />
            </span>
          )}
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
          <div className="cell">{`${
            details.positive_30_days ? details.positive_30_days : 0
          }%`}</div>
          <div className="cell">{`${
            details.positive_90_days ? details.positive_90_days : 0
          }%`}</div>
          <div className="cell">{`${
            details.positive_12_month ? details.positive_12_month : 0
          }%`}</div>
          <div className="cell">{'0%'}</div>
        </div>
        <div className="static-row">
          <div className="head-cell-row">{'Neutral'}</div>
          <div className="cell">{`${details.neutral_30_days ? details.neutral_30_days : 0}%`}</div>
          <div className="cell">{`${details.neutral_90_days ? details.neutral_90_days : 0}%`}</div>
          <div className="cell">{`${
            details.neutral_12_month ? details.neutral_12_month : 0
          }%`}</div>
          <div className="cell">{`${
            details.neutral_lifetime ? details.neutral_lifetime : 0
          }%`}</div>
        </div>
        <div className="static-row">
          <div className="head-cell-row">{'Negative'}</div>
          <div className="cell negative">{`${
            details.negative_30_days ? details.negative_30_days : 0
          }%`}</div>
          <div className="cell negative">{`${
            details.negative_90_days ? details.negative_90_days : 0
          }%`}</div>
          <div className="cell negative">{`${
            details.negative_12_month ? details.negative_12_month : 0
          }%`}</div>
          <div className="cell negative">{`${
            details.negative_lifetime ? details.negative_lifetime : 0
          }%`}</div>
        </div>
        <div className="static-row">
          <div className="head-cell-row">{'Count'}</div>
          <div className="cell">{getTotal30DaysReview()}</div>
          <div className="cell">{getTotal90DaysReview()}</div>
          <div className="cell">{getTotal365DaysReview()}</div>
          <div className="cell">{getTotalLifeTimeReview()}</div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: {}) => ({
  loadingInventory: loadingInventory(state),
});
export default connect(mapStateToProps)(SellerInformation);
