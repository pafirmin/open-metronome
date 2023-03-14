import { useState } from 'react'
import './App.css'
import Ticker from './ticker/ticker'

function App() {
  const ctx = new AudioContext()
  const ticker = new Ticker(ctx)

  return (
  )
}

export default App
