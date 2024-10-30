import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { useEffect } from 'react';

import './styles/Header.css';
import { logout, reset } from '../redux/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };
  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          /jotrier.com
        </Link>
        <nav className="nav">
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
      </header>
    </>
  );
}
