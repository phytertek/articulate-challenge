import clone from 'ramda/src/clone';
import __ from 'ramda/src/__';
import has from 'ramda/src/has';

const validators = {};
const defined = has(__, validators);

export const REQUIRED = 'REQUIRED';
validators.REQUIRED = field => {
  let error;
  if (!field.value) error = `${field.label || field.name} is required`;
  field.error = error;
  return field;
};

const runValidators = (field, type) =>
  defined(type) ? validators[type](field) : field;

export const validateField = field =>
  field.validate && field.validate.length
    ? field.validate.reduce(runValidators, clone(field))
    : field;
