import {express, Router} from 'express'
import { Manager } from './managers/Manager.js'
import productConstructor from './productConstructor.js';

const app = express();
const routerProduct = Router();

const manager = new Manager()

app.get('/api/products', (req, res) => {
    const id = req.query.id
    
    let products = manager.getProductByLimit('id', parseInt(id))
  
    const cantidad = parseInt(req.query.limit)
    if (cantidad) {
        products = products.slice(0, cantidad)
    }
    res.json(products)
})

app.get('/api/:pid', (req, res) => {
    const id = req.params.id
    const product = manager.getProductByLimit('pid', parseInt(id))
    res.json(product)
})

app.post("/" , (req, res) => {
    try {
        const productData = req.body
        const product = new productConstructor (productData)
        const productSave = manager.saveProduct(product)
        res.status(201).json(productSave)
    } catch{
        res.status(400).json({ msg: error.message})
    }
})

app.listen(8080, () => {
    console.log('Acceso  al servidor listo!')
})