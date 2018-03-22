import passwordStrengthTest from 'owasp-password-strength-test';
import isEmail from 'validator/lib/isEmail';
import clone from 'ramda/src/clone';

// const sampleField = {
//  name: 'email',
//  value: 'email@gmail.com',
//  type: 'email',
//  validate: [REQUIRED, EMAIL]
// }
export const REQUIRED = 'REQUIRED';
const isRequired = field => {
  let error;
  if (!field.value) error = `${field.name} is required`;
  field.error = error || null;
  return field;
};

export const EMAIL = 'EMAIL';
const isValidEmail = field => {
  let error;
  if (!isEmail(field.value))
    error = `${field.value} is not a valid email address`;
  field.error = error || null;
  return field;
};

export const STRONG_PASSWORD = 'STRONG_PASSWORD';
const isStrongPassword = field => {
  let error;
  passwordStrengthTest.config({
    allowPassphrases: true,
    maxLength: 56,
    minLength: 8,
    minPhraseLength: 24,
    minOptionalTestsToPass: 4
  });
  const strengthTestResults = passwordStrengthTest.test(field.value);
  if (!!strengthTestResults.optionalTestErrors.length)
    error = strengthTestResults.optionalTestErrors[0];
  if (!!strengthTestResults.requiredTestErrors.length)
    error = strengthTestResults.requiredTestErrors[0];
  field.error = error || null;
  return field;
};

const runValidators = (validatedField, requirement) => {
  switch (requirement) {
    case STRONG_PASSWORD:
      return isStrongPassword(validatedField);
    case EMAIL:
      return isValidEmail(validatedField);
    case REQUIRED:
      return isRequired(validatedField);
    default:
      return validatedField;
  }
};

export const validateField = field => {
  if (!field.validate || !field.validate.length) return field;
  return field.validate.reduce(runValidators, clone(field));
};
