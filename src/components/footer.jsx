import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="my-info">
        <p>
          <a href="tel:+2347035508581">
            <i className="fa fa-phone"></i>{" "}
          </a>
          <a href="tel:+2347035508581">
            {/* https://wa.me/2347035508581 */}
            <i className="fa fa-whatsapp"></i>{" "}
          </a>
        </p>
      </div>
      <div className="footer-body">
        <p className="copyrights">
          <span className="copy">&copy;</span> 2019 Lagos Nigeria- All Rights
          Reserved
        </p>
        <p className="terms-privacy">
          {" "}
          <Link to="">Terms </Link> | <Link to="">Privacy </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
