import './styles.scss';

import React, { PropTypes } from 'react';

import Search from 'components/Search/index';
import Pagination from 'components/Pagination/index';

const propTypes = {
    books: PropTypes.array,
    addBooks: PropTypes.func.isRequired
};

class BooksList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize : 20,
            pageNum : 1,
            keyWord : ''
        };
        this.changePageNum = this.changePageNum.bind(this);
        this.onKeyWordChanged = this.onKeyWordChanged.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.reset();
    }

    reset() {
        this.setState({
            pageNum: 1
        });
    }

    changePageNum(num) {
        this.setState({
            pageNum: num
        });
    }

    onKeyWordChanged(e) {
        let keyword = e.target.value.replace(/(^\s+)|(\s+$)/g, '');
        if(this.state.keyWord != keyword){
            this.setState({
                pageNum: 1,
                keyWord: keyword
            });
        }
    }

    render() {
        const booksList = this.props.books.filter((a) => ['name', 'author', 'country'].some((item) => a[item].includes(this.state.keyWord))).sort((a, b) => a.id - b.id)

        booksList.forEach((book, index) => {
            book.index = index + 1;
        });
        const books = booksList.slice(this.state.pageSize * (this.state.pageNum - 1), Math.min(this.state.pageSize * this.state.pageNum, booksList.length));
        let tableContent = [];

        booksList.length ? books.forEach((book) => {
            tableContent.push(
                <tr key={book.id}>
                    <td>{book.index}</td>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.country}</td>
                </tr>
            );
        }) : tableContent.push(<tr key='none'><td colSpan="4">没有符合条件的书籍！</td></tr>);
        return (
            <div className="bookList">
                <div style={{width: '640px'}}>
                    <div className="display-50percent">
                        <button className="btn-normal" onClick={this.props.addBooks}>添加书籍</button>
                    </div>
                    <div className="display-50percent">
                        <Search keyWordChanged={this.onKeyWordChanged}></Search>
                    </div>
                </div>
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
                <Pagination pageNum={this.state.pageNum} totalPages={Math.ceil(booksList.length / this.state.pageSize)} changePageNum={this.changePageNum}></Pagination>
            </div>
        );
    }
}

BooksList.propTypes = propTypes;

export default BooksList;