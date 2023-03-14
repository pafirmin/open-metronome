import React from "react"
import Ticker from "../../ticker"

const TickerContext = React.createContext<Ticker | null>(null)

export default TickerContext;
