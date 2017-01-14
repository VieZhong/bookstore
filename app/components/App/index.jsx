import './styles.scss';

import React from 'react';

import Header from '../Header/index';
import NavList from '../NavList/index';
import Footer from '../Footer/index';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.location.pathname.split('/')[2] == 'list' ? 'list': 'add'  // list,add
        };
    }
    render() {
        let location;
        switch(this.state.status){
            case 'list': 
                location = (this.props.params.state == 'hasRead' ? '阅读记录' : '将读书籍') + ' > 图书列表';
                break;
            case 'add': 
                location = (this.props.params.state == 'hasRead' ? '阅读记录' : '将读书籍') + ' > 增加图书';
                break;
            default:
                location = (this.props.params.state == 'hasRead' ? '阅读记录' : '将读书籍') + ' > 图书列表';
                break;
        }
        return (
            <div>
                <Header></Header>
                <div>
                    <NavList active={this.props.params.state}/>
                    <div className="mainSection">
                        <div className="location">当前位置：{location}</div>
                        {this.props.children}
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default App;