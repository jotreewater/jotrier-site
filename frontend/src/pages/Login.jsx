import React, { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login, reset } from '../redux/authSlice';
import Hero from '../components/Hero';
import './styles/Login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [isSuccess, user, navigate, dispatch]);

  return (
    <>
      <Hero>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Get your credentials ready</p>
      </Hero>
      <section className="form">
        <h2 className="section-header">Please fill out the following:</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              required
            />
          </div>
          {isError && <div className="error-message">{message}</div>}
          <div className="form-group">
            <button className="button-reverse-red block" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
