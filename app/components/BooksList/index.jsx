import './styles.scss';

import React from 'react';
import {Link} from 'react-router';

import Search from 'components/Search/index';
import Pagination from 'components/Pagination/index';

class BooksList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize : 20,
            pageNum : 1,
            keyWord : '',
            booksList : []
        };
        this.changePageNum = this.changePageNum.bind(this);
        this.onKeyWordChanged = this.onKeyWordChanged.bind(this);
        this.getBooksList = this.getBooksList.bind(this);
    }

    getCookie(c_name) {
        if (document.cookie.length > 0) {
            let c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) { 
                c_start = c_start + c_name.length + 1 
                let c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    }

    getBooksList(state) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                this.setState({
                    'booksList': JSON.parse(xmlHttp.responseText)
                });
            }
        };
        xmlHttp.open("GET", `${window.origin}/api/bookstore/books/${state}`, true);
        xmlHttp.send();
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            pageNum: 1,
            keyWord: ''
        });
        if(nextProps.params.state != this.props.params.state){
            this.getBooksList(nextProps.params.state);
        }
    }

    componentDidMount() {
        this.getBooksList(this.props.params.state);
    }

    render() {
        const booksList = this.state.booksList.filter((a) => ['name', 'author', 'country'].some((item) => a[item].includes(this.state.keyWord))).sort((a, b) => a.id - b.id);
        booksList.forEach((book, index) => {
            book.index = index + 1;
        });

        const books = booksList.slice(this.state.pageSize * (this.state.pageNum - 1), Math.min(this.state.pageSize * this.state.pageNum, booksList.length));
        let tableContent = [];
        let addBtnDisplay = this.getCookie('login') == 1 ? 'inherit' : 'none';

        booksList.length ? books.forEach((book) => {
            tableContent.push(
                <tr key={book.id}>
                    <td>{book.index}</td>
                    <td><Link to={`${this.props.params.state}/view/${book.id}`}>{book.name}</Link></td>
                    <td>{book.author}</td>
                    <td>{book.country}</td>
                </tr>
            );
        }) : tableContent.push(<tr key='none'><td colSpan="4">没有符合条件的书籍！</td></tr>);
        return (
            <div className="bookList">
                <div style={{width: '640px'}}>
                    <div className="display-50percent">
                        <Link style={{'display': addBtnDisplay}} className="btn-normal" to={`${this.props.params.state}/add`}>添加书籍</Link>
                    </div>
                    <div className="display-50percent">
                        <Search keyWord={this.state.keyWord} keyWordChanged={this.onKeyWordChanged}></Search>
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

export default BooksList;