import React, { useState } from "react"

const gridShape = Array.from({ length: 6 }, () =>
  Array.from({ length: 7 }, () => 0)
) // creates a 7 column by 6 row grid filled with 0s

const style = {
  grid: {
    backgroundColor: "blue",
    borderRadius: "10px",
    boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.5), 20px -10px 0 blue",
    display: "grid",
    gridTemplateColumns: "repeat(7, 30px)",
    justifyContent: "space-evenly",
    gap: "2vw",
    padding: "2vw"
  },
  circle: {
    cursor: "pointer",
    display: "flex",
    borderRadius: "100%",
    boxShadow: "-4px -2px 5px black",
    width: "30px",
    height: "30px",
    justifyContent: "center",
    alignItems: "center"
  }
} as any

const App: React.FC = () => {
  const [player, setPlayer] = useState(1)
  const [grid] = useState(gridShape)

  const isColumnFull = (y: number) => {
    let count = 0
    grid.forEach((_, index) => {
      const player = grid[index][y]
      if (player === 1 || player === 2) {
        count++
      }
    })
    return count === 6 // 6 is max height of column
  }

  const findTop = (y: number) => {
    let topOfStack = 0
    grid.forEach((_, index) => {
      if (grid[index][y] === 0) {
        topOfStack = index
        return
      }
    })
    return topOfStack
  }

  const checkForWinner = (lastPiecePlayed: Array<number>) => {
    console.log(lastPiecePlayed)
    console.log("Checking for winner...")
    const [x, y] = lastPiecePlayed
    let count = 0
    /* I'm thinking, check the top of the stack where the last piece was placed and determine if there is 4 in a row extending from it
    { 
      grid.forEach((row, x) => {
        row.forEach((_, y) => {
          for (let i = 1; i < 5; i++) {
            if (grid[x + i][y] === player) {
              if (++count >= 3) {
                gameWonBy(player)
              }
            }
          }
        })
      })
    } */
  }
  const gameWonBy = (winningPlayer: number) => {
    alert(
      `Congratulations Player ${winningPlayer}: YOU WIN!!! OMG SO EXCITING!!`
    )
  }

  return (
    <div
      style={{
        marginTop: "10vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{ ...style.grid }} id="GAME_BOARD">
        {grid.map((row: Array<number>, x: number) => {
          return row.map((col: number, y: number) => {
            return (
              <div
                className="GAME_PIECE"
                key={`${x}-${y}`}
                style={{
                  ...style.circle,
                  backgroundColor:
                    grid[x][y] === 0
                      ? "white"
                      : grid[x][y] === 1
                      ? "yellow"
                      : "red"
                }}
                onClick={() => {
                  if (!isColumnFull(y)) {
                    // findTop returns the x value for the top available game space
                    const top = findTop(y)
                    if (player === 1) {
                      grid[top][y] = 1
                      setPlayer(2)
                    } else {
                      grid[top][y] = 2
                      setPlayer(1)
                    }
                    checkForWinner([top, y])
                  }
                }}
              >
                {
                  <span
                    id="GRID_INDEXES_DEBUGGER"
                    style={{
                      opacity:
                        "0" /* set this to 1 to see the x/y index for each game piece*/
                    }}
                  >
                    {x}, {y}
                  </span>
                }
              </div>
            )
          })
        })}
      </div>
    </div>
  )
}

export default App
