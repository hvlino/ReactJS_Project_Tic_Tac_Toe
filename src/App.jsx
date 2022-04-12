import 'reset-css';
import './App.scss';
import React, { useContext } from 'react';
import { Context } from './Context';
import StartGame from './components/StartGame/StartGame';
import Game from './components/Game/Game';


function App() {
  const { started  } = useContext(Context);
  return (
    
    <div className="App">
     { started ? <Game /> : <StartGame />} 

    </div>
  );
}

export default App;