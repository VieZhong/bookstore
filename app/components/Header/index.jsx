import './styles.scss';

import React from 'react';
import { Link } from 'react-router';

function Header() {
    return ( <div className="header">小夫的读书记录<Link to="/login">登录</Link></div> );
}

export default Header;