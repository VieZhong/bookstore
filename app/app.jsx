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
            hasReadBooks: hasReadBooks,
            willReadBooks: willReadBooks,
            active: 'hasRead'
        };
        this.changeActiveState = this.changeActiveState.bind(this);
    }
    changeActiveState(state) {
        this.setState({
            'active': state
        });
    }
    render() {
        const booksList = this.state.active == 'hasRead' ? this.state.hasReadBooks : this.state.willReadBooks;
        return (
            <div>
                <Header></Header>
                <div>
                    <NavList active={this.state.active} changeState={this.changeActiveState}/>
                    <BookList books={booksList}></BookList>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);