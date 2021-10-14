import { ApiType } from '../../interfaces/Settings/apiKeys';

export const API_TYPES_LIST: ApiType[] = [
  {
    value: 'Zapier',
    name: 'Zapier',
    icon: require(`../../assets/images/zapier.svg`),
    disabled: false,
  },
];

export const API_TYPES = {
  ZAPIER: API_TYPES_LIST[0],
};
