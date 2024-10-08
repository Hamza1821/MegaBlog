
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Logo, LogoutBtn } from '../index';
import gsap from 'gsap'
 const tl=gsap.timeline()

function Header() {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
// gsap start
useEffect(() => {
  let ctx = gsap.context(() => {
    tl.from('.header', {
      y: -10,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
      
    })
    tl.from('.navbar', {
      y: -10,
      opacity: 0,
     
      duration: 0.5,
      ease: "power2.in",
      stagger: 0.3
    })

  });

  tl.play();  // Play the timeline
  return () => ctx.revert();
}, []);
//gsao end

  // State to track theme mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  /* Toggle Text Color */
  const toggleTextColor = () => {


    const rootElement = document.getElementById('root');
    // Toggle text color for the root
    rootElement.classList.toggle('white-color');

    const footerLinks = document.getElementsByClassName('toggle');
    Array.from(footerLinks).forEach(link => {
      link.classList.toggle('text-gray-900');
      link.classList.toggle('text-alice-blue-900');
    });

    // Toggle background and text color for custom screen elements
    const screenElements = document.querySelectorAll('.custom-theme');
    screenElements.forEach(screenElement => {
      screenElement.classList.toggle('dark-mode-bg'); // Toggle background color
      screenElement.classList.toggle('light-text');   // Toggle text color
    });

    // Toggle between dark and light mode
    setIsDarkMode(!isDarkMode);
  };

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  
    {

      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },

  ];

  return (
    <header  className='header custom-theme header-custom-theme py-3 shadow bg-gray-200'>
      <Container>
        <nav className='flex'>
          <div className='mr-4 ml-10 navbar'>
            <Link to='/'>
              <Logo width='70px' />

            </Link>
          </div>
          <ul className='flex ml-auto'>
            <li className='navbar'>
              <button
                onClick={toggleTextColor}
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                {isDarkMode ? 'LightMode' : 'DarkMode'}
              </button>
            </li>
            {navItems.map((item) =>
              item.active ? (
                <li className='navbar' key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}

                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='navbar'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header;
