import './StartGame.scss';
import ToggleChoice from './components/ToggleChoice/ToggleChoice.jsx'
import { Context } from '../../Context';
import React, { useContext } from 'react';
import Button from '../Button/Button';

import { faX, faO, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function StartGame() {

    const { startGame, isVolumeOn, toggleVolumeOnOff } = useContext(Context);

    return <div className='startgame'>
        <h1><FontAwesomeIcon icon={faX} className="xsymb"/><FontAwesomeIcon icon={faO} className="osymb"/></h1>
            <ToggleChoice />
            <Button theme="orange" onClick={() => startGame(true)}>NEW GAME (VS CPU)</Button>
            <Button theme="blue" onClick={() => startGame(false)}>NEW GAME (VS PLAYER)</Button>
            <Button theme="gray" size="small" onClick={toggleVolumeOnOff}><FontAwesomeIcon icon={isVolumeOn ? faVolumeUp : faVolumeMute} className={isVolumeOn ? 'volume-on' : 'volume-off'}/></Button>
        <footer>Made with love by Henrique Vieira Lino <br />
                April, 2022. Campinas - SP, Brazil.
        </footer>
        </div>
}