import { Button, Card, Paper, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home playerCount={0} />
          </Route>
          <Route exact path='/which'>
            <WhichPlayer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home(props: { playerCount: number }) {

  const [count, setCount] = useState(0);
 
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
      <Link to='/which' >
        <Button >OK</Button>
      </Link>
    </Card>
  )
}

function WhichPlayer() {

  const [count, setCount] = useState(0);
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
          defaultValue: 1, min:1, max:6
          }
        }} />
      <Button>OK</Button>
    </Card>
  )
}

export default App;
