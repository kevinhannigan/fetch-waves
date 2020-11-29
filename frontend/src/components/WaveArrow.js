import React from 'react'
import arrow from '../images/arrow-up.png'
import '../css/WaveCard.css'

const WaveArrow = ({ direction }) => {
    const degree = direction;
    const mystyle = {
        padding: "2px",
        transform: `rotate(${degree}deg)`,
        width: "20px"
    };
    return (
        <div>
            <img src={arrow} style={mystyle} alt={'arrow'} />
            <div>
                {Math.round(direction - 180)}
            </div>
        </div>
    )
}

export default WaveArrow
