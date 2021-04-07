import React, {useState, useEffect} from 'react';
import {Button, Container, Row} from 'react-bootstrap';
import Break from './components/Break/Break.container';
import Session from './components/Session/Session.container';
import Timer from './components/Timer/Timer.container';
import './App.css';

function App() {
    const [mode, setMode] = useState('session');
    const [timeLeft, setTimeLeft] = useState();
    const [isActive, setIsActive] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);
    const [beep] = useState(new Audio("https://freesound.org/data/previews/533/533847_10725617-lq.mp3"));
    const [beepPlaying, setBeepPlaying] = useState(false);
    const [breakLength, setBreakLength] = useState(5 * 60);
    const [sessionLength, setSessionLength] = useState(25 * 60);

    // Mark initial session and break Lengths in seconds coming from initialState.
    React.useEffect(() => {
        setTimeLeft(mode === "session" ? sessionLength * 1000 : breakLength * 1000);
    }, [sessionLength, mode, breakLength]);

    // Get intervals running if isActive and timeLeft is larger than 1.
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 1) {
            setTimeLeft(
                mode === "session"
                    ? sessionLength * 1000 - timeSpent
                    : breakLength * 1000 - timeSpent
            );
            interval = setInterval(() => {
                setTimeSpent((timeSpent) => timeSpent + 1000);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        // If no time left, let the alarm sound loud, set Beep Playing, time spent, mode, restart time left.
        if (timeLeft === 0) {
            beep.play();
            setBeepPlaying(true);
            setTimeSpent(0);
            setMode((mode) => (mode === "session" ? "break" : "session"));
            setTimeLeft(
                mode === "session" ? sessionLength * 1000 : breakLength * 1000
            );
        }
        return () => clearInterval(interval);
    }, [beep, breakLength, mode, sessionLength, timeLeft, isActive, timeSpent]);

    useEffect(() => {
        beep.addEventListener("ended", () => setBeepPlaying(false));
        return () => {
            beep.addEventListener("ended", () => setBeepPlaying(false));
        };
    }, [beep]);

    // Helper functions. ToDo: Get them out of the app.js file to a helper file.
    function decrementBreakLength() {
        const decreasedBreakLength = breakLength - 60 > 60 ? breakLength - 60 : 60;
        setBreakLength(decreasedBreakLength);
    }

    function incrementBreakLength() {
        const incrementedBreakLength =
            breakLength + 60 <= 60 * 60 ? breakLength + 60 : 60 * 60;
        setBreakLength(incrementedBreakLength);
    }

    function decrementSessionLength() {
        const decreasedSessionLength = sessionLength - 60 > 60 ? sessionLength - 60 : 60;
        setSessionLength(decreasedSessionLength);
    }

    function incrementSessionLength() {
        const incrementedSessionLength =
            sessionLength + 60 <= 60 * 60 ? sessionLength + 60 : 60 * 60;
        setSessionLength(incrementedSessionLength);
    }

    function reset() {
        setBreakLength(5 * 60);
        setSessionLength(25 * 60);
        setTimeLeft(mode === "session" ? sessionLength * 1000 : breakLength * 1000);

        if (isActive) {
            setIsActive(false);
            setTimeSpent(0);
        }
        // Stop the player
        if (beepPlaying) {
            beep.pause();
            beep.currentTime = 0;
            setBeepPlaying(false);
        }
    }

    // Set if timer is active or not.
    function toggleIsActive() {
        setIsActive(!isActive);
    }

    return (
        <div className="App">
            <Container className="text-center">
                <Timer time={timeLeft} mode={mode}/>
                <div className="buttons">
                    <Button onClick={toggleIsActive} id="start_stop" variant='dark' className='first-button' size='lg'>
                        {isActive ? "Pause" : "Start"}
                    </Button>
                    <Button onClick={reset} id="reset" variant="danger" size='lg'>
                        Reset
                    </Button>
                </div>
                <Row fluid='md'>
                    <Break
                        length={breakLength}
                        decrement={decrementBreakLength}
                        increment={incrementBreakLength}
                    />
                    <Session
                        length={sessionLength}
                        decrement={decrementSessionLength}
                        increment={incrementSessionLength}
                    />
                </Row>
                <p className='footer'>This module has been developed by <b>Gustavo Malamud</b> for the <b>FreeCodeCamp Frontend Libraries</b> track. </p>
            </Container>
        </div>
    );
}

export default App;
