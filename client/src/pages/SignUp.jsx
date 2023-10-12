import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      
      setLoading(true);
      const res = await fetch('/api/auth/signup', 
      {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success ==false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
    console.log(data);
  };
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto mr-9'>
        <h1 className='text-3xl text-slate-700 font-semibold my-4'>Sign Up</h1>
        <p className='text-slate-700'>If you already have an account register</p>
        <div className='flex gap-2 mb-5 text-slate-700'>
          <p>Have an account?</p>
          <Link to={'/sign-in'}>
            <span className='text-lime-600'>Login here !</span>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <b className='text-slate-700'>Username</b>
          <input type="text" placeholder='username' className='border p-3 rounded-xl mb-4' id='username' onChange={handleChange}/>
          <b className='text-slate-700'>Email</b>
          <input type="text" placeholder='email' className='border p-3 rounded-xl mb-4' id='email' onChange={handleChange}/>
          <b className='text-slate-700'>Password</b>
          <input type="password" placeholder='password' className='border p-3 rounded-xl mb-4' id='password' onChange={handleChange}/>
          <button disabled={loading} className='bg-lime-300 text-slate-700 p-3 rounded-xl mb-4 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading....' : 'Sign Up'}
          </button>
          <p className='text-center mb-4 text-slate-700'>or continue with</p>
          <OAuth/>
        </form>
        
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
  )
}
