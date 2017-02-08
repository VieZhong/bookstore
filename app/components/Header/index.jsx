import './styles.scss';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                this.props.logout();
                window.location.href = 'http://localhost/bookstore/index.html';
            }
        };
        xmlHttp.open("POST", `http://localhost/api/logout`, true);
        xmlHttp.send();
    }

    render() {
        let info = this.props.user.authed ? 
            (<span className="person">
                {this.props.user.name}
                <div>
                    <a onClick={this.logout}>注销</a>
                </div>
            </span>)
            : 
            (<Link to="/login">登录</Link>);
        return ( <div className="header">小夫的读书记录{info}</div> );
    }
}

Header.propTypes = propTypes;

export default Header;