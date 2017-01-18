import './styles.scss';

import React from 'react';
import { Link } from 'react-router';

import Header from '../Header/index';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.toLogin = this.toLogin.bind(this);
    }

    toLogin() {
        let xmlHttp = new XMLHttpRequest();
        let data = `account=${this.refs.account.value}&password=${this.refs.password.value}`;
        xmlHttp.onreadystatechange = () => {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                this.props.router.push('/hasRead/list');
            }
        };
        xmlHttp.open("POST", "http://localhost/api/login", true);
        xmlHttp.send(data);
    }

    render() {
        return (
            <div>
                <Header  user={{'authed': false}} />
                <div className="login">
                    <div>
                        <label htmlFor="account">账号：</label><input name="account" ref="account" />
                    </div>
                    <div>
                        <label htmlFor="password">密码：</label><input name="password" ref="password" type="password" />
                    </div>
                    <div>
                        <button className="btn-normal" onClick={this.toLogin}>登录</button>
                        <Link className="btn-reverse" to='/hasRead/list'>取消</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;