import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoWhite from '../assets/img/logo-white.svg';
import LogoDark from '../assets/img/logo-dark.svg';
import { AuthContext } from '../AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate.reload('/');
  };

  return (
    <header className={`${isScrolled ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8'} fixed z-50 w-full transition-all duration-500`}>
      <div className='container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0'>
        <div className='flex items-center gap-x-6'> {/* Mengubah gap-x-4 menjadi gap-x-6 untuk memberi jarak lebih */}
          <Link to='/home'>
            <img className='w-[160px]' src={isScrolled ? LogoDark : LogoWhite} alt='Logo' />
          </Link>
          {user && <span className={`${isScrolled ? 'text-primary' : 'text-white'} flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}>Hello, {user.username}</span>}
        </div>
        <nav className={`${isScrolled ? 'text-primary' : 'text-white'} flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}>
          <Link to='/home' className='hover:text-accent transition'>Home</Link>
          <Link to='/facilities' className='hover:text-accent transition'>Facilities</Link>
          <Link to='/review' className='hover:text-accent transition'>Review</Link>
          <button onClick={handleLogout} className='hover:text-accent transition uppercase flex gap-x-4 font-tertiary tracking-[3px] text-[15px]'>Logout</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
