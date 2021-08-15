import { Button, Card, Paper, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Category } from './Model/Category';

import './App.css';
import { ClueCard } from './Model/ClueCard';
import PickHand from './PickHand';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home playerCount={0} />
          </Route>
          <Route path='/which:playerCount' render={(matchProps)=>
            <WhichPlayer {...matchProps}/>
            }/>
          <Route path='/hand:playerId' render={(matchProps)=>
            <PickHand matchProps = {matchProps} cards = {cards}/>
            }/>
        </Switch>
      </div>
    </Router>
  );
}

function Home(props: { playerCount: number }) {

  const [count, setCount] = useState(2);
 
  const handleNumberChange = (e: any) => {
    e.preventDefault();
    setCount(e.target.value) 
  }

  return (
    <Card>
      <h1>How Many Players?
      </h1>
      <TextField
        type="number"
        onChange={handleNumberChange}
        
        InputProps={{
          inputProps:{
          defaultValue: 2, min:2, max:6
          }
        }} />
      <Link to={`/which:${count}`}>
        <Button >OK</Button>
      </Link>
    </Card>
  )
}

function WhichPlayer(props:any) {
  const playerCount = parseInt(props.match.params.playerCount.replace(':', ''));

  const [mainPlayerPosition, setCount] = useState(0);
  
  const handleNumberChange = (e: any) => {
    e.preventDefault();
    setCount(e.target.value) 
  }

  return (
    <Card >
      <h1>Which Player Are You?
      </h1>
      <TextField
        type="number"
        onChange={handleNumberChange}
        InputProps={{
          inputProps:{
          defaultValue: 1, min:1, max:playerCount
          }
        }} />
        <Link to={`/hand:${mainPlayerPosition}`}>
      <Button>OK</Button>
      </Link>
    </Card>
  )
}

const cardData = {
  "suspects": [
    "homer",
    "bart",
    "lisa",
    "marge",
    "krusty",
    "smithers"
  ],
  "weapons": [
    "glove",
    "sax",
    "necklace",
    "donut",
    "plutonium",
    "slingshot"
  ],
  "scenes": [
    "studio",
    "arcade",
    "house",
    "manor",
    "kwiki",
    "retirement",
    "dutchman",
    "nuke-plant"
  ]
}

let cards:ClueCard[] = [];
for(let suspect of [...cardData.suspects]) {
  let card: ClueCard = new ClueCard( suspect, 'suspect');
  cards.push( card);
}
for(let weapon of [...cardData.weapons]) {
  let card: ClueCard = new ClueCard( weapon, 'weapon');
  cards.push( card);
}
for(let scene of [...cardData.scenes]) {
  let card: ClueCard = new ClueCard( scene, 'scene');
  cards.push( card);
}

export default App;
