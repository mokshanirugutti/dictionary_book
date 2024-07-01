import React from 'react'
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/book.png'

const NavBar : React.FC = () => {
    const navigate = useNavigate()
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");

  };
  return (
    <div className=' flex items-center justify-between mt-2 pb-2 pr-4 pl-4 mb-10 border-b border-gray-800 shadow-md' >
        <div className='flex  gap-2'>
        <img className="size-12 mt-4" src={logoImage} alt=""/>
        <h1 className=" text-4xl  text-center mt-5">Dictionary</h1>
        </div>
        <button className='text-black-100 px-6 py-1 border border-black rounded-lg h-10 hover:bg-black hover:text-white'
        onClick={handlelogout}
        >
        Logout</button>
        
    </div>
  )
}

export default NavBar