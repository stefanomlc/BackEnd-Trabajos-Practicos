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

    async addProduct({title, description, price, thumbnail, code, stock }) {
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

    deleteProduct(id){
        setTimeout(() =>{
            let product = this.products.find(e => e.id === id);
            let indiceProduct = this.products.indexOf(product);
            
            //console.log("productos ahora: ", this.products)
            this.products.splice(1,1)
            //console.log("productos después del slice: ", this.products)

            //SI QUISIERA QUE LUEGO SE ELIMINE EL DATO DEL JSON SOLO HAY QUE EJECUTAR
            //this.saveProducts();
            
        }, 1000);


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


La clase debe contar con una variable this.path, el cual se inicializará desde el
constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.

------
Consigna
Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.
Aspectos a incluir

Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos. 
Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.

Aspectos a incluir
El servidor debe contar con los siguientes endpoints:
ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
Si no se recibe query de límite, se devolverán todos los productos
Si se recibe un límite, sólo devolver el número de productos solicitados


ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 
Sugerencias
Tu clase lee archivos con promesas. recuerda usar async/await en tus endpoints
Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets. 

Link al repositorio de Github con el proyecto completo, el cual debe incluir:
carpeta src con app.js dentro y tu ProductManager dentro.
package.json con la info del proyecto.
NO INCLUIR LOS node_modules generados.

https://docs.google.com/document/d/1ihCTk8qiizDgvAlRBsChdM5Xb8Moe_HLk-7ifM02fvw/edit
*/
