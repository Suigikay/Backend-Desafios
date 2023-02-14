const fs= require('fs')


class ProductManager{
    #accum = 0
    #path = "./products.json";

      async getProducts() {  
    try {
      const product = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(product);
    } catch (err) {
      return [];
    }
  }

 async addProduct (title, description, price, thumbnail, code, stock){

     const newProduct = {
      id: this.#accum,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    const product = await this.getProducts();
    let cd = product.find((p) => p.code === code);
    if (!cd) {
      fs.promises.writeFile(this.#path, JSON.stringify([...product, newProduct]));
      this.#accum += 1;
    } else {
      throw new Error("El producto ya existe");
    }
  }


    async getProductById(id) {       
    const productId = await this.getProducts();
    let el = productId.find((p) => p.id === id);
    if (el) {
        fs.promises.appendFile(`La ID del producto es: ${id} ${JSON.stringify(el)}`)
        return console.log(el);
    } else {
        throw new Error(`El producto con la id ${id} no fue encontrado`);
    }
}

 async updateProduct(id, modificarItem){
        let products = await this.getProducts()
        let modificarProducto = products.find(i => i.id === id)

        if (!modificarProducto){
            throw new Error('Producto no encontrado.')
        }

        if (Object.keys(modificarItem).includes('id')){
            throw new Error('No es válido modificar la id de un producto.')
        }

        if (Object.keys(modificarItem).includes('code')){
            let mismoCode = products.some(p => p.code === modificarItem.code)
            if (mismoCode){
                throw new Error('No es válido modificar el código de referencia de un producto.')
            }
        }
        
        modificarProducto = {...modificarProducto, ...modificarItem}
        let newArray = products.filter( p => p.id !== id)
        newArray = [...newArray, modificarProducto]
        await fs.promises.writeFile(this.#path, JSON.stringify(newArray))
        console.log('Se realizó la modificación deseada.')
    }


   async  getProductsById(id){
        const productId = await this.getProducts().find(p => p.id === id);
        return productId === undefined ? "No encontrado" : console.log(productId);
    }

      async deleteProduct(id){
        let products = await this.getProducts()
        let newArray = products.filter(p => p.id !== id)
        await fs.promises.writeFile(this.#path, JSON.stringify(newArray))
        console.log('El Producto fue eliminado')
    }
    
}

async function main(){
const manager = new ProductManager('./products.json');

await manager.addProduct("Croqueta", "Deliciosa croqueta", "$75", "croqueta.img", "1", "35")
await manager.addProduct("Papas", "Bellas papas", "$50", "papas.img", "2", "20") 

}

main()

