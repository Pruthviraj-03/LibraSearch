import React from "react";
import { Link } from "react-router-dom";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between px-6 py-4 bg-white">
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 hover:text-gray-500"
        >
          LibraSearch
        </Link>

        <p className="py-2 text-gray-800">
          all rights reserved @https://github.com/Pruthviraj-03/
        </p>

        <div className="flex -mx-2">
          <Link
            to="#"
            className="mx-2 text-lg text-gray-800 hover:text-gray-500"
          >
            <FaFacebookF />
          </Link>

          <Link
            to="#"
            className="mx-2 text-lg text-gray-800 hover:text-gray-500"
          >
            <BsGithub />
          </Link>

          <Link
            to="#"
            className="mx-2 text-lg text-gray-800 hover:text-gray-500"
          >
            <BsTwitter />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;