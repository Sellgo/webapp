import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'rsuite';
import { Radio } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';
import './toggleReset.scss';

/* Actions */
import { updateSalesProjectionProduct } from '../../../../../actions/PerfectStock/SalesProjection';

/* Selectors */
import { getSellerSubscription } from '../../../../../selectors/Subscription';
/* Components */
import InputWithSaveOptions from '../../../../../components/InputWithSaveOptions';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';
import { SalesProjectionUpdatePayload } from '../../../../../interfaces/PerfectStock/SalesProjection';
import { formatRating } from '../../../../../utils/format';
import AlertModal from '../../../../../components/AlertModal';
import { SellerSubscription } from '../../../../../interfaces/Seller';

/* Utils */
import { isSubscriptionIdFreeTrial } from '../../../../../utils/subscriptions';

interface Props extends RowCell {
  sellerSubscription: SellerSubscription;
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) => void;
}

const SalesPrediction = (props: Props) => {
  const { sellerSubscription, updateSalesProjectionProduct, ...otherProps } = props;
  const { rowData } = otherProps;
  const [isAlertModalOpened, setIsAlertModalOpened] = React.useState<boolean>(false);
  const usingPredictiveSales = rowData.projection_mode === 'predictive';

  const handleSaveManualSales = (updatedSalesProjection: string) => {
    const payload: SalesProjectionUpdatePayload = {
      id: rowData.id,
      updatePayload: {
        manual_sales: parseFloat(updatedSalesProjection),
      },
    };
    updateSalesProjectionProduct(payload);
  };

  const handleChangeProjectionMode = () => {
    if (usingPredictiveSales && isSubscriptionIdFreeTrial(sellerSubscription?.subscription_id)) {
      setIsAlertModalOpened(true);
      return;
    }
    const payload: SalesProjectionUpdatePayload = {
      id: rowData.id,
      updatePayload: {
        projection_mode: usingPredictiveSales ? 'manual' : 'predictive',
      },
    };
    updateSalesProjectionProduct(payload);
  };

  const displayPredictiveSales = formatRating(rowData.predictive_sales) || '';
  const defaultManualSalesPrediction = rowData.manual_sales
    ? rowData.manual_sales
    : rowData.predictive_sales;

  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.salesPrediction} salesPrediction`}
      >
        <Radio
          label={usingPredictiveSales ? 'Predictive' : 'Manual'}
          className={styles.radioSelection}
          checked={usingPredictiveSales}
          onChange={handleChangeProjectionMode}
          toggle
        />
        {usingPredictiveSales ? (
          displayPredictiveSales
        ) : (
          <div className={styles.editManualSales}>
            <InputWithSaveOptions
              isNumber
              isPositiveOnly
              handleSave={handleSaveManualSales}
              defaultValue={defaultManualSalesPrediction}
            />
          </div>
        )}
        <AlertModal
          isOpen={isAlertModalOpened}
          title={'You discovered a Premium feature!'}
          text={'With AiStock paid plan, you can create as many orders as you want'}
          cancelText={'Dismiss'}
          saveText={'Learn More'}
          setIsOpen={(value: boolean) => setIsAlertModalOpened(value)}
          handleCancel={() => setIsAlertModalOpened(false)}
          handleSave={() => window.open('/subscription/payment', '_blank')?.focus()}
        />
      </div>
    </Table.Cell>
  );
};

const mapStateToProps = (state: any) => ({
  sellerSubscription: getSellerSubscription(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) =>
    dispatch(updateSalesProjectionProduct(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SalesPrediction);
