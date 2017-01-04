import './styles.scss';

import React, { PropTypes } from 'react';

const propTypes = {
  active: PropTypes.string,
  changeState: PropTypes.func.isRequired
};

class NavList extends React.Component {
    render() {
        let active =  this.props.active;
        let changeState = (e) => {
            if(!e.target.className){
                active == 'hasRead' ? active = 'willRead' : active = 'hasRead';
                this.props.changeState(active);
            }
        };
        return (
            <div className="navList">
                <ul>
                    <li className={active=='hasRead' ? 'active' : null} onClick={changeState}>阅读记录</li>
                    <li className={active=='willRead' ? 'active' : null} onClick={changeState}>将读书籍</li>
                </ul>
            </div>
        );
    }
}

NavList.propTypes = propTypes;

export default NavList;