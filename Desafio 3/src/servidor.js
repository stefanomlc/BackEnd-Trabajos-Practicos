import express from 'express'
import { Manager } from './managers/Manager.js'

const app = express()

const manager = new Manager()

app.get('/product', (req, res) => {
    const id = req.query.id
    
    let products = manager.getProductByLimit('id', parseInt(id))
  
    const cantidad = parseInt(req.query.limit)
    if (cantidad) {
        products = products.slice(0, cantidad)
    }
    res.json(products)
})

app.get('/product/:id', (req, res) => {
    const id = req.params.id
    const product = manager.getProductByLimit('id', parseInt(id))
    res.json(product)
})

app.listen(8080, () => {
    console.log('Acceso  al servidor listo!')
})