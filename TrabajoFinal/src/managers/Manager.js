export class Manager {
    constructor() {
        this.elements = [ ]
    }

    getProductByLimit(identifcator, value) {
        if (identifcator && value) {
            return this.elements.filter(e => {
                return e[identifcator] === value
            })
        } else {
            return this.elements
        }
    }

    saveProduct(product) {
        //falta el async y await para cargar el json, cargar y guardar
        this.Product.push(product)
        return product

    }
}