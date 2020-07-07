import React from 'react';
import PropTypes from 'prop-types';

const FormErrors = ({ formErrors }) => {
  return (
    <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].message && formErrors[fieldName].message.length > 0) {
        return (
          <p key={i}> {formErrors[fieldName].message} </p>
        );
      }
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={i}> {formErrors[fieldName]}</p>
        );
      }
      return '';
    })}
  </div>);
};

export default FormErrors;

FormErrors.propTypes = {
  formErrors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    common: PropTypes.string,
  })
};
