import './styles.scss';

import React, { PropTypes } from 'react';

import Pagination from 'components/Pagination/index';

const propTypes = {
    books: PropTypes.array
};

class BookList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize : 20,
            pageNum : 1
        };
        this.changePageNum = this.changePageNum.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.reset();
    }

    reset() {
        this.changePageNum(1);
    }

    changePageNum(num) {
        this.setState({
            pageNum: num
        });
    }

    render() {
        const books = this.props.books.sort((a, b) => a.id - b.id).slice(this.state.pageSize * (this.state.pageNum - 1), Math.min(this.state.pageSize * this.state.pageNum, this.props.books.length));
        let tableContent = [];

        books.forEach((book) => {
            tableContent.push(
                <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.country}</td>
                </tr>
            );
        });
        return (
            <div className="bookList">
                <table width="640px">
                    <tbody>
                        <tr>
                            <th width="40px">序号</th>
                            <th width="280px">书名</th>
                            <th width="220px">作者</th>
                            <th width="100px">国家/地区</th>
                        </tr>
                        {tableContent}
                    </tbody>
                </table>
                <Pagination pageNum={this.state.pageNum} totalPages={Math.ceil(this.props.books.length / this.state.pageSize)} changePageNum={this.changePageNum}></Pagination>
            </div>
        );
    }
}

BookList.propTypes = propTypes;

export default BookList;