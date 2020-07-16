
import Axios from 'axios'
import {BASE_URL, API_KEY} from '../src/keys'

export function searchTickers(searchString) {
    return new Promise((resolve,reject) => {
        Axios.get(`${BASE_URL}/v2/reference/tickers?search=${searchString}&apiKey=${API_KEY}`).then((res) => {
            resolve(res.data.tickers.map(({ ticker, name }) => ({ ticker, name })))
        }).catch((error) => {
            console.log(error.message || error)
            reject(error)
        })
    })
}

export function  getDetailes(symbol) {
    return new Promise((resolve, reject) => {
        if (symbol) {
                Axios.get(`${BASE_URL}/v1/meta/symbols/${symbol}/company?apiKey=${API_KEY}`).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                console.log(error.message || error)
                reject(error)
            })
        }
      })
}
 export function getNews(symbol) {

     return new Promise((resolve, reject) => {
         if (symbol) {
            Axios.get(`${BASE_URL}/v1/meta/symbols/${symbol}/news?apiKey=${API_KEY}`).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                console.log(error.message || error)
                reject(error)
            })
         }
     })
 }
 
