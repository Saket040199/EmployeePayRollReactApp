import React from 'react';
import './header.css';
import logo from '../../assets/images/logo.png';

const Header = () => {
    return (
        <header className="header-content header">
        <div className="logo-content">
            <img src={logo} />
            <div>
                <span className="emp-text">EMPLOYEE</span><br />
                <span className="emp-text emp-payroll">PAYROLL</span>
            </div>
        </div>
    </header>
    )
}

export default Header;