import { Router, Route, IndexRedirect, Redirect, hashHistory } from 'react-router';

const app = document.createElement('div');

ReactDOM.render((
    <Route path="/" component={App}>
        <IndexRedirect to="/hasRead/list" />
        <Redirect from="/:state" to="/:state/list" />
        <Route path="/:state/list" component={BooksList} />
        <Route path="/:state/add" component={AddBook} />
    </Route>
), app);

document.body.appendChild(app);