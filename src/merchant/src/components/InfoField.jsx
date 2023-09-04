import React from "react";

const InfoField = ({title, info, onChange, readOnly}) => {
  return (
    <label className="">
      <p className="text-textColor font-semibold text-base">{title}</p>
      <input
        type="text"
        value={info}
        className="border-b focus:border-b-2 border-black focus:border-primary w-full outline-none"
				onChange={onChange}
				readOnly={readOnly}
      />
    </label>
  );
};

export default InfoField;