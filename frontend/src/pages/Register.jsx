import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import './styles/Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [isSuccess, user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError('Password mismatch');
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  return (
    <>
      <Hero>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Let's get connected</p>
      </Hero>
      <section className="form">
        <h2 className="section-header">Please fill out the following:</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm Password"
              required
            />
          </div>
          {(isError || error) && (
            <div className="error-message">{message || error}</div>
          )}
          <div className="form-group">
            <button type="submit" className="button-reverse-red block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
