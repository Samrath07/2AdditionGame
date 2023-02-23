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
  const [timeTaken, setTimeTaken] = useState(0);

  const handleRestartGame = () => {
    setScore(0);
    setIndex(0);
    setLife(3);
    setTimeTaken(0);
  };

  useEffect(() => {
    const arr1 = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 10)
    );
    setFirstRandomNumbers(arr1);
    const arr2 = arr1.map((num) => Math.floor(Math.random() * (100 - num)));
    setSecondRandomNumbers(arr2);

    const arr3 = arr1.map((num1, itemNo) => num1 + arr2[itemNo]);
    setTwoAddition(arr3);
  }, []);

  useEffect(() => {
    setFirstNum(firstRandomNumbers[index]);
    setSecondNum(secondRandomNumbers[index]);
  }, [firstRandomNumbers, secondRandomNumbers]);

  useEffect(() => {
    getFirstNumber(index);
    getSecondNumber(index);
  }, [index, score]);

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
      //   setdisableButton(true);
      setScore(score + 1);
    } else if (life > 0) {
      setLife(life - 1);
    }
  };

  return (
    <>
      {score < 10 && life > 0 ? (
        <>
          <Typography variant="h2">
            {firstNum} + {secondNum}
          </Typography>
          <Typography variant="h3">Score: {score}</Typography>
          <Typography variant="h3">Life: {life}</Typography>

          {twoAddition.sort().map((num, itemNo) => (
            <Button
              variant="contained"
              sx={{ m: 1 }}
              onClick={handleClick}
              key={itemNo}
              value={num}
              disabled={false}
            >
              {num}
            </Button>
          ))}
        </>
      ) : (
        <>
          {/* <Button onClick={handleGameOver}>End Game</Button> */}

          <GameOverDialog
            score={score}
            timeTaken={timeTaken}
            isOpen={score === 10 || life === 0}
            onRestartGame={handleRestartGame}
          />
        </>
      )}
    </>
  );
}
