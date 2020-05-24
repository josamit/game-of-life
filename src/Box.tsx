import * as React from 'react'

interface BoxProps {
  boxClass: string,
  key: string,
  row: number,
  col: number,
  selectBox: (row: number, col: number) => void
}

const Box: React.FC<BoxProps> = ({
  boxClass,
  key,
  row,
  col,
  selectBox
}) => {
  return (
    <div className={boxClass} key={key} id={key} onClick={() => {
      selectBox(row, col)
    }}></div>
  )
}

export default Box
