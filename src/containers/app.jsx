import React, { Component } from 'react'
import Products from './products'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'Guille'
        }
    }

    render() {
        return (
            <div>
                <Products />
            </div>)
    }
}

export default App