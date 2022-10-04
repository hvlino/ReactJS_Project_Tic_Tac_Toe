import 'reset-css';
import './App.scss';
import React, { useContext } from 'react';
import { Context } from './Context';
import MainMenu from './components/MainMenu/MainMenu';
import Game from './components/Game/Game';


function App() {
  const { started  } = useContext(Context);
  return (
    
    <div className="App">
     { started ? <Game /> : <MainMenu />} 

    </div>
  );
}

export default App;