import React from 'react';
import './index.scss';

interface Props {
  summaryDetails?: any;
}

const InputChargesSummary: React.FC<Props> = () => {
  return (
    <div className="input-charges-summary">
      <h2>Profit Calculation</h2>
      <p>
        Selling Price:<span>$50</span>
      </p>
      <p>
        Inbound Shipping Per Item:<span>-$4</span>
      </p>
      <p>
        Outbound Shipping Per Item:<span>-$3</span>
      </p>
      <p>
        Prep Fee Per Item:<span>-$6</span>
      </p>
      <p>
        Tax % on Sourcing:<span>-$5 (10%)</span>
      </p>
      <p>
        VAT registered:<span>&#10003;</span>
      </p>
      <p>
        VAT % deducted from Sell Price:<span>-$10</span>
      </p>
      <p>
        Calculate Multi Packs:<span>&#10003;</span>
      </p>
      <p>
        Custom Charge:<span>-$10</span>
      </p>
      <p>
        Custom Discount:<span>-$3 (6%)</span>
      </p>
      <div className="divider" />
      <p>
        Profit:<span>$50</span>
      </p>
    </div>
  );
};

export default InputChargesSummary;
