import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} className="form-control" id={name} {...rest}>
        <option value="" />
        {options.map(option => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <small className="danger">{error}</small>}
    </div>
  );
};

export default Select;
