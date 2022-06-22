import React from "react";
import './Board.css'
import Cell from "./Cell";

export interface IBoardProps {
  rows: number
  cols: number
  chanceLightStartsOn: number
}

export interface IBoardStates {
  hasWon: boolean,
  board: boolean[][]
}

class Board extends React.Component<IBoardProps, IBoardStates> {
  static defaultProps = {
    rows: 5,
    cols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props: IBoardProps) {
    super(props)
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }

    this.restartGame = this.restartGame.bind(this)
  }

  createBoard() {
    let board = []
    const { rows, cols, chanceLightStartsOn } = this.props

    for (let i = 0; i < rows; i++) {
      let row = []

      for (let j = 0; j < cols; j++) {
        // each cells randomly lit or unlit at beginning of the game
        const num = Math.random() < chanceLightStartsOn

        row.push(num)
      }

      board.push(row)
    }

    return board
  }

  restartGame() {
    this.setState({
      hasWon: false,
      board: this.createBoard()
    })
  }

  // this is a call back function,update board and determine if win when cell is on click
  flipAround(coordinate: any) {
    const { rows, cols } = this.props
    let { board } = this.state
    let [i, j] = coordinate.split(".").map(Number)

    function flipCell(i: number, j: number) {

      if (i >= 0 && i < rows && j >= 0 && j < cols) {
        board[i][j] = !board[i][j]
      }
    }

    flipCell(i, j)
    flipCell(i - 1, j)
    flipCell(i + 1, j)
    flipCell(i, j - 1)
    flipCell(i, j + 1)

    // determines is the game has been won
    let hasWon = board.every(row =>
      row.every(cell => {
        return cell === false
      }))

    this.setState({ board: board, hasWon: hasWon })
  }

  render(): React.ReactNode {
    const { hasWon, board } = this.state
    const { rows, cols } = this.props

    // if the game is won, show a winning message and render nothing else
    if (hasWon) {
      return (
        <div>
          <div className="board-title">
            <div className="winner">
              <span className="win-blue">YOU </span>
              <span className="win-red">WON</span>
            </div>

          </div>
          <button onClick={this.restartGame} className="new-button">New Game</button>
        </div>
      )
    }

    // make table board.
    let table_board: any[] = []

    for (let i = 0; i < rows; i++) {
      let row: any[] = []

      for (let j = 0; j < cols; j++) {
        const coordinate = `${i}.${j}`

        row.push(
          <Cell key={coordinate} isLit={board[i][j]} flipAround={() => this.flipAround(coordinate)} />
        )
      }

      table_board.push(<tr key={i}>{row}</tr>)
    }

    return (
      <div>
        {/* title */}
        <div className="board-title">
          <h1>Lights Out Game</h1>
        </div>

        {/* description */}
        <div className="description">
          {/* <span>description</span> */}
          <p>遊戲方法：</p>
          <p>點擊任一盞燈（無論此燈是亮或暗都可以點），該燈以及相鄰的上下左右的燈，會同時變成與自身相反的狀態。</p>
          <p>黃色:On 灰色:Off</p>
          <br />
          <p>遊戲目標：將全部的燈關掉</p>
        </div>

        {/* board */}
        <table className="board">
          <tbody>
            {table_board}
          </tbody>
        </table>

        <button onClick={this.restartGame} className="new-button">New Game</button>
      </div>
    )
  }
}

export default Board