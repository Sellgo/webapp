import { Button, Input, Modal } from 'semantic-ui-react';
import COUNTRY_IMAGE from '../../assets/images/flag_icon.svg';
import { PRODUCT_ID_TYPES } from '../../constants/UploadSupplier';
import React from 'react';
import './index.scss';

interface EditCostModalProps {
  open: boolean;
  product: any;
  onCancel: () => void;
  onEdit: (value: any) => void;
  disabled: boolean;
  onChange: (value: any) => void;
  cost: any;
}
const EditCostModal = (props: EditCostModalProps) => {
  const { open, product, onEdit, onCancel, onChange, disabled, cost } = props;

  return (
    <Modal
      open={open}
      className="edit-cost-modal"
      content={
        <div className="edit-cost-container">
          <div className="product-description-details">
            <div className="product-details-image">
              <img src={product.image_url} alt={'product image'} />
            </div>
            <div>
              <div>
                <h3 className="product-title">{product.title}</h3>
              </div>
              <div className="details">
                <div>
                  <img
                    className="flag-img"
                    src={COUNTRY_IMAGE}
                    alt="product_img"
                    style={{ width: 40 }}
                  />
                </div>
                <div className="asin-details">
                  <p className="asin-text">{product.asin}</p>
                  <p className="asin-sub-text">
                    {PRODUCT_ID_TYPES.filter(pidType => pidType !== 'ASIN')
                      .filter(pidType => pidType.toLowerCase() in product)
                      .map(pidType => product[pidType.toLowerCase()])[0] || ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="edit-cost-fields">
            <div className="cost-labels">
              <div>
                <h5 className="cost-input-label">{'Current cost of Good Sold'}</h5>
              </div>
              <div>
                <h5 className="cost-input-value">{'New cost of Good Sold'}</h5>
              </div>
            </div>
            <div className="cost-values">
              <div className="cost-value">
                <p>${product.product_cost}</p>
              </div>
              <div className="cost-input">
                <Input
                  focus
                  onChange={(evt: any, data: any) => {
                    onChange(data.value.trim());
                  }}
                  icon="dollar sign"
                  iconPosition="left"
                />
              </div>
              <div className="action-buttons">
                <Button content="Cancel" basic color="red" onClick={onCancel} />
                <Button
                  content="Save"
                  primary
                  disabled={disabled}
                  onClick={() => onEdit({ ...product, product_cost: cost })}
                />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default EditCostModal;
