import './MainMenu.scss';
import ToggleChoiceXO from './components/ToggleChoiceXO/ToggleChoiceXO.jsx'
import { Context } from '../../Context';
import React, { useContext } from 'react';
import Button from '../Button/Button';
import SelectDifficulty from '../SelectDifficulty/SelectDifficulty';


import { faX, faO, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function MainMenu() {

    const { selectDifficulty, isVolumeOn, toggleVolumeOnOff, difficultySelectionArea, startEasyGame } = useContext(Context);

    return <div className='mainmenu'>
        <h1><FontAwesomeIcon icon={faX} className="xsymb"/><FontAwesomeIcon icon={faO} className="osymb"/></h1>
            <ToggleChoiceXO />
            <Button theme="orange" onClick={() => selectDifficulty(true)}>NEW GAME (VS CPU)</Button>
            <Button theme="blue" onClick={() => startEasyGame()}>NEW GAME (VS PLAYER)</Button>
            <Button theme="gray" size="small" onClick={toggleVolumeOnOff}><FontAwesomeIcon icon={isVolumeOn ? faVolumeUp : faVolumeMute} className={isVolumeOn ? 'volume-on' : 'volume-off'}/></Button>
        <footer>Made with love by Henrique Vieira Lino <br />
                &copy; 2022. Campinas - SP, Brazil.
        </footer>

        {difficultySelectionArea && <SelectDifficulty />}
        </div>
}