import React, {useState} from 'react';
import {searchTickers} from '../api'



const Searchbar = ({addTicker}) => {
    const [newTicker, changeNewTicker] = useState('')

    const handleNewCHange =(e) => {
        changeNewTicker(
            e.target.value
        )
        console.log('new' + ' ' + newTicker)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        addTicker(newTicker)
        
        console.log(newTicker)
        searchTickers(newTicker)
    }

    return (  
        <section className="section">
        <div className="container">
        <div className="field">
            <form onSubmit={handleSubmit}>
            <p className="control has-icons-left has-icons-right">
                <input 
                    className="input" 
                    value={newTicker} 
                    onChange={handleNewCHange} 
                    placeholder="find stock of"
                />
                <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
                </span>
                
            </p>
            </form>
        </div>
        </div>
      </section>
        

    );
}
 
export default Searchbar;