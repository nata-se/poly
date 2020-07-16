import './styles/ticker-search.scss'


import React      from 'react'
import ReactDOM   from 'react-dom'
import PropTypes  from 'prop-types'
import classnames from 'classnames'

// import { Input, Control } from 'react-bulma-components/lib/components/form'
import { Form } from 'react-bulma-components';

// DO NOT REMOVE
// eslint-disable-next-line
// import Icon from 'react-bulma-components/lib/components/icon'

import { debounce }      from '../utils'
import { searchTickers, getDetailes } from '../api'

class TickerPopupItem extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      ticker: PropTypes.string,
      name:   PropTypes.string,
    }).isRequired,
    selected: PropTypes.bool.isRequired,
  }

  render() {
    const className = classnames('ticker-popup-item', { selected: this.props.selected })

    // // if this.props.selected === false
    // const className = "ticker-popup-item"

    // // if this.props.selected === true
    // const className = "ticker-popup-item selected"

    return (
      <div className={className}>
        <div className="ticker-popup-item-content">
          <span className="icon">
            <i className="fas fa-search"></i>
          </span>

          <div className="ticker">
            { this.props.item.ticker }
          </div>

          <div className="ticker-name">
            { this.props.item.name }
          </div>
        </div>
      </div>
    )
  }
}

class TickerPopup extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    tickers: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  state = {
    selectedIndex: -1,
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (!props.visible || props.tickers !== this.props.tickers) {
      this.setState({ selectedIndex: -1 })
    }
    if (props.tickers !== this.props.tickers) {
      this.tickerRefs = props.tickers.map((ticker, index) => {
        return React.createRef()
      })
    }
  }

  getSelectedTicker = () => {
    return this.state.selectedIndex >= 0 && this.props.tickers[this.state.selectedIndex]
  }

  handleClick = (ticker) => {
    const selectedIndex = this.props.tickers.indexOf(ticker)

    this.setState({ selectedIndex }, () => {
      this.props.onClick(ticker)
    })
  }

  scrollToIndex = ({ index }) => {
    const ref = this.tickerRefs[index]

    if (ref && ref.current) {
      const node = ReactDOM.findDOMNode(ref.current)

      node.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }    
  }

  handleKeyDown = () => {
    const selectedIndex = this.state.selectedIndex === -1 || this.state.selectedIndex === this.props.tickers.length - 1
      ? 0
      : this.state.selectedIndex + 1
    this.setState({ selectedIndex }, () => {
      this.scrollToIndex({ index: selectedIndex, up: false })
    })
  }

  handleKeyUp = () => {
    const selectedIndex = this.state.selectedIndex <= 0 
      ? this.props.tickers.length - 1
      : this.state.selectedIndex - 1
    this.setState({ selectedIndex }, () => {
      this.scrollToIndex({ index: selectedIndex, up: true })
    })
  }

  render() {
    const popupClass = classnames('ticker-popup', { visible: this.props.tickers.length > 0 })

    return (
      <div className={popupClass}>
        {
          this.props.tickers.map((ticker, index) => {
            const handleClick = () => this.handleClick(ticker)

            const selected = this.state.selectedIndex === index
            const ref      = this.tickerRefs[index]

            return (
              <div key={ticker.ticker} onClick={handleClick}>
                <TickerPopupItem ref={ref} item={ticker} selected={selected} />
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default class TickerSearch extends React.Component {
  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    // tickers: PropTypes.arrayOf(PropTypes.shape({
    //   ticker: PropTypes.string,
    //   name:   PropTypes.string,
    // }))
    // loadData: PropTypes.func.isRequired,
  }
  
  state = {
    value: '',
    tickers: [],
    loading: false,    
  }

  constructor(props) {
    super(props)
    this.fetchTickersDebounce = debounce(this.fetchTickers, 250, false)
  }

  fetchTickers = () => {
    if (this.state.value) {
      this.setState({ loading: true }, () => {
        searchTickers(this.state.value).then((tickers) => {
          this.setState({ tickers })
        }).catch((error) => {
          console.log('TODO', error)
        }).finally(() => {
          this.setState({ loading: false })
        })
      })
    }
  }

  handleChange = (event) => {    
    const value = event.target.value

    this.setState({ value }, () => {
      if (value) {
        this.fetchTickersDebounce()
      } else {
        this.setState({ tickers: [] })
      }
    })
  }

  handleBlur = () => {
    // setTimeout(() => {
    //   this.setState({ tickers: [] })
    // }, 200)
  }

  handleKeyUp = (event) => {
    if (event.keyCode === 27) { // Cancel key
      this.setState({ tickers: [] })
    }
  }

  handleKeyDown = (event) => {
    if (this.state.tickers.length === 0) {
      return
    }

    if (event.keyCode === 13) {
      const selectedTicker = this.refs.tickerPopup.getSelectedTicker()
      const value = selectedTicker ? selectedTicker.ticker : ''

      this.setState({ value, tickers: [] }, () => {
        this.props.onValueChange(selectedTicker)
      })
    } else if (event.keyCode === 40) {
      event.preventDefault()
      this.refs.tickerPopup.handleKeyDown()
    } else if (event.keyCode === 38) {
      event.preventDefault()
      this.refs.tickerPopup.handleKeyUp()
    }
  }

  handleTickerSelected = (ticker) => {
    this.setState({ tickers: [], value: ticker.ticker }, () => {
      this.props.onValueChange(ticker)
      
     
    })
  }

  render() {
    const { value, tickers, loading } = this.state

    const spinnerClass = classnames('fas fa-spinner fa-spin', { visible: loading })

    // const tickerClass = classnames('ticker-search', { foo: someCondition, bar: otherCondition, baz: anotherCondition })

    return (
      <section className="section">
        <div className="container">
        <div className="field">
            <div className="ticker-search">
              <div className="ticker-input">
                
                <Form.Control iconLeft iconRight>
                  <span className="icon">
                    <i className="fas fa-search"></i>
                  </span>
                  <Form.Input
                    placeholder="Search Symbols or Companies"
                    value={value}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    onKeyUp={this.handleKeyUp}
                    onBlur={this.handleBlur}
                  />
                </Form.Control>
                <div className="spin">
                  <i className={spinnerClass}></i>
                </div>
              </div>
              
              <TickerPopup
                ref="tickerPopup"
                visible={!!value}
                tickers={tickers}
                onClick={this.handleTickerSelected}
              />
            </div>
        </div>
      </div>
      </section>

    )
  }
}