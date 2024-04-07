import React, { useState } from 'react'

const Box = ({ children }) => {
    const [toggle, setToggle] = useState(true);
    return (
        <div className="box">
            <button className="btn-toggle" onClick={() => setToggle(!toggle)}>
                {toggle ? "-" : "+"}
            </button>
            {toggle && children}
        </div>
    )
}

export default Box
