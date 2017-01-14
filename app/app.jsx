import './styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from 'components/Header/index';
import NavList from 'components/NavList/index';
import BooksList from 'components/BooksList/index';
import Footer from 'components/Footer/index';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booksList: [],
            active: 'hasRead',
            status: 'list'// list,add
        };
        this.changeActiveState = this.changeActiveState.bind(this);
        this.getBooksList = this.getBooksList.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }
    getBooksList(state) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if(xmlHttp.readyState==4) {
                this.setState({
                    'booksList': JSON.parse(xmlHttp.responseText)
                });
            }
        };
        xmlHttp.open("GET", "http://localhost/api/bookstore/books/" + state, true);
        xmlHttp.send();
    }
    changeActiveState(state) {
        this.setState({
            'active': state,
            'status': 'list'
        });
        this.getBooksList(state);
    }
    changeStatus(status) {
        return () => {
            this.setState({
                'status': status
            });
        }
    }
    componentDidMount() {
        this.getBooksList(this.state.active);
    }
    render() {
        let location, mainSection;
        switch(this.state.status){
            case 'list': 
                mainSection = <BooksList books={this.state.booksList} addBooks={this.changeStatus('add')}></BooksList>;
                location = (this.state.active == 'hasRead' ? '阅读记录' : '将读书籍') + ' > 图书列表';
                break;
            case 'add': 
                mainSection = '添加书籍';
                location = (this.state.active == 'hasRead' ? '阅读记录' : '将读书籍') + ' > 增加图书';
                break;
            default:
                mainSection = <BooksList books={this.state.booksList} addBooks={this.changeStatus('add')}></BooksList>;
                location = (this.state.active == 'hasRead' ? '阅读记录' : '将读书籍') + ' > 图书列表';
                break;
        }
        return (
            <div>
                <Header></Header>
                <div>
                    <NavList active={this.state.active} changeState={this.changeActiveState}/>
                    <div className="mainSection">
                        <div className="location">当前位置：{location}</div>
                        {mainSection}
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);