import React, { useState, useEffect, useRef} from 'react';
import './../Profile.css'

const HighlightSummary = (props) => {

    const {highlight} = props;
    
    return(
        <a className="card">
            <img src={highlight.img} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{highlight.name}</h5>
                <p className="card-text">{highlight.description}</p>
                <a href={"https://" + highlight.link} target="_blank" className="btn btn-read-more">
                    Read More
                    <i className="bi bi-arrow-right ms-3"></i>
                </a>
            </div>
        </a>
    )
}

export default HighlightSummary;