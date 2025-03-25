import React from 'react';
import './Navbar.css';
import logo1 from './logo1.svg';
import badge_icon from './Navbar buttons logo/medal-ribbons-star.svg';
import checkmark_icon from './Navbar buttons logo/checkmark_icon.svg';
import profile from './Navbar buttons logo/profile.svg';
import help_icon from './Navbar buttons logo/help-circle.svg';
import note_icon from './Navbar buttons logo/note-edit.svg';
import settings_icon from './Navbar buttons logo/settings-2.svg';
import stats_icon from './Navbar buttons logo/stats_icon.svg';
const Navbar = () => {
  return (
    <div className='Navmain'>

       <img src={logo1} className='logo_pulse' alt="logoPulse" />

       <div className='btn_container'>

            <button className='nav_btn'><img src={badge_icon} className='navbtn_icon' alt="checkmark" /></button>
            <button className='nav_btn'> <img src={stats_icon} className='navbtn_icon' alt="checkmark" /></button>
            <button className='nav_btn'><img src={note_icon} className='navbtn_icon' alt="checkmark" /></button>
            <button className='nav_btn'><img src={checkmark_icon} className='navbtn_icon' alt="checkmark" /></button>
            <button className='nav_btn'><img src={settings_icon} className='navbtn_icon' alt="checkmark" /></button>
            <button className='nav_btn'><img src={profile} className='navbtn_icon' alt="checkmark" /></button>
            <button className='nav_btn'><img src={help_icon} className='navbtn_icon' alt="checkmark" /></button>
        </div>
    </div>
  )
}

export default Navbar