import React from "react"

const Game = (props) => {
     
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
            <div className="childBox" style={styles} onClick={props.handle}>
           <div className="text">{props.value}</div>
            </div>
    )
}

export default Game