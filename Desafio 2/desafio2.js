//importamos fs
const fs = require("fs");

class ProductManager {
    products
    globalId

    constructor() {
        this.products = [];
        this.globalId = [];
        
        this.id = this.globalId[0];
    }

    addProduct({title, description, price, thumbnail, code, stock }) {
        setTimeout(() => {
            console.log("Cargando datos");
            ++this.id
            console.log(this.id)
            let id = this.id
            const product = new submitProduct({id, title, description, price, thumbnail, code, stock })
            this.products.push(product)
            console.log("El producto fue cargado")
            console.log(this.products)
            this.saveProducts();
          }, 1000);

    }

    updateProduct(id, precio){
        setTimeout(() =>{
            const DatosAnteriores = [];
            let product = this.products.find(e => e.id === id);
            let indiceProduct = this.products.indexOf(product);
            console.log("el indice es",indiceProduct);
            
            DatosAnteriores.push(this.products[indiceProduct]); 
            
            console.log("datos cargados", DatosAnteriores)
            DatosAnteriores[0].price = precio
            console.log("datos nuevos", DatosAnteriores)

            this.products[indiceProduct] = DatosAnteriores[0]
            console.log("datos nuevos del array: ", this.products)

            //SI QUISIERA QUE LUEGO SE MODIFIQUE EL DATO DEL JSON SOLO HAY QUE EJECUTAR
            //this.saveProducts();

        }, 1000);


    }


    getProducts() {
        console.log("los productos son:")
        console.log(this.products);
        return this.products;
    }

    getProductById(id) {

        let product = this.products.find(e => e.id === id);


        if (!product) {
            console.log("Product Not Found")
            return
        }

        console.log("el producto es:")
        return product
        
    }

     async deleteProduct(id){
        //setTimeout(() =>{
            let product = await this.products.find(e => e.id === id);
            let indiceProduct = this.products.indexOf(product);
            
            //console.log("productos ahora: ", this.products)
            this.products.splice(1,1)
            //console.log("productos después del slice: ", this.products)

            //SI QUISIERA QUE LUEGO SE ELIMINE EL DATO DEL JSON SOLO HAY QUE EJECUTAR
            //this.saveProducts();
            
        //}, 1000);


    }

    //guardamos los productos agregados a un JSON
    saveProducts() {

        const Datos = this.products;
        console.log(Datos)
        const DatosJson = JSON.stringify(Datos);
        console.log(DatosJson)
        fs.promises.writeFile("./datos.json", DatosJson)
        console.log("productos actualizados a la base JSON")

        const Id = this.id;
        const IdJson = JSON.stringify(Id);
        fs.promises.writeFile("./ultimaID.json", IdJson)
        console.log("ID guardada en JSON")

    }
    //cargamos los productos que están en el JSON
    async loadProducts() {

        console.log("cargamos")
        const loadProducts = await fs.promises.readFile("./datos.json", "utf-8");

        const products = JSON.parse(loadProducts)

        for (let key in products) {
            this.products.push(products[key]);
        }
        console.log(this.products)

        //productManager.loadId()

        //console.log(JSON.parse(loadProducts))

        //this.products.push(JSON.parse(loadProducts))
    }
    //leemos lo que haya en productos guardados del JSON


    async loadId() {
        const loadID = await fs.promises.readFile ("ultimaID.json", "utf-8");
        const ID = JSON.parse(loadID)
        this.id = loadID
        
        this.globalId.push(ID)
        console.log("la ID cargada es: ", this.id, "global ID:", this.globalId)
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

    constructor({id, title, description, price, thumbnail, code, stock }) {
        //reviso que no sea undefined
        if (title == undefined) {
            throw new Error("el titulo es obligatorio")
        }
        if (description == undefined) {
            throw new Error("la descripcion es obligatoria")
        }
        if (price == undefined) {
            throw new Error("el precio es obligatorio")
        }
        if (thumbnail == undefined) {
            throw new Error("el enlace es obligatorio")
        }
        if (code == undefined) {
            throw new Error("el codigo es obligatorio")
        }
        if (stock == undefined) {
            throw new Error("el stock es obligatorio")
        }

        //cargamos los datos
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock

    }
}

class FileManager {
    constructor(ruta) {
        this.ruta = ruta
    }

    async mostrarDatos() {

    }

    async grabarDatos(products) {
        /*         const Datos = products;
                const DatosJson = JSON.stringify(Datos);
                fs.promises.writeFile(this.ruta, DatosJson)
                //const grabarDatos = JSON.parse(await fs.promises.writeFile(this.ruta,"utf-8")) */

    }

    async leerDatos() {

    }

}

const productManager = new ProductManager();
//const rutaDatos = new FileManager ("./datos.json");

//productManager.addProduct({title: "tomate", description: "tomate x kilo", price: "100", thumbnail: "https://", code: "001", stock: "10" })


//CARGA INICIAL
/* productManager.addProduct({title: "tomate", description: "tomate x kilo", price: "100", thumbnail: "https://", code: "1", stock: "10" })
productManager.addProduct({title: "papa", description: "papa x kilo", price: "200", thumbnail: "https://", code: "2", stock: "20" })

productManager.saveProducts(); */


productManager.loadProducts();
productManager.loadId();

//productManager.addProduct({title: "cebolla", description: "cebolla x kilo", price: "500", thumbnail: "https://", code: "3", stock: "40" })

productManager.getProducts();

productManager.updateProduct(3, 350)
productManager.deleteProduct(3);


/* Consigna

Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos.
Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos
(basado en entregable 1).

Aspectos a incluir

La clase debe contar con una variable this.path, el cual se inicializará desde el
constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.


Debe guardar objetos con el siguiente formato:
id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)

Aspectos a incluir

Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado,
asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).

Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver
todos los productos en formato de arreglo.

Debe tener un método getProductById, el cual debe recibir un 
id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto

Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar,
así también como el campo a actualizar (puede ser el objeto completo, como en una DB),
y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 

Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el
producto que tenga ese id en el archivo.
Formato del entregable

Archivo de javascript con el nombre ProductManager.js */
