import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import { register, reset } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
//import Spinner from '../components/Spinner';

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

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { user, isLoading, isSuccess, isError, message } = useSelector(
  //   (state) => state.auth
  // );

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }
  //   if (isSuccess || user) {
  //     navigate('/');
  //   }
  //   dispatch(reset());
  // }, [isSuccess, isError, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { password, password2 } = formData;
    if (password !== password2) {
      toast.error('Password mismatch');
    } else {
      const userData = {
        name: formData.name,
        email: formData.email,
        password,
      };
      // dispatch(register(userData));
    }
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <Hero>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Lets get connected</p>
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
              placeholder="Username"
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
