import React from "react";

const CustomInput = ({
  label,
  type,
  value,
  onChange,
  name,
  placeholder,
  id,
  disable,
}: {
  label: string;
  type: string;
  value?: string;
  disable?: boolean;
  onChange?: (e: any) => void;
  name: string;
  placeholder: string;
  id: string;
}) => {
  return (
    <div className="w-full">
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          type={type}
          id={id}
          disabled={disable}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className="input input-bordered w-full mb-3 "
        />
      </label>
    </div>
  );
};

export default CustomInput;
