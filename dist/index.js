"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForm = exports.matches = exports.maxLength = exports.minLength = exports.isEmail = exports.isRequired = void 0;
// Built-in Validators
var isRequired = function (value) { return ({
    isValid: value.trim().length > 0,
    message: value.trim().length > 0 ? undefined : "This field is required.",
}); };
exports.isRequired = isRequired;
var isEmail = function (value) {
    var regex = /^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
    var valid = regex.test(value);
    return {
        isValid: valid,
        message: valid ? undefined : "Invalid email format.",
    };
};
exports.isEmail = isEmail;
var minLength = function (min) { return function (value) {
    var valid = value.length >= min;
    return {
        isValid: valid,
        message: valid ? undefined : "Minimum length is ".concat(min, " characters."),
    };
}; };
exports.minLength = minLength;
var maxLength = function (max) { return function (value) {
    var valid = value.length <= max;
    return {
        isValid: valid,
        message: valid ? undefined : "Maximum length is ".concat(max, " characters."),
    };
}; };
exports.maxLength = maxLength;
var matches = function (pattern, message) { return function (value) {
    var valid = pattern.test(value);
    return {
        isValid: valid,
        message: valid ? undefined : message || "Value does not match the required pattern.",
    };
}; };
exports.matches = matches;
// Main validation runner
var validateForm = function (schema) {
    var result = {};
    for (var fieldName in schema) {
        var _a = schema[fieldName], value = _a.value, rules = _a.rules;
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            var validation = rule(value);
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
exports.validateForm = validateForm;
