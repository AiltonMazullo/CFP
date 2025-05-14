import React from 'react';
import './styles.css';

function InputText({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        className="input-field"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputText;
