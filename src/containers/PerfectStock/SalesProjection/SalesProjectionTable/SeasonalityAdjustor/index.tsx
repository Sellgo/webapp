import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';
import { SalesProjectionUpdatePayload } from '../../../../../interfaces/PerfectStock/SalesProjection';

/* Components */
import ToggleRadio from '../../../../../components/ToggleRadio';
import EditSeasonalityPopup from '../../ExpandedProduct/EditSeasonalityPopup';
import GraphDisplayButton from '../../../../../components/GraphDisplayButton';

/* Actions */
import { updateSalesProjectionProduct } from '../../../../../actions/PerfectStock/SalesProjection';

interface Props extends RowCell {
  updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) => void;
}

const SeasonalityAdjustor = (props: Props) => {
  const { updateSalesProjectionProduct, ...otherProps } = props;
  const { rowData } = otherProps;
  const [isEditingSeasonality, setIsEditingSeasonality] = React.useState(false);
  const isSeasonalityEnabled =
    rowData.seasonal_adjustment_included === true ||
    rowData.seasonal_adjustment_included === 'true';

  /* ================================== */
  /* Seasonality adjustor toggles */
  /* ================================== */
  const handleSeasonalityAdjustorToggle = (seasonalityAdjustorActivated: boolean) => {
    updateSalesProjectionProduct({
      id: rowData.id,
      updatePayload: {
        seasonal_adjustment_included: seasonalityAdjustorActivated ? 'true' : 'false',
      },
    });
  };

  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.seasonalityAdjustorCell}`}
      >
        <ToggleRadio
          isToggled={isSeasonalityEnabled}
          handleChange={() =>
            handleSeasonalityAdjustorToggle(!rowData.seasonal_adjustment_included)
          }
          label={'Adjustor'}
          className={styles.toggleButton}
        />

        <GraphDisplayButton handleClick={() => setIsEditingSeasonality(true)} />
      </div>
      <EditSeasonalityPopup
        open={isEditingSeasonality}
        setOpenPopup={setIsEditingSeasonality}
        id={rowData.id}
        rowData={rowData}
      />
    </Table.Cell>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSalesProjectionProduct: (payload: SalesProjectionUpdatePayload) =>
      dispatch(updateSalesProjectionProduct(payload)),
  };
};

export default connect(null, mapDispatchToProps)(SeasonalityAdjustor);
