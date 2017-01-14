import './styles.scss';

import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const propTypes = {
    active: PropTypes.string
}

class NavList extends React.Component {
    render() {
        let active =  this.props.active;
        return (
            <div className="navList">
                <ul>
                    <li className={active=='hasRead' ? 'active' : null}><Link to="/hasRead">阅读记录</Link></li>
                    <li className={active=='willRead' ? 'active' : null}><Link to="/willRead">将读书籍</Link></li>
                </ul>
            </div>
        );
    }
}

NavList.propTypes = propTypes;

export default NavList;