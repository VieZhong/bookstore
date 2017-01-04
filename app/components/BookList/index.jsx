import './styles.scss';

import React, { PropTypes } from 'react';

const propTypes = {
    books: PropTypes.array
};

class BookList extends React.Component {
    render() {
        return (
            <div className="bookList">
                <table>
                    <tr></tr>
                </table>
            </div>
        );
    }
}

BookList.propTypes = propTypes;

export default BookList;