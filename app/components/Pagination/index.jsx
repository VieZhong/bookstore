import './styles.scss'

import React, { PropTypes }  from 'react';

const propTypes = {
    pageNum: PropTypes.number,
    totalPages: PropTypes.number,
    changePageNum: PropTypes.func.isRequired
}

class Pagination extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pageNum: this.props.totalPages ? this.props.pageNum : 0,
            totalPages: this.props.totalPages
        };
        this.toFirstPage = this.toFirstPage.bind(this);
        this.toLastPage = this.toLastPage.bind(this);
        this.toPrevPage = this.toPrevPage.bind(this);
        this.toNextPage = this.toNextPage.bind(this);
        this.toJumpPage = this.toJumpPage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            pageNum: nextProps.totalPages ? nextProps.pageNum : 0,
            totalPages: nextProps.totalPages
        });
    }

    toJumpPage(num) {
        if(num < 1 || num > this.state.totalPages) {
            return;
        }
        this.props.changePageNum(num);
    }

    toFirstPage() {
        this.toJumpPage(1);
    }

    toLastPage() {
        this.toJumpPage(this.state.totalPages);
    }

    toPrevPage() {
        this.toJumpPage(this.state.pageNum - 1);
    }

    toNextPage() {
        this.toJumpPage(this.state.pageNum + 1);
    }

    render() {
        return (
            <div className="pagination">
                <button className="btn-normal" onClick={this.toFirstPage}>首页</button>
                <button className="btn-normal" onClick={this.toPrevPage}>上一页</button>
                <span>{this.state.pageNum}/{this.state.totalPages}</span>
                <button className="btn-normal" onClick={this.toNextPage}>下页</button>
                <button className="btn-normal" onClick={this.toLastPage}>末页</button>
            </div>
        );    
    }

}

Pagination.propTypes = propTypes;

export default Pagination;