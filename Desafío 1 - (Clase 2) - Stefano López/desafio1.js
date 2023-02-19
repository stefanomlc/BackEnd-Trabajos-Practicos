class ProductManager {
    products

    constructor() {
        this.products = [];
        this.id = 0;
    }

    addProduct({title, description, price, thumbnail, code, stock}){
        const product = new submitProduct({title, description, price, thumbnail, code, stock })
        this.products.push (product)
        console.log("El producto fue cargado")
    }

    
    getProducts() {
        return this.products;
    }

    getProductById(id) {
        
        let product = this.products.find (e => e.code === id);
        

    if (!product){
        console.log ("Product Not Found")
        return
        }
    
    console.log("el producto es:")
    return product
    }
}

class submitProduct {
    //atributos
    title
    description
    price
    thumbnail
    code
    stock

    constructor ({title, description, price, thumbnail, code, stock})  {
        //reviso que no sea undefined
        if (title == undefined) {
            throw new Error ("el titulo es obligatorio")
        }
        if (description == undefined) {
            throw new Error ("la descripcion es obligatoria")
        }
        if (price == undefined) {
            throw new Error ("el precio es obligatorio")
        }
        if (thumbnail == undefined) {
            throw new Error ("el enlace es obligatorio")
        }
        if (code == undefined) {
            throw new Error ("el codigo es obligatorio")
        }
        if (stock == undefined) {
            throw new Error ("el stock es obligatorio")
        }

        //cargamos los datos
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock

    }
}

const productManager = new ProductManager()

//productManager.addProduct({title: "tomate", description: "tomate x kilo", price: "100", thumbnail: "https://", code: "001", stock: "10" })
productManager.addProduct({title: "tomate", description: "tomate x kilo", price: "100", thumbnail: "https://", code: "1", stock: "10" })
productManager.addProduct({title: "papa", description: "papa x kilo", price: "200", thumbnail: "https://", code: "2", stock: "20" })

//console.log(productManager.getProducts())

console.log("vamos a buscar un producto pod código")
//productManager.getProductById("tomate")
console.log(productManager.getProductById("1"))

console.log("vamos a buscar un producto que no existe")
console.log(productManager.getProductById("3"))


/* Realizar una clase “ProductManager” que gestione un conjunto de productos.

Aspectos a incluir
Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

Cada producto que gestione debe contar con las propiedades:
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)

Aspectos a incluir

Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
Validar que no se repita el campo “code” y que todos los campos sean obligatorios
Al agregarlo, debe crearse con un id autoincrementable
Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento

Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
En caso de no coincidir ningún id, mostrar en consola un error “Not found”
 */


    /*         if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log("Todos los campos son obligatorios.");
                return;
            } */
    
/*             let duplicate = this.products.find (product => product.code === code );
    
            if (duplicate) {
                console.log("el producto ya existe");
                return;
            }
    
            let product = {
                id: ++this.id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            }
            
            this.products.push(product);
            console.log("El producto fue cargado") */