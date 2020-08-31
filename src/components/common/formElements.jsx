import React from 'react'
import Joi from "joi-browser"

export const validate = (data , schema) => {
  const abort = {
    abortEarly: false,
  };
  const { error } = Joi.validate(data, schema, abort);
  if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
};

export const validateProperty = (target , Schema) => {
  const { name, value } = target
  const obj = { [name]: value };
  const schema = { [name]: Schema[name] };
  const { error } = Joi.validate(obj, schema);
  return error ? error.details[0].message : null;
};

export const renderErrorMessage = (name , error )=>{
  return error[name] ?  <p className="error-message"> {error[name]} </p> : null
}
export const getSpinner = <div className="spinner-border text-light custom-spinner" role="status"  />