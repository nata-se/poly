import React, { useState, useEffect} from 'react'
import { getNews } from '../api'
import moment    from 'moment'
import './styles/ticker-overview.scss'


export const TickerNewsBlock = (article) => {
    console.log(article.props.title)
    function newsTimeFormat(time) {
        const date = moment(time).format('dddd MMM DD, YYYY')
        return date
    }
    const { title, symbols, summary,image, keywords, source, timestamp, url } = article.props
 
    return ( 
        <div className="columns">
            <div className="column">
            <div className="daily-news-date">{newsTimeFormat(timestamp)}</div>
                <figure className="media-left">
                <p className="image is-256x256">
                    { image && <img src={image} alt={keywords}/>}
                </p>
                </figure>
            </div>
            <div className="column">
                <p className="value">
                    <strong>{title}</strong><br/>
                    <small><a href={url} target="_blank"><i>{source}</i></a></small> 
                </p>
            </div>
            <div className="column is-half">
            <p className="value">
                    {summary}
                </p>
            </div>
        </div>

            )
        }

export const TickerNews = (props, dataLoader) => {
    const [tickerNews, changeNews] = useState('')

     useEffect(() => {
        const newTNews = getNews(props.ticker.ticker)
        newTNews.then((tickerN) => {
            tickerN = tickerN.slice(0, 9)
            changeNews(tickerN)

        })
        
    },[props])

 

    if (!tickerNews) return null

    return ( 
        <div className="box">
            <div>News</div>
            {
                tickerNews.map((article) => {
                    return (
                        <div key={article.title}>
                             <TickerNewsBlock props={article}/>
                      </div>
                    )
                })
            }
        </div>
     )
}
 
