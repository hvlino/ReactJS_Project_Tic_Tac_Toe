import './SelectDifficulty.scss';
import { Context } from "../../Context";
import React, { useContext } from 'react';
import Button from '../Button/Button';


export default function SelectDifficulty() {

    const { startEasyGame, startHardGame } = useContext(Context);

    return (<>
        <div className="selectdifficulty">
            <div className='selectdifficulty-background'>
                <div className="game-over">
                    Select Difficulty
                </div>
                <div className='buttons'>
                    <Button theme="gray" size="small" onClick={() => startEasyGame()}>
                    Easy
                    </Button>
                    <Button theme="gray" size="small" onClick={() => startHardGame()}>
                    Hard
                    </Button>
                </div>
            </div>
        </div>

        
        
    </>
        
    )
}