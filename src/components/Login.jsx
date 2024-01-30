import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.conifig";
import toast, { Toaster } from "react-hot-toast";
import Home from "./Home";

const auth = getAuth(app);
const Login = () => {
  const [user, setUser] = useState(null);
  console.log(user?.displayName);
  const emailRef = useRef();
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        setUser(loggedUser);
        toast("user Login done!!");
      })
      .catch((error) => {
        toast(error.message);
      });
    event.target.email.value = "";
    event.target.password.value = "";
  };
  const handleResetPassword = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast("cheak Your Email to reset password");
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  const [showPassword, setShowPassword] = useState(false);
  const [ischecked, setIsChecked] = useState(false);
  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
    setIsChecked(!ischecked);
  };
  return (
    <div className='hero min-h-screen bg-base-200'>
      <Toaster></Toaster>

      <div className='hero-content flex-col md:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Login now!</h1>
        </div>
        <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <form onSubmit={handleLogin} className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='email'
                name='email'
                ref={emailRef}
                className='input input-bordered'
                required
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                placeholder='password'
                className='input input-bordered'
                required
              />
              <div className='form-control'>
                <label className='label cursor-pointer'>
                  <span className='label-text'>Show Password</span>
                  <input
                    onClick={handleShowPassword}
                    type='checkbox'
                    checked={ischecked}
                    className='checkbox checkbox-primary'
                  />
                </label>
              </div>
              <label className='label'>
                <p to='/' className='text-sm font-semibold '>
                  First Time in Auth Master?{" "}
                  <Link className='font-bold' to='/register'>
                    Register
                  </Link>
                </p>
              </label>
            </div>
            <div className='form-control mt-2'>
              <button className='btn btn-primary'>Login</button>
              <button
                onClick={handleResetPassword}
                className='btn btn-warning mt-2'
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
