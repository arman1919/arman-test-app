import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ onSearchToggle, isSearchOpen, onSearch, searchTerm, onMobileMenuToggle }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const headerHeight = 140;

      if (currentScrollY > headerHeight) {
        setIsSticky(true);
        
        if (currentScrollY > lastScrollY && currentScrollY > headerHeight + 200) {
          setIsMenuVisible(false);
        } else {
          setIsMenuVisible(true);
        }
      } else {
        setIsSticky(false);
        setIsMenuVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { name: 'Demos', hasSubmenu: true },
    { name: 'Post', hasSubmenu: true },
    { name: 'Features', hasSubmenu: true },
    { name: 'Categories', hasSubmenu: true },
    { name: 'Shop', hasSubmenu: true },
    { name: 'Buy Now', hasSubmenu: false }
  ];

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-container">
          <div className="mobile-hamburger" onClick={onMobileMenuToggle}>
              <img src={`${process.env.PUBLIC_URL}/mobile-menu.svg`} alt="Mobile Menu" />
          </div>
          <div className="logo">
            <img src={`${process.env.PUBLIC_URL}/test-logo.png`} alt="Logo" className="logo-img" />
          </div>
          <div className="search-area">
            {!isSearchOpen ? (
              <div className="search-icon" onClick={onSearchToggle}>
                <img src={`${process.env.PUBLIC_URL}/search.svg`} alt="Search" />
              </div>
            ) : (
              <div className="header-search">
                <input
                  type="text"
                  placeholder="Search..."
                  className="header-search-input"
                  value={searchTerm}
                  onChange={(e) => onSearch(e.target.value)}
                  autoFocus
                />
                <button className="header-search-close" onClick={onSearchToggle}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        {isSearchOpen && (
          <div className="mobile-search-overlay">
            <div className="mobile-search">
              <input
                type="text"
                placeholder="Search..."
                className="mobile-search-input"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                autoFocus
              />
              <button className="mobile-search-close" onClick={onSearchToggle}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      
      <nav className={`navigation ${isSticky ? 'sticky' : ''} ${isMenuVisible ? 'visible' : 'hidden'}`}>
        <div className="nav-container">
          <ul className="nav-menu">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a href="#" className="nav-link">
                  {item.name}
                  {item.hasSubmenu && (
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="black" strokeWidth="1"/>
                    </svg>
                  )}
                </a>
                {item.hasSubmenu && item.name === 'Post' && (
                  <div className="submenu">
                    <div className="submenu-item">
                      <span>Post Header</span>
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                        <path d="M1 1L4 4L7 1" stroke="black" strokeWidth="1"/>
                      </svg>
                    </div>
                    <div className="submenu-item">
                      <span>Post Layout</span>
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                        <path d="M1 1L4 4L7 1" stroke="black" strokeWidth="1"/>
                      </svg>
                    </div>
                    <div className="submenu-item">
                      <span>Share Buttons</span>
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                        <path d="M1 1L4 4L7 1" stroke="black" strokeWidth="1"/>
                      </svg>
                    </div>
                    <div className="submenu-item">
                      <span>Gallery Post</span>
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                        <path d="M1 1L4 4L7 1" stroke="black" strokeWidth="1"/>
                      </svg>
                    </div>
                    <div className="submenu-item">
                      <span>Video Post</span>
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                        <path d="M1 1L4 4L7 1" stroke="black" strokeWidth="1"/>
                      </svg>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
