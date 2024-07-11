import React from "react";
import "./Input.css";

function Input({ type, label, state, setState, placeholder }) {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        type={type}
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        className="custom-input"
      />
    </div>
  );
}

export default Input;
