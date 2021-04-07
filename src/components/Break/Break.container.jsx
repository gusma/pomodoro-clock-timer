import React from 'react';
import {Button, Col} from 'react-bootstrap';
import './Break.css';

const Break = (props) => {
    const {increment, decrement, length} = props;
    return (
        <Col>
            <div className='break-container'>
                <p id="break-label">Break</p>
                <Button variant="danger" onClick={decrement} id="break-decrement">-</Button>
                <span id="break-length">{length / 60}</span>
                <Button variant="danger" onClick={increment} id="break-increment">+</Button>
            </div>
        </Col>
    )
}

export default Break;