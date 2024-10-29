import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">/jotrier</Link>
      </div>
      <nav>
        <ul>
          <li>
            <button>Login</button>
          </li>
          <li>
            <button>Register</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
