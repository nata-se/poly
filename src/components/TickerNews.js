import React, { useState, useEffect} from 'react'
import { getNews } from '../api'
import moment    from 'moment'


// export const TickerNewsBlock = (props) => {
//     function newsTimeFormat(time) {
//         const date = moment(time).format('dddd MMM DD, YYYY')
//         return date
//     }
 
//     return ( 
//         props.tickerNews.map(({ title, symbols, summary, image,keywords, source,timestamp, url }) => {
//             return (
//                 <div key={title}>
//                 <div className="daily-news-date">{newsTimeFormat(timestamp)}</div>

//                 <article className="media">
//                 <figure className="media-left">
//                   <p className="image is-96x96">
//                     { image && <img src={image} alt={keywords}/>}
//                   </p>
//                 </figure>
//                 <div className="media-content">
//                   <div className="content">
//                     <p>
//                       <strong>{title}</strong> <small>{symbols}</small> 
//                     </p>
//                   </div>
//                   <nav className="level is-mobile">
//                     <div className="level-left">
//                      <hr/>
//                     </div>
//                   </nav>
//                 </div>
//                 <div className="media-right">
//                     <p>
//                     {summary}
//                     </p>
//                 </div>
//               </article>
//               </div>
//             )
//         })
//      );
// }




export const TickerNews = (props, dataLoader) => {
    const [tickerNews, changeNews] = useState('')

     useEffect(() => {
        const newTNews = getNews(props.ticker.ticker)
        newTNews.then((tickerN) => {
            tickerN = tickerN.slice(0, 9)
            changeNews(tickerN)

        })
        
    },[props])

    function newsTimeFormat(time) {
        const date = moment(time).format('dddd MMM DD, YYYY')
        return date
    }
 

    if (!tickerNews) return null

    return ( 
        <div className="box">
            {/* <TickerNewsBlock props={tickerNews}/> */}
            <div>News</div>
            {
                tickerNews.map((news) => {
                    return (
                        <div key={news.timestamp}>
                            
                    <div className="daily-news-date">{newsTimeFormat(news.timestamp)}</div>
                       

                        <article className="media">
                        <figure className="media-left">
                          <p className="image is-64x64">
                            <img src={news.image}/>
                          </p>
                        </figure>
                        <div className="media-content">
                          <div className="content">
                            <p>
                              <strong>{news.title}</strong> <small>{news.symbols}</small> 
                              <br/>
                                {news.summary}
                            </p>
                          </div>
                          <nav className="level is-mobile">
                            <div className="level-left">
                              <a className="level-item">
                                <span className="icon is-small"><i className="fas fa-reply"></i></span>
                              </a>
                              <a className="level-item">
                                <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                              </a>
                              <a className="level-item">
                                <span className="icon is-small"><i className="fas fa-heart"></i></span>
                              </a>
                            </div>
                          </nav>
                        </div>
                        <div className="media-right">
                          
                        </div>
                      </article>
                      </div>
                    )
                })
            }
        </div>
     )
}
 
