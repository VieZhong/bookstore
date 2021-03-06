import './styles.scss'

import React, { PropTypes }  from 'react';

const propTypes = {
    keyWord: PropTypes.string,
    keyWordChanged: PropTypes.func.isRequired
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChanged = this.props.keyWordChanged;
        this.clearKeyWord = this.clearKeyWord.bind(this);
    }

    clearKeyWord() {
        this.onValueChanged({
            target: {
                value: ''
            }
        });
        this.refs.keywords.value = '';
    }

    render() {
        return (
            <div className="search">
                关键字:<input ref="keywords" onChange={this.onValueChanged} name="keywords" value={this.props.keyWord}/><button className="btn-normal" onClick={this.clearKeyWord}>清空</button>
            </div>
        );         
    }
}

Search.propTypes = propTypes;

export default Search;