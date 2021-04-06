import React from 'react';
import './Timer.css';

const Timer = (props) => {
    const { time, mode } = props;

    const min = Math.floor(time / 1000 / 60);
    const sec = Math.floor((time / 1000) % 60)
return (
    <div>
        <p>{mode.toUpperCase()}</p>
        <p class='timer-main-number'>{min}:{sec.toString().length === 1 ? "0" + sec : sec }</p>
    </div>
)
}

export default Timer;