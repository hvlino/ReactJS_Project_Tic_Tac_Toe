import './ToggleChoice.scss';
import { Context } from '../../../../Context';
import React, { useContext } from 'react';

import { faX, faO } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ToggleChoice() {
    
    const { userChoice, changeUserChoice, turn } = useContext(Context);
    const x = <FontAwesomeIcon icon={faX} className="x"></FontAwesomeIcon>;
    const o = <FontAwesomeIcon icon={faO} className="o"></FontAwesomeIcon>;

    return <div className='togglechoice'>
        <p className='pick'>
        PICK PLAYER 1'S MARK
        </p>
        <div className="placeholder-choice">
            <div className={"square choice-" + userChoice}></div>
            <div className="chooseone">
                <button className={userChoice === 'x' ? 'active' : ''} onClick={() => changeUserChoice('x')}>{ x }</button>
                <button className={userChoice === 'o' ? 'active' : ''} onClick={() => changeUserChoice('o')}>{ o }</button>
            </div>
        </div>
        <p className='remember'>REMEMBER {turn} GOES FIRST</p>
    </div>
}