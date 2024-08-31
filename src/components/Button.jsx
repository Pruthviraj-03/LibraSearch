import React from "react";
import { Link } from "react-router-dom";

const Button = () => {
  return (
    <Link to="#">
      <div
        className="px-2 py-1 text-xl font-medium
                     rounded cursor-pointer
                    text-white bg-gray-900 hover:text-gray-900 hover:bg-gray-100 hover:border hover:border-gray-900"
      >
        Login
      </div>
    </Link>
  );
};

export default Button;
