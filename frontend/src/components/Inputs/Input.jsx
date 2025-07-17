import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type
}) => {
  const [showPassword, setShowPassword] = useState(false); 

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label>{label}</label>
      <div className='relative'>
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className='pr-10 border border-gray-300 rounded px-3 py-2'
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <span
            onClick={toggleShowPassword}
            className="absolute right-3 top-2 cursor-pointer text-gray-500"
          >
            {showPassword ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
