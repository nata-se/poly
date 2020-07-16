import React, { useEffect } from 'react'
import './styles/ticker-owerview.scss'


import { getDetailes } from '../api'
import { useState } from 'react'

const TickerOwerviewBlock = (props) => {
    const { title, value, url, children } = props
    if (!value) return null

    return (
   
       <div className="overview-block">
           <div className="header">{title}</div>
            { value && !url && <div className="value">{value}</div> }
            { value && url && <div className="value"><a href={url}>{url}</a></div> }
            { value && children && <div className="value">{children}</div> }
       </div>
    )
}
 

export const  TickerOverview = (props, dataLoader) => {
    const [tickerInfo, changeInfo] = useState('')

    
    useEffect(() =>  {
        const overwiewDetailes = getDetailes(props.ticker.ticker)
        overwiewDetailes.then((tickerInfos) => {
        changeInfo(tickerInfos)
        
        })
    }, [props])
    
     const { name, logo, url, ticker, industry, date, sector, description, exchange, hq_address } = tickerInfo
     if (!tickerInfo) return null
   
    return (  
        <div>
            <div className="card">
                <div className="card-content">
                    <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                        <img src={logo} alt="Placeholder image"/>
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{name}</p>
                        <p className="subtitle is-6">{ticker}</p>
                    </div>
                    </div>
                    <TickerOwerviewBlock title="Exchange"      value={exchange}/>
                    <TickerOwerviewBlock title="Industry"      value={industry}/>
                    <TickerOwerviewBlock title="Sector"        value={sector}/>
                    <TickerOwerviewBlock title="Website"       value={url}/>
                    <TickerOwerviewBlock title="Description"   value={description}/>
                    <TickerOwerviewBlock title="Address"       value={hq_address}/>
                    <TickerOwerviewBlock title="List Day"      value={date}/>
                    
                </div>
            </div>

        </div>
    )
}
 
