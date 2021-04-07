import React from 'react';
import {Button, Col} from 'react-bootstrap';
import './Session.css';

const Session = (props) => {
    const {increment, decrement, length} = props;

    return (
        <Col className='session-container'>
            <p id="session-label">Session</p>
            <Button variant="danger" onClick={decrement} id="session-decrement">-</Button>
            <span id="session-length">{length / 60}</span>
            <Button variant="danger" onClick={increment} id="session-increment">+</Button>
        </Col>
    )
}

export default Session;