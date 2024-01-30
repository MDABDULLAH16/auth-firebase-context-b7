import React, { useState } from "react";
import { Link } from "react-router-dom";
import App from "../App";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.conifig";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const auth = getAuth(app);
  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    if (!/[A-Z]/.test(password)) {
      toast("least One Capital letter");
    } else if (!/\d/.test(password)) {
      setError("least One Number Please!!");
    }
    const name = form.name.value;
    console.log(email, password, name);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);

        //add email display Name;
        handleUpdateProfile(result.user, name);

        //email varified;
        handleVarifiedEmail(result.user);
        toast("User Create Successfull");
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  const handleUpdateProfile = (user, name) => {
    updateProfile(user, {
      displayName: name,
    });
  };
  const handleVarifiedEmail = (user) => {
    sendEmailVerification(user);
    toast("Cheak Your Email");
  };
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content flex-col md:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Register Please!</h1>
        </div>
        <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <form onSubmit={handleRegister} className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                type='text'
                name='name'
                placeholder='Name'
                className='input input-bordered'
                required
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='email'
                name='email'
                className='input input-bordered'
                required
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                name='password'
                placeholder='password'
                className='input input-bordered'
                required
              />
              <label className='label'>
                <p>
                  Already Have account?
                  <Link
                    className='label-text-alt link link-hover font-bold text-sm '
                    to='/login'
                  >
                    {" "}
                    Login
                  </Link>
                </p>
              </label>
            </div>
            <div className='form-control mt-6'>
              <button type='submit' className='btn btn-primary'>
                Register
              </button>
              <Toaster></Toaster>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
