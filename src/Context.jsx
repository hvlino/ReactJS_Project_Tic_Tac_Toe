import React, { createContext, useState, useEffect } from "react";

export const Context = createContext({});

const AVAILABLEWINS = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
    
    const [isVolumeOn, setIsVolumeOn] = useState(true);

    const [difficulty, setDifficulty] = useState("easy");
    
    // if started true, vs-cpu. if started false,vs-player
    const [started, setStarted] = useState(false);

    const [difficultySelectionArea, setDifficultySelectionArea] = useState(false)

    // define o turno do jogador (fixo)
    const [userChoice, setUserChoice] = useState('x');

    // define o turno atual
    const [turn, setTurn] = useState('x');

    // condicao da grade de jogo atual
    const [game, setGame] = useState(new Array(9).fill(null));

    // define vencedor quando array estiver 
    const [winner, setWinner] = useState("");
    const [endgame, setEndgame] = useState(false);
    const [isCPU, setIsCPU] = useState(false);

    // const [results, setResults] = useState([]);
    const [youArr, setYouArr] = useState([]);
    const [tieArr, setTieArr] = useState([]);
    const [cpuArr, setCpuArr] = useState([]);

    // audios
    const menuSelect = new Audio('./menu-select.mp3');
    const pop = new Audio('./pop.mp3');
    const switchflick = new Audio("./switchflick.wav");
    const beam = new Audio("./beam.wav");
    const endgameSound = new Audio("./endgamesound.wav");

    const toggleVolumeOnOff = event => {
        setIsVolumeOn(current => !current);
    }


    const changeUserChoice = (choice) => {
        setUserChoice(choice);
        setTurn(choice);
        if (isVolumeOn) switchflick.play();
    }


    const selectDifficulty = (cpuOn) => {
        // if cpuOn is true, vs-CPU \\ if cpuOn is false, vs-player
        setIsCPU(cpuOn);
        if (cpuOn === true) setDifficultySelectionArea(true);
    }

    const startEasyGame = () => {
        setStarted(true);
        setDifficulty("easy");
        if (isVolumeOn) menuSelect.play();     
    }

    const startHardGame = () => {
        setStarted(true);
        setDifficulty("hard");
        if (isVolumeOn) menuSelect.play();     
    }

    // const startVsPlayerGame = () => {
    //     setStarted(true);
    //     setIsCPU(cpuOn);
    //     if (isVolumeOn) menuSelect.play();     
    // }

    const canPlayerPlay = (i) => {
        if (isCPU && turn !== userChoice) {
            return;
        }
        setChoice(i);
    }


    const setChoice = (i) => {
        if (game[i] === null) {
            //descontrucao de Array para modifica-la
            const temp = [...game];
            temp[i] = turn;
            if (!isFinished(temp)) {
                setTurn(turn === 'x' ? 'o' : 'x');
            } else {
                setEndgame(true);
                if (isVolumeOn) endgameSound.play();
            }
            setGame(temp);
            if (isVolumeOn) pop.play();
            
        } 
        
    }


    useEffect(() => {
        if (isCPU && turn !== userChoice && !endgame && difficulty === "hard") {
            setTimeout(() => cpuChoiceHardMode(game), 500);
        } else if (isCPU && turn !== userChoice && !endgame && difficulty === "easy") {
            setTimeout(() => cpuChoiceEasyMode(game), 500);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game])


    const cpuChoiceHardMode = (temp) => {
        let position = null;
        
        // try to win, avoid or random
        position = findCorrectPosition(temp, position, turn);
        if (position === null || position === undefined) position = findCorrectPosition(temp, position, userChoice)
        if (position === null || position === undefined) position = getRndEmpty(temp);
        
        setChoice(position);
        if (isVolumeOn) pop.play();
    }

    const cpuChoiceEasyMode = (temp) => {
        let position = null;
        
        // random
        if (position === null || position === undefined) position = getRndEmpty(temp);
        
        setChoice(position);
        if (isVolumeOn) pop.play();
    }


    const findCorrectPosition = (temp, positionParam, who) => {
        let position = positionParam;
        if (position === null) {
            for (let i = 0; i < AVAILABLEWINS.length; i++) {
                const pos1 = temp[AVAILABLEWINS[i][0]];
                const pos2 = temp[AVAILABLEWINS[i][1]];
                const pos3 = temp[AVAILABLEWINS[i][2]];

                if ([pos1,pos2,pos3].filter((p) => p === who).length === 2) {
                    const indexOfNullCell = [pos1,pos2,pos3].findIndex((p) => p === null);
                    if (indexOfNullCell > -1) position = AVAILABLEWINS[i][indexOfNullCell];
                } 
                // Stop for 
                if (position !== null) i = AVAILABLEWINS.length;
            }
        }
        return position;     
    }



    const getRndEmpty = (currentGame) => {
        const randNum = Math.floor(Math.random() * currentGame.length);
        if (currentGame[randNum] && currentGame.some((e) => e === null)) {
            return getRndEmpty(currentGame);
        }
        return randNum;
    }

    const isFinished = (currentGame) => {
        //  posicao vitoriosa e acaba jogo
        for (let i = 0; i < AVAILABLEWINS.length; i++) {
            const pos1 = currentGame[AVAILABLEWINS[i][0]];
            const pos2 = currentGame[AVAILABLEWINS[i][1]];
            const pos3 = currentGame[AVAILABLEWINS[i][2]];
            if (pos1 && pos1 === pos2 && pos2 === pos3) {
                setWinner(pos1);
                if (pos1 === userChoice) {
                    youArr.push([1]);
                } else {
                    cpuArr.push([1]);
                }
                return true;
            }
        }
        
        // Empate e jogo acaba
        if (!currentGame.some((e) => e === null)) {
            setWinner('TIE');
            tieArr.push("tie");
            return true;
        }
        return false;
    }

    const restartGame = () => {
        setGame(new Array(9).fill(null));
        setEndgame(false);
        setTurn(userChoice);
        if (isVolumeOn) beam.play();
        setDifficultySelectionArea(false);
    }


    const resetGame = () => {
        setGame(new Array(9).fill(null));
        setEndgame(false);
        setTurn(userChoice);
        setStarted(false);
        setYouArr([]);
        setTieArr([]);
        setCpuArr([]);
        setDifficultySelectionArea(false);
        setIsCPU(false);
    }    
    

    const values = { 
        isVolumeOn,
        toggleVolumeOnOff,
        started, 
        setStarted,
        userChoice,
        setUserChoice,
        game,
        setGame,
        setChoice,
        changeUserChoice,
        turn,
        winner,
        endgame,
        restartGame,
        resetGame,
        isCPU,
        canPlayerPlay,
        youArr,
        tieArr,
        cpuArr,
        difficultySelectionArea,
        selectDifficulty,
        startHardGame,
        startEasyGame
    };
    return <Context.Provider value={values}>
        {children}
    </Context.Provider>
};