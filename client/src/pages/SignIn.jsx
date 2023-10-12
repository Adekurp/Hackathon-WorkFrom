import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInstart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      }
    );
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(signInstart());
      const res = await fetch('/api/auth/signin', 
      {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success ==false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data))
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
    console.log(data);
  };
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto mr-9'>
        <h1 className='text-3xl font-semibold my-7 text-slate-700'>Sign In</h1>
        <p className='text-slate-700'>If you dont have an account register</p>
        <div className='flex gap-2 mb-5 text-slate-700'>
          You can
          <Link to={'/sign-up'}>
            <span className='text-lime-600'>Register here !</span>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <b className='text-slate-700'>Email</b>
          <input type="text" placeholder='Enter your email address' className='border p-3 rounded-xl' id='email' onChange={handleChange}/>
          <b className='text-slate-700'>Password</b>
          <input type="password" placeholder='Enter your password' className='border p-3 rounded-xl' id='password' onChange={handleChange}/>
          <button disabled={loading} className='bg-lime-300 text-slate-700 p-3 rounded-xl uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading....' : 'Sign In'}
          </button>
          <p className='text-center text-slate-700'>or continue with</p>
          <OAuth/>
        </form>
        
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    
  )
}
