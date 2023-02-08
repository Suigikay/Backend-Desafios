class ProductManager{
    #accum = 0
    #products = []

 addProduct (title, description, price, thumbnail, code, stock){

    const productExists = this.#products.some(
        (p) => p.code === code
    );

    if (productExists) {
        throw new Error ("El producto ya existe")
    }


    if (!title || !description || !price || !thumbnail || !code || !stock){
        throw new Error ("Datos faltantes")
    }

    const newProduct={
        id: this.#accum,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }
    this.#products = [...this.#products, newProduct];
    this.#accum += 1;
 }
    getProducts (){
        return this.#products;
    }

    getProductsById(id){
        const productId = this.getProducts().find(p => p.id === id);
        return productId === undefined ? console.log("No encontrado") : console.log(productId);
    }

}


const manager = new ProductManager();


manager.addProduct("Croqueta", "Deliciosa croqueta", "$75", "croqueta.img", "1", "35")//Agrega producto
manager.addProduct("Papas", "Bellas papas", "$50", "papas.img", "2", "20") //Agrega nuevo producto
// manager.addProduct("Croqueta", "Deliciosa croqueta", "$75", "croqueta.img", "1", "35") //Error por agregar producto con el mismo código

console.log(manager.getProducts())
console.log(manager.getProductsById(0)) //Encuentra producto existente
// console.log(manager.getProductsById(3)) //Error por producto no existente




