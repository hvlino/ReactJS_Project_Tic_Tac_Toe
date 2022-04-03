import './StartGame.scss';
import ToggleChoice from './components/ToggleChoice/ToggleChoice.jsx'
import { Context } from '../../Context';
import React, { useContext } from 'react';
import Button from '../Button/Button';

export default function StartGame() {

    const { startGame } = useContext(Context);

    return <div className='startgame'>
        <h1>TIC TAC TOE</h1>
            <ToggleChoice />
            <Button theme="orange" onClick={() => startGame(true)}>NEW GAME (VS CPU)</Button>
            <Button theme="blue" onClick={() => startGame(false)}>NEW GAME (VS PLAYER)</Button>
        </div>
}