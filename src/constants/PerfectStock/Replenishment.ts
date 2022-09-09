import { ReplenishmentFBA } from '../../interfaces/PerfectStock/Replenishments';

export const DEFAULT_NEW_REPLENISHMENT_TEMPLATE: ReplenishmentFBA = {
  id: 0,
  name: '',
  vendor_id: 0,
  marketplace_id: 'ATVPDKIKX0DER',
  fulfillment: '',
  method: 'spd',
  carrier_type: 'amz',
  carrier_name: '',
  status: 'active',
  isNew: true,
};

export const FULFILLMENTS_CAPABILITY = [
  {
    key: 'SFA',
    text: 'Standard Fulfillment by Amazon',
    value: 'amz',
  },
  {
    key: 'Blankbox',
    text: 'Blank box',
    value: 'blank_box',
  },
  {
    key: 'Mix',
    text: 'Mixture of both',
    value: 'mix',
  },
];

export const NON_AMAZAON_PARTNERED_CARRIERS = [
  {
    key: 'DHL',
    text: 'DHL',
    value: 'dhl',
  },
  {
    key: 'FedEx',
    text: 'FedEx',
    value: 'fedex',
  },
  {
    key: 'UPS',
    text: 'UPS (non-partnered carrier)',
    value: 'ups',
  },
  {
    key: 'USPS',
    text: 'USPS',
    value: 'usps',
  },
  {
    key: 'Other',
    text: 'Other',
    value: 'other',
  },
];

export const REPLENISHMENT_SETTINGS_FORM = {
  formInputs: [
    {
      formRow: [
        {
          id: 'vendor_id',
          label: 'Ship from*',
          placeholder: '3PL name, address, city, state, zip',
          type: 'select',
          disabled: false,
          options: [],
          width: 500,
        },
        {
          id: 'marketplace_id',
          label: 'Marketplace destination',
          placeholder: 'Market place',
          type: 'marketPlace',
          disabled: true,
          width: 200,
        },
        {
          id: 'fulfillment',
          label: 'Fulfillment capability',
          placeholder: 'Fulfilment',
          type: 'select',
          disabled: false,
          options: FULFILLMENTS_CAPABILITY,
          width: 200,
        },
      ],
    },
  ],
};
