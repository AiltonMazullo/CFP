import React from 'react';
import './styles.css';

function FormCard({ children, onSubmit }) {
  return (
    <form className="form-card" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default FormCard;
