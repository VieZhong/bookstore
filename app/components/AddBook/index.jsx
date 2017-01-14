import './styles.scss';

import React from 'react';
import { Link } from 'react-router';

class AddBook extends React.Component{
    constructor(props) {
        super(props);
        this.toAdd = this.toAdd.bind(this);
        this.reset = this.reset.bind(this);
    }

    toAdd() {
        let book = {
            'name': this.refs['name'].value,
            'author': this.refs['author'].value,
            'country': this.refs['country'].value
        }
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                
            }
        };
        xmlHttp.open("POST", "http://localhost/api/bookstore/books/" + this.props.params.state, true);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(JSON.stringify(book));
    }

    reset() {
        ['name', 'author', 'country'].forEach((key) => {
            this.refs[key].value = '';
        });
    }

    render() {
        return (
            <div className="addBook">
                <div className="back">
                    <Link className="btn-normal" to={this.props.params.state + '/list'}>返回列表</Link>
                </div>
                <div className="form">
                    <div>
                        <label htmlFor="name">书名：</label><input ref="name" type="text" name="name"/>
                    </div>
                    <div>
                        <label htmlFor="name">作者：</label><input ref="author" type="text" name="author"/>
                    </div>
                    <div>
                        <label htmlFor="name">国家/地区：</label><input ref="country" type="text" name="country"/>
                    </div>
                    <div className="btnGroup">
                        <button className="btn-normal" onClick={this.toAdd}>添加</button>
                        <button className="btn-reverse" onClick={this.reset}>清空</button>
                    </div>
                </div>            
            </div>
        );
    }

}

export default AddBook;