import './styles/app.scss'
import { getDetailes, getNews } from './api'



import React, {useState} from 'react'
import Searchbar from './components/Searchbar-old'
import SearchBox from './components/SearchBox-old'
import TickerSearch from './components/TickerSearch'
import { TickerOverview } from './components/TickerOverview'
import { TickerNews } from './components/TickerNews'
import TickerChart from './components/TickerChart'


function App() {
  const [ticker,changeTicker] = useState(' ')
  

  const handleTickerChanged = (ticker) => {
    const tickerSymbol = ticker.ticker
    changeTicker({ticker:tickerSymbol})    
  }

  return (
    <div className="App">
      <TickerSearch onValueChange={handleTickerChanged} />
      <div className="columns">
        <div className="column is-two-thirds">
            <TickerChart />
            <TickerNews ticker={ticker} dataLoader={getNews}/> 
        </div>
        <div className="column is-one-third">
          
            <TickerOverview ticker={ticker} dataLoader={getDetailes}/>
          
        </div>
      </div>
    </div>
  );
}

export default App;
