import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="site-navbar">
      <div className="navbar-logo">SANTOSH</div>
      <div className="navbar-status">
        <span className="status-dot"></span>
        Currently:  Building something you'll see soon
      </div>
    </nav>
  );
};

export default Navbar;
