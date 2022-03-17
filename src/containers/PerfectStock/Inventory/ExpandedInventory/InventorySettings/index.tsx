import React, { useRef } from 'react';
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

/* Utils */
import { cmToInch, inchToCm, kgToLbs, lbsToKg } from '../../../../../utils/format';

interface Props {
  productId: number;
  productConfig: ProductConfig | null;
  updateInventorySku: (payload: InventorySkuUpdatePayload) => void;
}

function usePrevious(value: any) {
  const ref = useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const InventorySettings = (props: Props) => {
  const { productId, productConfig, updateInventorySku } = props;
  const previousValue: any = usePrevious(productConfig);

  /* Auto convert for width */
  React.useEffect(() => {
    let newWidth;
    if (productConfig?.width_unit === 'cm' && previousValue?.width_unit) {
      const { width } = productConfig;
      newWidth = inchToCm(width);
    } else if (productConfig?.width_unit === 'inch' && previousValue?.width_unit) {
      const { width } = productConfig;
      newWidth = cmToInch(width);
    }

    if (newWidth) {
      updateInventorySku({
        id: productId,
        width: newWidth,
      });
    }
  }, [productConfig?.width_unit]);

  /* Auto convert for height */
  React.useEffect(() => {
    let newHeight;
    if (productConfig?.height_unit === 'cm' && previousValue?.height_unit) {
      const { height } = productConfig;
      newHeight = inchToCm(height);
    } else if (productConfig?.height_unit === 'inch' && previousValue?.height_unit) {
      const { height } = productConfig;
      newHeight = cmToInch(height);
    }

    if (newHeight) {
      updateInventorySku({
        id: productId,
        height: newHeight,
      });
    }
  }, [productConfig?.height_unit]);

  /* Auto convert for length */
  React.useEffect(() => {
    let newLength;
    if (productConfig?.length_unit === 'cm' && previousValue?.length_unit) {
      const { length } = productConfig;
      newLength = inchToCm(length);
    } else if (productConfig?.length_unit === 'inch' && previousValue?.length_unit) {
      const { length } = productConfig;
      newLength = cmToInch(length);
    }

    if (newLength) {
      updateInventorySku({
        id: productId,
        length: newLength,
      });
    }
  }, [productConfig?.length_unit]);

  /* Auto convert for weight */
  React.useEffect(() => {
    let newWeight;
    if (productConfig?.weight_unit === 'lbs' && previousValue?.weight_unit) {
      const { weight } = productConfig;
      newWeight = kgToLbs(weight);
    } else if (productConfig?.weight_unit === 'kg' && previousValue?.weight_unit) {
      const { weight } = productConfig;
      newWeight = lbsToKg(weight);
    }

    if (newWeight) {
      updateInventorySku({
        id: productId,
        weight: newWeight,
      });
    }
  }, [productConfig?.weight_unit]);

  return (
    <div className={styles.expandedProductSettings} style={{ width: SIDE_SETTING_WIDTH - 30 }}>
      <BoxHeader className={styles.settingsBoxHeader}>SKU VARIABLES</BoxHeader>
      <BoxContainer className={styles.settingsBoxContainer}>
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
              isInteger
              isPositiveOnly
            />
            <p>Unit(s)/ Carton</p>
          </div>
        </div>
        <div className={styles.settingWrapper}>
          <p className={styles.settingsTitle}> Carton Length </p>
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
              checked={productConfig?.length_unit ? productConfig?.length_unit === 'inch' : true}
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
          <p className={styles.settingsTitle}> Carton Width </p>
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
              checked={productConfig?.width_unit ? productConfig?.width_unit === 'inch' : true}
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
          <p className={styles.settingsTitle}> Carton Height </p>
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
              checked={productConfig?.height_unit ? productConfig?.height_unit === 'inch' : true}
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
          <p className={styles.settingsTitle}> Carton Weight </p>
          <div className={styles.inputWrapper}>
            <InputWithSaveOptions
              size="large"
              handleSave={(value: string) => {
                updateInventorySku({
                  id: productId,
                  weight: parseFloat(value),
                  weight_unit: productConfig?.weight_unit || 'lbs',
                });
              }}
              defaultValue={productConfig?.weight || ''}
              isNumber
              isPositiveOnly
            />
            <Radio
              checked={productConfig?.weight_unit ? productConfig?.weight_unit === 'lbs' : true}
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
