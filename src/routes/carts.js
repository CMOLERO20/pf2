import {Router} from 'express';
import CartManager from "../daos/mongo/cartManager.js"

const routerCarts = Router();
const cartManager = new CartManager("./src/db/carrito.json");

routerCarts.get('/', async(req,res)=>{
    try {
        return res.send( await cartManager.getCarts())
    } catch (error) {
        console.log("🚀 ~ file: carts.js:11 ~ routerCarts.get ~ error:", error)
        
    }
})
routerCarts.post('/', async(req,res)=>{
    try {
        return res.send(await cartManager.createCart())
    } catch (error) {
        
    }
})

routerCarts.get('/:cid', async(req,res)=>{
    let cartId= req.params.cid ; 
    const carrito = await cartManager.getCartById(cartId);
    return res.send(carrito)
})
routerCarts.delete('/:cid', async(req,res)=>{
    let cartId = req.params.cid
    const deleteProduct = await cartManager.deleteAllProduct(cartId);
    return res.send(deleteProduct)
})

routerCarts.post('/:cid/product/:pid', async(req,res)=>{
    let cartId = req.params.cid
    let pId = req.params.pid
    
    const newProduct = await cartManager.addProduct(cartId,pId);
    return res.send(newProduct)
})

routerCarts.delete('/:cid/product/:pid', async(req,res)=>{
    let cartId = req.params.cid
    let pId = req.params.pid
    const deleteProduct = await cartManager.deleteProduct(cartId,pId);
    return res.send(deleteProduct)
})

routerCarts.put('/:cid', async(req,res)=>{
    let pid = req.body
    let cid = req.params.cid
    const addProduct = await cartManager.addProduct(cid,pid);
    return res.send(addProduct)
})
export default routerCarts;