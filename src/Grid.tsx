import * as React from 'react'
import { useState } from 'react'
import Box from './Box'

interface GridProps {
  grid: boolean[][]
  rows: number,
  cols: number,
  selectBox: (row: number, col: number) => void
}

const Grid: React.FC<GridProps> = ({grid, rows, cols, selectBox}) => {
  const [width, setWidth] = useState(cols * 16)
  const rowsArr = [];
  let boxClass = '';
  for (let i = 0 ; i < rows; i++){
    for (let j = 0 ; j < cols; j++){
      let boxId = i + "_" + j
      boxClass = grid[i][j] ? 'box on' : 'box off'
      rowsArr.push(<Box boxClass={boxClass} key={boxId} row={i} col={j} selectBox={selectBox}/>)
    }
    rowsArr.push(<div/>)
  }
    return (
        <div>
          {rowsArr}
        </div>
    )
}

export default Grid
