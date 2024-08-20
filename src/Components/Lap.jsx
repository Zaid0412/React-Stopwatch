export default function Lap(props){
    return (
        <div className="lap">
            <h2 className="lap-num">Lap {props.lapNum}</h2>
            <h2 className="lap-time">{props.lapTime}</h2>
        </div>
    )
}