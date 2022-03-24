import React from "react"
import Game from "./components/Game"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


const App = () => {


    const randomNum = () => {
        const  newArray = []
          for( let i = 0; i < 10; i++) {
              newArray.push(   {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id : nanoid()
            })
          }
          return newArray
      }
  
   
    const [dice, updateDice] = React.useState(randomNum())
    
    const randoms = () => {
     if(win === true) {
         updateWin(false)
         updateDice(randomNum())
     } else {
        updateDice(pres => pres.map(datas => {
            return datas.isHeld === true ? datas : {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id : nanoid()
            }
        }))
     }
    }
   
    const change = (id) => {
       updateDice(pres => pres.map(data => {
           return( 
               
            id === data.id  ? {...data, isHeld: !data.isHeld} : data)
       }))
    }
    
   const multipleDice = dice.map(die => <Game 
    key = {die.id} 
    value={die.value} 
    isHeld={die.isHeld} 
    handle = {() => change(die.id)}/>)

    const [win, updateWin] = React.useState(false)
    
    React.useEffect(() => {
      const checkisHeld = dice.every(die => die.isHeld)
     const firstValue = dice[0].value
     const checkValue = dice.every(die => firstValue === die.value)
      if (checkValue && checkisHeld) {
         updateWin(pres => !pres)
      }
    }, [dice])
 

    return (
        <div className="container">
            {win === true && <Confetti />}
            <div className="child">
                <h1>Tenzies</h1>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
           <div className="mother">
            {multipleDice}
             <div className="but">
             <button className="buts" onClick={randoms}>{win ? "Restart" : "Roll"}</button>
             </div>
           </div>
        </div>
    )
}

export default App