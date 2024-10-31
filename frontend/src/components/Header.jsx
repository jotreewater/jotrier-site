import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { logout, reset } from '../redux/authSlice';
import { FaBars, FaTimes } from 'react-icons/fa';
import './styles/Header.css';

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Add navigate for redirecting
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for dropdown menu

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          /jotrier.com
        </Link>
        <div className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <nav>
            <div className="menu-icon" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}{' '}
            </div>
            <ul>
              {user ? (
                <>
                  <li>
                    <Link onClick={onLogout}>/logout</Link>
                  </li>
                  <li>
                    <Link to="/user">/{user.name}</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">/login</Link>
                  </li>
                  <li>
                    <Link to="/register">/register</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/projects">/projects</Link>
              </li>
              <li>
                <Link onClick={() => dispatch(toggleTheme())}>
                  /theme/{theme}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
