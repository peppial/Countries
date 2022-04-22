import React from "react";


function Details(props) {


    const row = props.row;
    if (props.show)
        return <div id="myModal" className="modal">
            <div className="modal-content">
                <div className="row">                <span className="column">
                    <h2>{row ? row.name : ""}</h2>
                    <h2><img width="200" src={row ? row.flag : ""} /></h2>
                </span>
                    <span className="column">
                        <h4>Region: {row ? row.region : ""}</h4>
                        <h4>Subregion: {row ? row.subregion : ""}</h4>
                    </span>
                    <span className="column">
                        <h4>Population: {row ? row.population : ""}</h4>
                   </span>
                </div>
            </div>
        </div>
    return "";
}

export default Details