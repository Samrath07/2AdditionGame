/* eslint-disable react-hooks/exhaustive-deps */
// import { Button } from "@mui/material";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import GameOverDialog from "./CustomDialog";

export default function Game() {

    const [firstRandomNumbers, setFirstRandomNumbers] = useState([]);
    const [secondRandomNumbers, setSecondRandomNumbers] = useState([]);
    const [twoAddition, setTwoAddition] = useState([]);
    const [index, setIndex] = useState(0);
    const [firstNum, setFirstNum] = useState(firstRandomNumbers[index]);
    const [secondNum, setSecondNum] = useState(secondRandomNumbers[index]);
    const [life, setLife] = useState(3);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [recordTime, setRecordTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleRestartGame = () => {
      setScore(0);
      setIndex(0);
      setLife(3);
      setTimer(0);
      setIsTimerRunning(true);
      setGameOver(false);
      setRecordTime(0);
    };

    useEffect(() => {
      let intervalId;
      if (isTimerRunning) {
        intervalId = setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 1000);
      }
      return () => clearInterval(intervalId);
    }, [isTimerRunning]);

    useEffect(() => {
      if (index === 0) {
        const arr1 = Array.from({ length: 10 }, () =>
          Math.floor(Math.random() * 100)
        );
        setFirstRandomNumbers(arr1);
        const arr2 = arr1.map((num) => Math.floor(Math.random() * (100 - num)));
        setSecondRandomNumbers(arr2);

        const arr3 = arr1.map((num1, itemNo) => num1 + arr2[itemNo]);
        setTwoAddition(arr3);
      }
    }, [index]);

    useEffect(() => {
      setFirstNum(firstRandomNumbers[index]);
      setSecondNum(secondRandomNumbers[index]);
    }, [firstRandomNumbers, secondRandomNumbers]);

    useEffect(() => {
      getFirstNumber(index);
      getSecondNumber(index);
      checkGameOver();
    }, [index, score, life]);

    const checkGameOver = () => {
      if (index === 10 || life === 0) {
        setGameOver(true);
        setIsTimerRunning(false);
        setRecordTime(timer);
      }
    };

    const getFirstNumber = (index) => {
      if (index < firstRandomNumbers.length) {
        return setFirstNum(firstRandomNumbers[index]);
      }
    };
    const getSecondNumber = (index) => {
      if (index < secondRandomNumbers.length) {
        return setSecondNum(secondRandomNumbers[index]);
      }
    };

    const handleClick = (event) => {
      const addTwoNum = firstNum + secondNum;
      if (event.target.value === addTwoNum.toString()) {
        setTwoAddition(twoAddition.filter((num) => num !== addTwoNum));
        setIndex(index + 1);
        setScore(score + 1);
      } else if (life > 0) {
        setLife(life - 1);
        setIndex(index + 1);
      }
    };

    return (
      <>
        {!gameOver ? (
          <>
            <Typography variant="h2">
              {firstNum} + {secondNum}
            </Typography>
            <Typography variant="h3">Score: {score}</Typography>
            <Typography variant="h3">Life: {life}</Typography>
            <Typography variant="h3">Time Taken: {timer} sec</Typography>

            {twoAddition.sort().map((num, itemNo) => (
              <Button
                variant="contained"
                sx={{ m: 1 }}
                onClick={handleClick}
                key={itemNo}
                value={num}
              >
                {num}
              </Button>
            ))}
          </>
        ) : (
          <>
            <GameOverDialog
              score={score}
              timeTaken={recordTime}
              isOpen={index === 10 || life === 0}
              onRestartGame={handleRestartGame}
            />
          </>
        )}
      </>
    );
}
