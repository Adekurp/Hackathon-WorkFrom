import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-7xl mx-auto p-3'>
        <Link to='/'> 
        <h1>
            <span className='font-bold text-sm sm:text-xl flex flex-wrap'>workfrom</span>
        </h1>
        </Link>       
        <form className='bg-slate-50 p-2 rounded-xl flex items-center'>
            <input type="text" placeholder='Search....' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-slate-600'/>
        </form>
        <ul className='flex gap-4 '>
            <Link to='/'>
            <li className='hidden sm:inline text-stone-950 hover:underline'>Home</li>
            </Link>
            
            <Link to='/about'>
            <li className='hidden sm:inline text-stone-950 hover:underline'>About</li>
            </Link>
            
            <Link to='/sign-in'>
            <li className=' text-stone-950 hover:underline'>Sign in</li>
            </Link>
        </ul>
        </div>
    </header>
  )
}
