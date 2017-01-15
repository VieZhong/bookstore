import './styles.scss';

import React from 'react';
import { Link } from 'react-router';

class Book extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            'book': {}
        }

        this.getBook = this.getBook.bind(this);
        this.toAdd = this.toAdd.bind(this);
        this.toEdit = this.toEdit.bind(this);
        this.toDelete = this.toDelete.bind(this);
        this.reset = this.reset.bind(this);
    }

    getBook() {
        if(this.props.params.id){
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => {
                if(xmlHttp.readyState == 4) {
                    if(xmlHttp.status == 200){
                        this.setState({
                            book: JSON.parse(xmlHttp.responseText)
                        });
                    }else {
                        this.props.router.push(`/${this.props.params.state}/list`);
                    }
                }
            };
            xmlHttp.open("GET", `http://localhost/api/bookstore/books/${this.props.params.state}/${this.props.params.id}`, true);
            xmlHttp.send();
        }
    }

    toAdd() {
        let book = {
            'name': this.refs['name'].value,
            'author': this.refs['author'].value,
            'country': this.refs['country'].value
        }
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
                this.setState({
                    book : JSON.parse(xmlHttp.responseText)
                });
                this.props.router.push(`/${this.props.params.state}/view/${this.state.book.id}`);
            }
        };
        xmlHttp.open("POST", `http://localhost/api/bookstore/books/${this.props.params.state}`, true);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(JSON.stringify(book));
    }

    toEdit() {
        let book = {
            'name': this.refs['name'].value,
            'author': this.refs['author'].value,
            'country': this.refs['country'].value
        }
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
                this.setState({
                    book: Object.assign(this.state.book, book)
                });
                this.props.router.push(`/${this.props.params.state}/view/${this.state.book.id}`);
            }
        };
        xmlHttp.open("PUT", `http://localhost/api/bookstore/books/${this.props.params.state}/${this.props.params.id}`, true);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(JSON.stringify(book));
    }

    toDelete() {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
                this.props.router.push(`/${this.props.params.state}/list`);
            }
        };
        xmlHttp.open("DELETE", `http://localhost/api/bookstore/books/${this.props.params.state}/${this.props.params.id}`, true);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send();
    }

    getInputElem(key, value = '') {
        return (<input ref={key} type="text" name={key} defaultValue={value}/>);
    }

    getField(key) {
        let elem, method = this.props.location.pathname.split('/')[2];
        switch(method) {
            case 'view': elem = (<span>{this.state.book[key]}</span>); break;
            case 'add': elem = this.getInputElem(key); break;
            case 'edit': elem = this.getInputElem(key, this.state.book[key]); break;
            default: break;
        }
        return elem;
    }

    reset() {
        ['name', 'author', 'country'].forEach((key) => {
            this.refs[key].value = '';
        });
    }

    componentWillMount() {
        if(this.props.params.id){
            this.getBook();
        }
    }

    render() {
        let btnGroup, editBtn, delBtn, method = this.props.location.pathname.split('/')[2];
        switch(method) {
            case 'add':
                btnGroup = (
                    <div className="btnGroup">
                        <button className="btn-normal" onClick={this.toAdd}>添加</button>
                        <button className="btn-reverse" onClick={this.reset}>清空</button>
                    </div>
                );
                break;
            case 'edit':
                btnGroup = (
                    <div className="btnGroup">
                        <button className="btn-normal" onClick={this.toEdit}>编辑</button>
                        <Link className="btn-reverse" to={`${this.props.params.state}/view/${this.props.params.id}`}>取消</Link>
                    </div>
                );
                break;
            case 'view':
                editBtn = (<Link style={{'float': 'right'}} className="btn-normal" to={`${this.props.params.state}/edit/${this.props.params.id}`}>编辑</Link>);
                delBtn = (<button style={{'float': 'right'}} className="btn-normal" onClick={this.toDelete}>删除</button>);
                break;
            default:
                break;
        }
        return (
            <div className="viewBook">
                <div className="back">
                    <Link className="btn-normal" to={`${this.props.params.state}/list`}>返回列表</Link>
                    {delBtn}{editBtn}
                </div>
                <div className="form">
                    <div>
                        <label htmlFor="name">书名：</label>{this.getField('name')}
                    </div>
                    <div>
                        <label htmlFor="name">作者：</label>{this.getField('author')}
                    </div>
                    <div>
                        <label htmlFor="name">国家/地区：</label>{this.getField('country')}
                    </div>
                    {btnGroup}
                </div>            
            </div>
        );
    }

}

export default Book;