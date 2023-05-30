import React from 'react';
import HighlightSummary from './HighlightSummary';

const HighlightsList = (props) => {

    const {highlights} = props;

    return(
        <div id="carousel-highlights" className="carousel slide mt-2" data-ride="carousel">
            <div className="carousel-inner">
                {highlights && highlights.map((highlight,idx) => {
                    let activeClass = idx === 0 ? "carousel-item active" : "carousel-item";
                    return (
                        <div key={idx} className={activeClass}>
                            <HighlightSummary  highlight={highlight} />
                        </div>  
                    )
                })}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel-highlights" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="false"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel-highlights" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="false"></span>
            </button>
        </div> 
    )
}

export default HighlightsList;