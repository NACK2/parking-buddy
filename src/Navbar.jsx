import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false);
    } else{
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <nav className="navbar">
            <div className="navbar-container">
                <div className="menu-icon" onClick={handleClick}>
                <ion-icon name="grid-outline" color="danger"></ion-icon>

                </div>
                <ul className={click ? 'nav-menu active': 'nav-menu'}>
                  <li className='nav-item'>
                    <Link to={`/chat/`} className='nav-links' onClick={closeMobileMenu}>
                      Chat &nbsp;
                      <ion-icon name="chatbox-ellipses-outline"></ion-icon>

                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link to={`/calendar/`} className='nav-links' onClick={closeMobileMenu}>
                      Status &nbsp;
                      <ion-icon name="calendar-outline"></ion-icon>


                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to={`/chat/`} className='nav-links' onClick={closeMobileMenu}>
                      Preferences &nbsp;
                      <ion-icon name="chatbox-ellipses-outline"></ion-icon>

                    </Link>
                  </li>
                
                  </ul>
                  
            </div>
        </nav>
  )};
export default Navbar