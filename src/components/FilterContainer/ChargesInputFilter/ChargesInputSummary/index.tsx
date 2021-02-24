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
        Selling Price:<span>${summaryDetails.price}</span>
      </p>
      <p>
        Amazon Fees:<span>-${summaryDetails.fees}</span>
      </p>
      <p>
        Inbound Shipping:
        <span>-${filters.inbound_shipping * summaryDetails.multipack_quantity || 0}</span>
      </p>
      <p>
        Outbound Shipping:
        <span>-${filters.outbound_shipping * summaryDetails.multipack_quantity || 0}</span>
      </p>
      <p>
        Prep Fee:<span>-${filters.prep_fee * summaryDetails.multipack_quantity || 0}</span>
      </p>
      <p>
        Tax % on Sourcing:
        <span>-${(filters.sourcing_tax / 100) * summaryDetails.multipack_cost || 0}</span>
      </p>
      <p>VAT registered:{filters.vat_registered ? <span> &#10003;</span> : <span>{''}</span>}</p>
      <p>
        VAT % deducted from Sell Price:<span>{filters.vat_perc || 0}%</span>
      </p>
      <p>
        Total COGS:<span>-${summaryDetails.multipack_cost}</span>
      </p>
      <p>
        Custom Charge:<span>-${filters.custom_charge || 0}</span>
      </p>
      <p>
        Custom Discount:
        <span>+${(filters.custom_discount / 100) * summaryDetails.multipack_cost || 0}</span>
      </p>
      <div className="divider" />
      <p>
        Profit:<span>${summaryDetails.multipack_profit}</span>
      </p>
    </div>
  );
};

export default InputChargesSummary;
