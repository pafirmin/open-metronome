import {useEffect, useRef, useState} from "react"
import Ticker from "../../ticker"

interface Props {
  ticker: Ticker
}

const TickerProvider = ({ ticker }: Props) => {
 const tickerRef = useRef(ticker)
 const [tempo, setTempo] = useState(ticker.tempo)
 const [beatCount, setBeatCount] = useState(ticker.currBeat)

 const startTicker = () => {
    tickerRef.current.init()
 }

 useEffect(() => {
  tickerRef.current.onTick(() => setBeatCount((prev) => prev + 1))
 }, [tickerRef.current])
  
}
