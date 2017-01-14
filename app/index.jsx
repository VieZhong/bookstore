import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, Redirect, hashHistory } from 'react-router';

import App from './components/App/index';
import BooksList from './components/BooksList/index';
import AddBook from './components/AddBook/index';

const app = document.createElement('div');

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/hasRead/list" />
            <Redirect from="/:state" to="/:state/list" />
            <Route path="/:state/list" component={BooksList} />
            <Route path="/:state/add" component={AddBook} />
        </Route>
    </Router>
), app);

document.body.appendChild(app);