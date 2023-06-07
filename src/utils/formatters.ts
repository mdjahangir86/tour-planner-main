/* eslint-disable import/prefer-default-export */

export const localNumberFormat = ({
  number = 0,
  currency = 'bdt',
  locals = 'bd-BD',
  maximumSignificantDigits = 2,
}) => {
  return new Intl.NumberFormat(locals, {
    style: 'currency',
    currency,
    maximumSignificantDigits,
  }).format(number);
};
