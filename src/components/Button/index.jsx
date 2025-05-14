import React from "react";
import "./styles.css";

function Button({ children, onClick, type = "button" }) {
  return (
    <button className="custom-button" type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
