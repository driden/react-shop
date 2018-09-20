import React, { Component } from 'react'
import Product from '../components/product'

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        fetch('http://develop.plataforma5.la:3000/api/products')
            .then(response => response.json())
            .then(data => {
                this.setState({ data })
            })
            .catch(() => console.error('No se trajo la data'));
    }
    render() {
        return (
            <div className="grid-container">{this.state.data.map(p => <Product product={p}/>)}
            </div>)
    }
}

export default Products