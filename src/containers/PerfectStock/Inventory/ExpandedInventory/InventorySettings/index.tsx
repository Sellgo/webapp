import React from 'react';
import { Radio } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import BoxHeader from '../../../../../components/BoxHeader';
import BoxContainer from '../../../../../components/BoxContainer';
import InputWithSaveOptions from '../../../../../components/InputWithSaveOptions';

/* Interface */
import {
  InventorySkuUpdatePayload,
  ProductConfig,
} from '../../../../../interfaces/PerfectStock/OrderPlanning';

/* COnstants */
import { SIDE_SETTING_WIDTH } from '../../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  productId: number;
  productConfig: ProductConfig | null;
  updateInventorySku: (payload: InventorySkuUpdatePayload) => void;
}

const InventorySettings = (props: Props) => {
  const { productId, productConfig, updateInventorySku } = props;

  return (
    <div className={styles.expandedProductSettings} style={{ width: SIDE_SETTING_WIDTH - 30 }}>
      <BoxHeader className={styles.settingsBoxHeader}>SKU VARIABLES</BoxHeader>
      <BoxContainer className={styles.settingsBoxContainer}>
        {/* <div className={styles.settingWrapper}>
          <Checkbox
            toggle
            checked={false}
            onChange={() => {
              updateInventorySku({ id: productId, is_active: true });
            }}
            label="Set As Active Sku"
            className={styles.settingToggle}
          />
        </div> */}
        <div className={styles.settingWrapper}>
          <p className={styles.settingsTitle}> Cost </p>
          <div className={styles.inputWrapper}>
            <InputWithSaveOptions
              size="large"
              handleSave={(value: string) => {
                updateInventorySku({ id: productId, product_cost: parseFloat(value) });
              }}
              defaultValue={productConfig?.product_cost?.toString() || ''}
              isNumber
              isPositiveOnly
            />
            <p>Per Unit</p>
          </div>
        </div>
        <div className={styles.settingWrapper}>
          <p className={styles.settingsTitle}> MOQ </p>
          <div className={styles.inputWrapper}>
            <InputWithSaveOptions
              size="large"
              handleSave={(value: string) => {
                updateInventorySku({ id: productId, moq: parseInt(value) });
              }}
              defaultValue={productConfig?.moq?.toString() || ''}
              isNumber
              isInteger
              isPositiveOnly
            />
            <p>Units</p>
          </div>
        </div>
        <div className={styles.settingWrapper}>
          <p className={styles.settingsTitle}> Packaging Info </p>
          <div className={styles.inputWrapper}>
            <InputWithSaveOptions
              size="large"
              handleSave={(value: string) => {
                updateInventorySku({ id: productId, carton_count: parseInt(value) });
              }}
              defaultValue={productConfig?.carton_count || ''}
              isNumber
              isPositiveOnly
            />
            <p>Unit(s)/ Carton</p>
          </div>
        </div>
        <div className={styles.settingWrapper}>
          <p className={styles.settingsTitle}> Length </p>
          <div className={styles.inputWrapper}>
            <InputWithSaveOptions
              size="large"
              handleSave={(value: string) => {
                updateInventorySku({ id: productId, length: parseFloat(value) });
              }}
              defaultValue={productConfig?.length || ''}
              isNumber
              isPositiveOnly
            />
            <Radio
              checked={productConfig?.length_unit === 'inch'}
              onChange={() => {
                updateInventorySku({ id: productId, length_unit: 'inch' });
              }}
              label="Inch"
              className={styles.radio}
            />
            <Radio
              checked={productConfig?.length_unit === 'cm'}
              onChange={() => {
                updateInventorySku({ id: productId, length_unit: 'cm' });
              }}
              label="Cm"
              className={styles.radio}
            />
          </div>
        </div>
        <div className={styles.settingWrapper}>
          <p className={styles.settingsTitle}> Width </p>
          <div className={styles.inputWrapper}>
            <InputWithSaveOptions
              size="large"
              handleSave={(value: string) => {
                updateInventorySku({ id: productId, width: parseFloat(value) });
              }}
              defaultValue={productConfig?.width || ''}
              isNumber
              isPositiveOnly
            />
            <Radio
              checked={productConfig?.width_unit === 'inch'}
              onChange={() => {
                updateInventorySku({ id: productId, width_unit: 'inch' });
              }}
              label="Inch"
              className={styles.radio}
            />
            <Radio
              checked={productConfig?.width_unit === 'cm'}
              onChange={() => {
                updateInventorySku({ id: productId, width_unit: 'cm' });
              }}
              label="Cm"
              className={styles.radio}
            />
          </div>
        </div>
        <div className={styles.settingWrapper}>
          <p className={styles.settingsTitle}> Height </p>
          <div className={styles.inputWrapper}>
            <InputWithSaveOptions
              size="large"
              handleSave={(value: string) => {
                updateInventorySku({ id: productId, height: parseFloat(value) });
              }}
              defaultValue={productConfig?.height || ''}
              isNumber
              isPositiveOnly
            />
            <Radio
              checked={productConfig?.height_unit === 'inch'}
              onChange={() => {
                updateInventorySku({ id: productId, height_unit: 'inch' });
              }}
              label="Inch"
              className={styles.radio}
            />
            <Radio
              checked={productConfig?.height_unit === 'cm'}
              onChange={() => {
                updateInventorySku({ id: productId, height_unit: 'cm' });
              }}
              label="Cm"
              className={styles.radio}
            />
          </div>
        </div>
        <div className={styles.settingWrapper}>
          <p className={styles.settingsTitle}> Weight </p>
          <div className={styles.inputWrapper}>
            <InputWithSaveOptions
              size="large"
              handleSave={(value: string) => {
                updateInventorySku({ id: productId, weight: parseFloat(value) });
              }}
              defaultValue={productConfig?.weight || ''}
              isNumber
              isPositiveOnly
            />
            <Radio
              checked={productConfig?.weight_unit === 'lbs'}
              onChange={() => {
                updateInventorySku({ id: productId, weight_unit: 'lbs' });
              }}
              label="Lbs"
              className={styles.radio}
            />
            <Radio
              checked={productConfig?.weight_unit === 'kg'}
              onChange={() => {
                updateInventorySku({ id: productId, weight_unit: 'kg' });
              }}
              label="Kg"
              className={styles.radio}
            />
          </div>
        </div>
      </BoxContainer>
    </div>
  );
};

export default InventorySettings;
