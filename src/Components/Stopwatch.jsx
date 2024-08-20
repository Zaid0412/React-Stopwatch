import React, {useState, useEffect, useRef} from 'react';
import '../Stopwatch.css'
import Lap from './Lap'

export default function Stopwatch(){
    const [timerState, setTimerState] = useState('Start')
    const [timerStarted, setTimerStarted] = useState(false)
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [laps, setLaps] = useState([])
    const [lapCount, setLapCount] = useState(1)
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);


    useEffect(() => {

        if(isRunning){
            document.querySelector('.start-btn').classList.add('isRunning')
            document.querySelector('.lap-btn').classList.add('isRunning')
            document.querySelector('.lap-btn').disabled = false
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            document.querySelector('.start-btn').classList.remove('isRunning')
            document.querySelector('.lap-btn').disabled = true
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);

    // useEffect(() => {
    //     if (!isRunning && timerStarted) {
            
    //         console.log('reset btn => now');
    //         document.querySelector('.lap-btn').textContent = 'Reset'
    //         document.querySelector('.lap-btn').removeEventListener('click', () => handleLap(formatTime())) 
    //         document.querySelector('.lap-btn').addEventListener('click', reset) 
    //     }
        
    //     return () => {
    //         document.querySelector('.lap-btn').textContent = 'Lap'
    //         document.querySelector('.lap-btn').removeEventListener('click', reset) 
    //         document.querySelector('.lap-btn').addEventListener('click', () => handleLap(formatTime())) 
    //         console.log(formatTime());
            
    //     }
    // }, [timerStarted, isRunning])

    function start(){
        setIsRunning(true);
        setTimerStarted(true)
        setTimerState('Stop')
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop(){
        setIsRunning(false);
        setTimerState('Start')
    }

    
    function toggleTimer(){
        if (!isRunning) {
            start()
        }else if (isRunning) {
            stop()
        }
    }

    function reset(){
        setIsRunning(false);
        setTimerState('Start')
        setTimerStarted(false)
        setElapsedTime(0);
        setLapCount(1)
        setLaps([])
        document.querySelector('.lap-btn').classList.remove('isRunning')
        document.querySelector('.lap-btn').disabled = true
    }

    function handleLap(lapTime){
        setLaps([...laps, {
            lapNum:lapCount,
            lapTime: lapTime,
            lapKey: lapCount
        }])
        setLapCount(lapCount + 1)
        console.log(laps);
        
    }

    function formatTime(){

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    }
    return (
        <div className="stopwatch">
            <div className="display">
                <h1>{formatTime()}</h1>
            </div>
            <div className="controls">
                <button className="lap-btn" onClick={() => handleLap(formatTime())}>Lap</button>
                <button className="reset-btn" onClick={reset}>Reset</button>
                <button className="start-btn" onClick={toggleTimer}>{timerState}</button>
            </div>
            <div className="laps-display">
                {laps.map(lap => {
                    return <Lap lapNum={lap.lapNum} lapTime={lap.lapTime} key={lap.lapKey} />
                })}
            </div>
        </div>
    )
}
