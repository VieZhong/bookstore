import './styles.scss'

import React, { PropTypes }  from 'react';

const propTypes = {
    keyWordChanged: PropTypes.func.isRequired
}

function Search({keyWordChanged: onValueChanged}) {

    return (
        <div className="search">
            关键字:<input onChange={onValueChanged} name="keywords"/>
        </div>
    );    

}

Search.propTypes = propTypes;

export default Search;