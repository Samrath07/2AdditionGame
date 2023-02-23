import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const GameOverDialog = ({ score, timeTaken, isOpen, onRestartGame }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Game Over</DialogTitle>
      <DialogContent>
        <Typography>Score: {score}</Typography>
        <Typography>Time Taken: {timeTaken} seconds</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRestartGame} color="primary">
          Start New Game
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameOverDialog;
