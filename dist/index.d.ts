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
export declare const isRequired: (value: string) => ValidationResult;
export declare const isEmail: (value: string) => ValidationResult;
export declare const minLength: (min: number) => ValidatorFn;
export declare const maxLength: (max: number) => ValidatorFn;
export declare const matches: (pattern: RegExp, message?: string) => ValidatorFn;
export declare const validateForm: (schema: ValidationSchema) => ValidationResults;
