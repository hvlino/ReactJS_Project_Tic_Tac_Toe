import './Endgame.scss';
import { Context } from "../../Context";
import React, { useContext } from 'react';
import Button from '../Button/Button';


export default function Endgame() {

    const { winner, restartGame, resetGame } = useContext(Context);

    return (<>
        <div className="endgame">
            <div className='endgame-background'>
                <div className="game-over">
                    {winner === 'TIE' ? 'empate!' : <div>{winner} wins!</div>}
                </div>
                <div className='buttons'>
                    <Button theme="gray" size="small" onClick={() => resetGame()}>
                    Quit
                    </Button>
                    <Button theme="orange" size="small" onClick={() => restartGame()}>
                    Next Round
                    </Button>
                </div>
            </div>
        </div>

        
        
    </>
        
    )
}