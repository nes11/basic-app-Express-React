import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
    <Link to='/cat'>Cat</Link>
    <Link to='/colour-changer'>Colour changer Link</Link>
    <Link to='/star-wars'>Star Wars API</Link>
    </>
  )
};

export default NavBar;
