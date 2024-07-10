import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-200 p-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h1 className="text-xl font-bold text-black mb-2">About Us</h1>
          <p>
            Wrist is a one-stop online watch store for genuine affordable luxury
            wrist watches launched by Lanz in 2014. We are committed to bringing
            you the best.
          </p>
        </div>
        <div>
          <h1 className="text-xl font-bold text-black mb-2">Contact Us</h1>
          <p>Main office, Belton TX Anthony Way, Sax</p>
          <p className="border-t-2 border-gray-600 mt-2">+91325678900</p>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-gray-700 hover:text-blue-600"
            />
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-gray-700 hover:text-pink-600"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-gray-700 hover:text-blue-400"
            />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-black mb-2">Policies</h1>
          <p>Terms and Conditions</p>
          <p>Return and Refund Policies</p>
        </div>
      </div>
      <p className="text-center mt-6 font-bold">
        © 2024 Wrist. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
