import React from 'react';
import logo from '../data/hii_logo.jpg'

const Footer = () => (
  <div className="mt-24">
    <p className="dark:text-gray-200 text-gray-700 text-center m-5">
      © 2022 DirecNet - Huntington Ingalls Industries
    </p>
    <div className='flex justify-center items-center mb-5'>
      <img
        src={logo}
        alt='HII Logo'
        className='rounded-xl h-20 md:m-3'
      />
    </div>
  </div>
);

export default Footer;