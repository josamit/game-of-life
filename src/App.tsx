import React, { useEffect, useState } from 'react'
import './App.css'
import Grid from './Grid'
import { Nav, Navbar } from 'react-bootstrap'

const App: React.FC = () => {
  const [generation, setGenerations] = useState(1)
  const [rows, setRows] = useState(20)
  const [cols, setCols] = useState(20)
  const [grid, setGrid] = useState(Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => false)
  ))

  const seed = () => {
    const mutableGrid = [...grid]
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.floor(Math.random() * 9) === 1) {
          mutableGrid[i][j] = true
        }
      }
    }
    setGrid(mutableGrid)
  }

  const play = () => {
    const oldGen = [...grid]
    const newGen = [...grid]
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let neighbors = 0
        if (i > 0) if (oldGen[i - 1][j]) neighbors++;
        if (i > 0 && j > 0) if (oldGen[i - 1][j - 1]) neighbors++;
        if (i > 0 && j < cols - 1) if (oldGen[i - 1][j + 1]) neighbors++;
        if (j < cols - 1) if (oldGen[i][j + 1]) neighbors++;
        if (j > 0) if (oldGen[i][j - 1]) neighbors++;
        if (i < rows - 1) if (oldGen[i + 1][j]) neighbors++;
        if (i < rows - 1 && j > 0) if (oldGen[i + 1][j - 1]) neighbors++;
        if (i < rows - 1 && j < cols - 1) if (oldGen[i + 1][j + 1]) neighbors++;
        if (oldGen[i][j] && (neighbors < 2 || neighbors > 3)) newGen[i][j] = false;
        if (!oldGen[i][j] && neighbors === 3) newGen[i][j] = true;
      }
    }
    setGrid(newGen)
    setGenerations(generation + 1)
  }

  useEffect(() => {
    seed()
    play()
  }, [])

  useEffect(() => {
    play()
  }, [generation])

  return (
    <div className="App">
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#home">React game of life</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Grid grid={grid} rows={rows} cols={cols} selectBox={(row: number, col: number) => {
        const mutableGrid = [...grid]
        mutableGrid[row][col] = true
        setGrid(mutableGrid)
      }}/>
      <h2>Generations: {generation}</h2>
    </div>
  )
}

export default App
