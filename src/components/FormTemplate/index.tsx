import React from 'react';

/* Components */
import FormField from './FormField';

/* Constants */
import {
  DEFAULT_US_MARKET,
  SELLER_DB_MARKETPLACE,
} from '../../constants/SellerResearch/SellerDatabase';

/* Styles */
import styles from './styles.module.scss';

interface Props {
  onChangeHandler: (id: string, value: string | number, formData: any) => void;
  formInputs: any;
  formData: any;
}

const FormTemplate = (props: Props) => {
  const { onChangeHandler, formInputs, formData } = props;
  return (
    <div>
      {formInputs &&
        formInputs.length > 0 &&
        formInputs.map(({ formRow }: any, rowIndex: number) => (
          <div
            key={rowIndex}
            className={
              formRow.length > 1
                ? `${styles.requestForm} ${styles.requestForm__rows}`
                : `${styles.requestForm}`
            }
          >
            {formRow.map((item: any, colIndex: number) => {
              const {
                label,
                type,
                id,
                placeholder,
                isNumber,
                isPositiveOnly,
                allow5Decimal,
                options,
                disabled,
                width,
                showDollar,
              } = item;
              return (
                <div
                  key={colIndex}
                  className="request-form__col"
                  style={{
                    width: `${width}px`,
                    margin: '0 40px 0 0',
                  }}
                >
                  <FormField
                    options={options}
                    value={formData ? formData[id] : ''}
                    label={label}
                    placeholder={placeholder}
                    id={id}
                    fieldType={type}
                    disabled={disabled}
                    onChangeHandler={(id, value) => {
                      onChangeHandler(id, value, formData);
                    }}
                    isNumber={!!isNumber}
                    isPositiveOnly={!!isPositiveOnly}
                    allow5Decimal={!!allow5Decimal}
                    defaultUsMarket={DEFAULT_US_MARKET}
                    sellerDbMarketPlace={SELLER_DB_MARKETPLACE}
                    showDollar={showDollar}
                  />
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default FormTemplate;
