import { Router } from "express";   
import ProductManager from "../clases/ProductManager.js";  

const routerProducts = Router();
const productManager = new ProductManager("./src/db/productos.json");


routerProducts.get('/', async (req,res) => {
    try {
        let limit = req.query.limit 
    let productos = await productManager.getProducts();
    
    if(!limit) return res.send({productos});

    return res.send(productos.slice(0, limit));

    } catch (error) {
        
    }
} );

routerProducts.get('/:pid', async (req,res) => {
try {
    let id = req.params.pid
    return res.send(await productManager.getProductById(id))
} catch (error) {
    
}

} );

routerProducts.post('/', async (req , res)=>{
    try {
        let {title , description, code, price  , stock , thumbnail} = req.body;
        return res.send(await productManager.addProduct(title,description,code,price,stock,thumbnail));

    } catch (error) {
        
    }
})

routerProducts.put('/:pid', async(req,res)=>{
    try {
        let id = req.params.pid
        let {prop,content} = req.body;
        return res.send(await productManager.updateProduct(id,prop,content))
    } catch (error) {
        
    }
})

routerProducts.delete('/:pid', async (req,res)=>{
    try {
        let id = req.params.pid
        await productManager.deleteProduct(id)
    return res.send('Producto eliminado')
    } catch (error) {
        
    }
})



export default routerProducts;