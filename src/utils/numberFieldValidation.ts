import {
  isNumber as checkIsNumber,
  checkIsInteger,
  isPositive as checkIsPositive,
  isLessThanFiveDecimalPoints,
  isLessThanTwoDecimalPoints,
} from './format';

export const validateNumberField = (
  value: string,
  isNumber?: boolean,
  isInteger?: boolean,
  isPositiveOnly?: boolean,
  allow5Decimal?: boolean
) => {
  if (isNumber && !checkIsNumber(value)) {
    return false;
  }

  if (isInteger && !checkIsInteger(value)) {
    return false;
  }

  if (isPositiveOnly && !checkIsPositive(value)) {
    return false;
  }

  /* Default float, allow 2 DPs */
  if (isNumber && !allow5Decimal && !isLessThanTwoDecimalPoints(value)) {
    return false;
  }

  /* Default float, allow 5 DPs */
  if (isNumber && allow5Decimal && !isLessThanFiveDecimalPoints(value)) {
    return false;
  }

  return true;
};
