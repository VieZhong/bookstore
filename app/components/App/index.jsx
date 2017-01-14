import './styles.scss';

import React from 'react';

import Header from '../Header/index';
import NavList from '../NavList/index';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let location;
        switch(this.props.location.pathname.split('/')[2]){
            case 'add': 
                location = (this.props.params.state == 'hasRead' ? '阅读记录' : '将读书籍') + ' > 增加图书';
                break;
            case 'list': 
            default:
                location = (this.props.params.state == 'hasRead' ? '阅读记录' : '将读书籍') + ' > 图书列表';
                break;
        }
        return (
            <div>
                <Header />
                <div>
                    <NavList active={this.props.params.state} />
                    <div className="mainSection">
                        <div className="location">当前位置：{location}</div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;