import React, { useCallback, useEffect, useReducer, useState } from "react";
import Cell from "../components/Cell";
import "../styles/Home.css";

//false -> X, true -> O
const initialState = {
  player: false,
  cellIds: new Set(),
  currentPointer: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "MAKE_MOVE":
      return {
        ...state,
        player: !state.player,
        cellIds: new Set(state.cellIds.add(action.payload.id)),
        currentPointer: [action.payload.xIndex, action.payload.yIndex],
      };
    case "RESET":
      return initialState;
  }
};

export default function Home({ gridSize, winSize }) {
  const [gridState, dispatch] = useReducer(reducer, initialState);
  const [gridCells, setGridCells] = useState(
    Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => ({
        id: crypto.randomUUID(),
        value: "",
      })),
    ),
  );
  const [isGameOver, setIsGameOver] = useState(-1);

  const handleToggle = useCallback(
    (id, xIndex, yIndex) => {
      if (gridState.cellIds.has(id)) {
        return;
      }
      if (isGameOver !== -1) {
        return;
      }
      setGridCells((prev) =>
        prev.map((item) =>
          item.map((el) =>
            el.id === id
              ? !gridState.player
                ? { ...el, value: "X" }
                : { ...el, value: "O" }
              : el,
          ),
        ),
      );
      dispatch({ type: "MAKE_MOVE", payload: { id, xIndex, yIndex } });
    },
    [gridCells, isGameOver, gridState],
  );

  const checkGameStatus = () => {
    //Check horizontal
    if (gridState.cellIds.size === gridSize * gridSize) {
      setIsGameOver(0);
      return;
    }
    let counter1 = 0;
    let x = gridState.currentPointer[0];
    let k = gridState.currentPointer[1];
    let temp = k;
    let val = !gridState.player ? "O" : "X";
    let counter2 = 0;
    while (k >= 0) {
      if (gridCells[x][k].value === val) {
        counter1++;
        k--;
        if (counter1 === winSize) {
          break;
        }
      } else if (gridCells[x][k].value !== val) {
        break;
      }
    }
    k = temp + 1;
    while (k < gridSize) {
      if (gridCells[x][k].value === val) {
        counter2++;
        k++;
        if (counter2 + counter1 === winSize) {
          break;
        }
      } else if (gridCells[x][k].value !== val) {
        break;
      }
    }
    if (counter1 + counter2 === winSize) {
      setIsGameOver((prev) => (gridState.player ? 1 : 2));
    }
    //vertical
    counter1 = 0;
    counter2 = 0;

    x = gridState.currentPointer[0];
    k = gridState.currentPointer[1];
    temp = x;
    while (x >= 0) {
      if (gridCells[x][k].value === val) {
        counter1++;
        x--;
        if (counter1 === winSize) {
          break;
        }
      } else if (gridCells[x][k].value !== val) {
        break;
      }
    }
    x = temp + 1;
    while (x < gridSize) {
      if (gridCells[x][k].value === val) {
        counter2++;
        x++;
        if (counter1 + counter2 === winSize) {
          break;
        }
      } else if (gridCells[x][k].value !== val) {
        break;
      }
    }
    if (counter1 + counter2 === winSize) {
      setIsGameOver((prev) => (gridState.player ? 1 : 2));
    }
    //Diagonal
    counter1 = 0;
    counter2 = 0;
    x = gridState.currentPointer[0];
    k = gridState.currentPointer[1];
    let tempX = x;
    let tempK = k;
    while (x >= 0 && k >= 0) {
      if (gridCells[x][k].value === val) {
        counter1++;
        x--;
        k--;
        if (counter1 === winSize) {
          break;
        }
      } else if (gridCells[x][k].value !== val) {
        break;
      }
    }
    x = tempX + 1;
    k = tempK + 1;
    while (x < gridSize && k < gridSize) {
      if (gridCells[x][k].value === val) {
        counter2++;
        x++;
        k++;
        if (counter1 + counter2 === winSize) {
          break;
        }
      } else if (gridCells[x][k].value !== val) {
        break;
      }
    }
    if (counter1 + counter2 === winSize) {
      setIsGameOver((prev) => (gridState.player ? 1 : 2));
    }
  };

  useEffect(() => {
    checkGameStatus();
  }, [gridState]);

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setGridCells((prev) =>
      prev.map((item) => item.map((cell) => ({ ...cell, value: "" }))),
    );
  };

  return (
    <div>
      {isGameOver === -1 ? (
        <div>{!gridState.player ? "Player 1 plays" : "Player 2 plays"}</div>
      ) : isGameOver === 1 ? (
        <div>Player 1 wins</div>
      ) : isGameOver === 2 ? (
        <div>Player 2 wins</div>
      ) : (
        <div>No one wins</div>
      )}
      <div className="grid">
        {gridCells.map((cell, index) => {
          return (
            <div className="row" key={index}>
              {cell.map((item, idx) => (
                <Cell
                  key={item.id}
                  value={item.value}
                  onToggle={() => handleToggle(item.id, index, idx)}
                />
              ))}
            </div>
          );
        })}
      </div>
      {isGameOver !== -1 ? <button onClick={handleReset}>Reset</button> : <></>}
    </div>
  );
}
