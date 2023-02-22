import ProductManager from "./ProductManager.js";
import express from "express"

const item = new ProductManager();
const app = express();



app.get("/products", async (req,res) => {
    const {limit} = req.query;
    const prods = await item.getProducts(); 
    if(!limit){
       res.send(prods);
    }
    const filtered = prods.splice(0,limit);
     res.send(filtered);
});

app.get("/products/:id", async (req,res) => {
    const  prodId =  Number(req.params.id);
    const result = await item.getProductById(prodId);
     res.send(result);
})

app.listen(8080, () => {
console.log("listening 8080");
})
