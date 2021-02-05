import React from 'react';
import './index.scss';

interface Props {
  summaryDetails?: any;
}

const InputChargesSummary: React.FC<Props> = ({ summaryDetails }) => {
  const {
    filters = {
      custom_charge: '0.0',
      custom_discount: '0.0',
      inbound_shipping: '0.0',
      outbound_shipping: '0.0',
      prep_fee: '0.0',
      sourcing_tax: '0.0',
      vat_perc: '0.0',
      vat_registered: false,
    },
  } = summaryDetails;

  return (
    <div className="input-charges-summary">
      <h2>Profit Calculation</h2>
      <p>
        Selling Price:<span>-${summaryDetails.price}</span>
      </p>
      <p>
        Inbound Shipping Per Item:<span>-${filters.inbound_shipping || 0}</span>
      </p>
      <p>
        Outbound Shipping Per Item:<span>-${filters.outbound_shipping || 0}</span>
      </p>
      <p>
        Prep Fee Per Item:<span>-${filters.prep_fee || 0}</span>
      </p>
      <p>
        Tax % on Sourcing:<span>{filters.sourcing_tax || 0}%</span>
      </p>
      <p>VAT registered:{filters.vat_registered ? <span> &#10003;</span> : <span>{''}</span>}</p>
      <p>
        VAT % deducted from Sell Price:<span>-{filters.vat_perc || 0}%</span>
      </p>
      <p>
        Custom Charge:<span>-${filters.custom_charge || 0}</span>
      </p>
      <p>
        Custom Discount:<span>-{filters.custom_discount || 0}%</span>
      </p>
      <div className="divider" />
      <p>
        Profit:<span>${summaryDetails.multipack_profit}</span>
      </p>
    </div>
  );
};

export default InputChargesSummary;
