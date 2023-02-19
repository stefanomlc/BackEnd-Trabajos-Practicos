export default class productConstructor {
    constructor ({title, description, code, price, status, stock, category, thumbsnails}) { //falta corroborar que sean del tipo de cada uno

        this.id //falta buscar el ID
        if (!title) throw new Error("falta el titulo")
        this.title

        if (!description) throw new Error("falta la descripción")
        this.description

        if (!code) throw new Error("falta el codigo")
        this.code

        if (!price) throw new Error("falta el precio")
        this.price

        if (!status) throw new Error("falta el estado")
        this.status

        if (!stock) throw new Error("falta el stock")
        this.stock

        if (!category) throw new Error("falta el la categoria")
        this.category = true

        if (!thumbsnails) {this.thumbsnails = "#"}
        this.thumbsnails
    }
}