import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Header = () => {
  return (
    <div>
      <div className="bg-white shadow w-full px-52">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              className="text-3xl font-bold text-gray-800 hover:text-gray-500"
              to="/"
            >
              LibraSearch
            </Link>

            <div className="flex items-center ml-5 gap-5">
              <Link
                to="/"
                className="px-2 py-1 text-lg font-medium text-gray-700 rounded hover:bg-gray-900 hover:text-gray-100"
              >
                Home
              </Link>

              <Link
                to="/books"
                className="px-2 py-1 text-lg font-medium text-gray-700 rounded hover:bg-gray-900 hover:text-gray-100
                   "
              >
                All Books
              </Link>
            </div>
          </div>
          <Button />
        </div>
      </div>
    </div>
  );
};

export default Header;
