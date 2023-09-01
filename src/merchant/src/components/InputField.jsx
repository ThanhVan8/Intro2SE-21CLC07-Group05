import React from "react";

const InputField = ({ label, type, required, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col py-2 w-full font-mono">
      <label htmlFor="input-field">{label}</label>
      <input
        className="border border-[#D9D9D9] p-2 rounded-[10px]"
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
