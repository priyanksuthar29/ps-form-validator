// Types
export type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export type ValidatorFn = (value: string) => ValidationResult;

export type FieldRules = {
  value: string;
  rules: ValidatorFn[];
};

export type ValidationSchema = {
  [fieldName: string]: FieldRules;
};

export type ValidationResults = {
  [fieldName: string]: ValidationResult;
};

// Built-in Validators
export const isRequired = (value: string): ValidationResult => ({
  isValid: value.trim().length > 0,
  message: value.trim().length > 0 ? undefined : "This field is required.",
});

export const isEmail = (value: string): ValidationResult => {
  const regex = /^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
  const valid = regex.test(value);
  return {
    isValid: valid,
    message: valid ? undefined : "Invalid email format.",
  };
};

export const minLength = (min: number): ValidatorFn => (value: string): ValidationResult => {
  const valid = value.length >= min;
  return {
    isValid: valid,
    message: valid ? undefined : `Minimum length is ${min} characters.`,
  };
};

export const maxLength = (max: number): ValidatorFn => (value: string): ValidationResult => {
  const valid = value.length <= max;
  return {
    isValid: valid,
    message: valid ? undefined : `Maximum length is ${max} characters.`,
  };
};

export const matches = (pattern: RegExp, message?: string): ValidatorFn => (value: string): ValidationResult => {
  const valid = pattern.test(value);
  return {
    isValid: valid,
    message: valid ? undefined : message || "Value does not match the required pattern.",
  };
};

// Main validation runner
export const validateForm = (schema: ValidationSchema): ValidationResults => {
  const result: ValidationResults = {};

  for (const fieldName in schema) {
    const { value, rules } = schema[fieldName];

    for (const rule of rules) {
      const validation = rule(value);
      if (!validation.isValid) {
        result[fieldName] = validation;
        break;
      }
    }

    if (!result[fieldName]) {
      result[fieldName] = { isValid: true };
    }
  }

  return result;
};
