import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'
import {searchTickers} from '../api'

export default class SearchBox extends Component {
  state = {
    searchString: '',

      data: [
        // {
        //   key: 'john',
        //   value: 'John Doe',
        // },
        // {
        //   key: 'jane',
        //   value: 'Jane Doe',
        // },
        // {
        //   key: 'mary',
        //   value: 'Mary Phillips',
        // },
        // {
        //   key: 'robert',
        //   value: 'Robert',
        // },
        // {
        //   key: 'karius',
        //   value: 'Karius',
        // },
      ]    
  }

   handleNewCHange =(ticker) => {
     const searchString = ticker

      this.setState({ searchString })
      // console.log(this.state.searchString)

      // const searchString = this.state.searchString

      searchTickers(searchString).then((data) => {
        this.setState({ data })
      })  
  }

   handleSubmit = (e) => {
    e.preventDefault()
    const { addTicker } = this.props
    addTicker(this.state.searchString)
    console.log(this.state.searchString)
       
    
    // searchTickers(this.state.newTicker)
    // let newData = searchTickers(this.state.newTicker)
    // console.log(newData)
}

  render() {
    const { data } = this.state

    console.log(data)

    return (
        <section className="section">
        <div className="container">
        <form onSubmit={this.handleSubmit}>
          <ReactSearchBox
            placeholder="Placeholder"
            // value="Doe"
            data={data}
            callback={record => console.log(record )}
            value={this.state.searchString} 
            onChange={this.handleNewCHange}
          />
        </form>
        </div>
      </section>
     
    )
  }
}