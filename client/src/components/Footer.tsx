import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-muted py-3 mt-5 border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-md-start mb-2 mb-md-0">
            © {new Date().getFullYear()} Autoservice.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
