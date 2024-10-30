import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { useEffect } from 'react';

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          /jotrier.com
        </Link>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/" className="nav-button">
                /login
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-button">
                /register
              </Link>
            </li>
            <li>
              <Link
                className="nav-button"
                onClick={() => dispatch(toggleTheme())}
              >
                /theme/{theme}
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
