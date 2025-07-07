# ps-form-validator
import { isRequired, isEmail, validateForm } from 'your-package-name';

const fields = {
  email: {
    value: 'test@example.com',
    rules: [isRequired, isEmail],
  },
  password: {
    value: '123',
    rules: [isRequired, (v) => minLength(v, 6)],
  },
};

const validationResult = validateForm(fields);
console.log(validationResult);
