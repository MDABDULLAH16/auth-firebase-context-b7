import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  //use COntext input and distructure hare
  const { createUser } = useContext(AuthContext);

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
    createUser(email, password)
      .then((result) => {
        const creator = result.user;
        console.log(creator);
        toast("User Create Done");
      })
      .catch((error) => {
        toast(error.message);
      });
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
