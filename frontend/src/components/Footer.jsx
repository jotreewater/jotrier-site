import React from 'react';
import './styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} jotrier.com. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
