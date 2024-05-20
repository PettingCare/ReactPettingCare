import React from "react";
import svg from "../../Componentes/Assets/404.svg";
import "./NotFound.css"
const NotFound = () => {
    return (
        <>
            <div className="cont-404">
                <img src={svg} alt="svg" />
            </div>
        </>
    );
};

export default NotFound;