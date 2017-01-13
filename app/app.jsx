import './styles.scss';

import hasReadBooks from 'store/hasRead';
import willReadBooks from 'store/willRead';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from 'components/Header/index';
import NavList from 'components/NavList/index';
import BookList from 'components/BookList/index';
import Footer from 'components/Footer/index';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booksList: [],
            active: 'hasRead'
        };
        this.changeActiveState = this.changeActiveState.bind(this);
        this.getBooksList = this.getBooksList.bind(this);
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
            'active': state
        });
        this.getBooksList(state);
    }
    componentDidMount() {
        this.getBooksList(this.state.active);
    }
    render() {
        return (
            <div>
                <Header></Header>
                <div>
                    <NavList active={this.state.active} changeState={this.changeActiveState}/>
                    <BookList books={this.state.booksList}></BookList>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);