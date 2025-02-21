// frontend/src/components/Footer.js
import React from "react";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 pb-2 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          {/* Brand or Logo (Optional) */}
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold">APM Optimization Tool</h5>
            <p className="text-muted mb-0">
              Optimize your payment methods with AI.
            </p>
          </div>

          {/* Social Icons */}
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-light me-3"
            >
              <Facebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-light me-3"
            >
              <Twitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-light me-3"
            >
              <Linkedin />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-light"
            >
              <Github />
            </a>
          </div>

          {/* Footer Links (Optional) */}
          <div className="col-md-4 text-center text-md-end">
            <a href="/about" className="text-light me-3">
              About
            </a>
            <a href="/docs" className="text-light me-3">
              Docs
            </a>
            <a href="/contact" className="text-light">
              Contact
            </a>
          </div>
        </div>

        <hr className="border-secondary my-3" />

        {/* Copyright */}
        <div className="text-center text-muted">
          &copy; {new Date().getFullYear()} APM Optimization Tool. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
