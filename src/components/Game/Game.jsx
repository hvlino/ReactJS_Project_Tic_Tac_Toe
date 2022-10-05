import './Game.scss';
import { Context } from '../../Context';
import React, { useContext } from 'react';
import Endgame from '../Endgame/Endgame';
import Button from '../Button/Button';
import {ReactComponent as O} from '../../assets/o-solid.svg';
import {ReactComponent as X} from '../../assets/x-solid.svg';

import { faArrowLeftRotate } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Game() {

    const { game, endgame, canPlayerPlay, resetGame, restartGame, turn, userChoice, youArr, tieArr, cpuArr } = useContext(Context);
    const x = <X className="x"/>
    const o = <O className="o"/>
    const buttonCSS = (elem) => {
        if (userChoice === 'x') {
            const classes = ['cell-x'];
            if (elem) classes.push('filled') 
            return classes.join(' ');
        } else if (userChoice === 'o') {
            const classes = ['cell-o'];
            if (elem) classes.push('filled') 
            return classes.join(' ');
        }

    }

    const fill = (elem) => {
        if (elem) return elem === 'x' ? x : o;
        return null;
    }

    return <div className='game'>        
        <div className='up-side'>
            <div className='buttons'>
                <div className="homescreen-button">
                    <Button theme="gray" size="small" onClick={() => restartGame()}><FontAwesomeIcon icon={faArrowLeftRotate}></FontAwesomeIcon></Button>
                </div>
                <div className="exit-button">
                    <Button theme="gray" size="small" onClick={() => resetGame()}><FontAwesomeIcon icon={faX}></FontAwesomeIcon></Button>
                </div>
            </div>
            <div className="which-turn">
                <p>{turn === "x" ? "x" : "o"} TURN</p>
            </div>
        </div>

        <div className='gamegrid'>
        {game.map((elem, i) => {
            return <button key={i} className={buttonCSS(elem)} onClick={() => canPlayerPlay(i)}>
                {fill(elem)}
            </button>
        })}
        </div>
        <div className='counters'>
            <div> 
            
            </div>
        </div>


        <div className='down-side'>
            <div className='you-count'>
                ({userChoice === 'o' ? "o" : "x"}) You <br />
                {youArr.length}
            </div>
            <div className="tie-count">
                TIES <br />
                {tieArr.length}
            </div>
            <div className="cpu-count">
                ({userChoice === 'x' ? "o" : "x"}) CPU <br />
                {cpuArr.length}
            </div>
        </div>

        {endgame && <Endgame />}

    </div>
    
}   