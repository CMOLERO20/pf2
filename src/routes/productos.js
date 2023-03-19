import { Router } from "express";   
import ProductManager from "../daos/mongo/productManager.js";
import productModel from "../daos/models/products.models.js"
const routerProducts = Router();

const productManager = new ProductManager()

routerProducts.get('/', async (req,res) => {
    try {
        console.log('entro al get')
        const {limit = 10 , page = 1 , query = "" , sort = "asc"} = req.query
        const options = {
            limit:limit ,
            page : page ,
            sort: {price:sort},
            lean: true
          }
         const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productModel.paginate({}, options)
         
           
          
         res.render("home", {
            productos: docs,
            page,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
          });
        
    } catch (error) { 
        console.log("🚀 ~ file: productManager.js:10 ~ ProductManager ~ getAllProducts= ~ error:", error)
        
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
        let productBody = req.body;
        productBody.status = true;
        const newP = await productManager.addProduct(productBody);
        return res.send({status:"succes", payload: newP});

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

routerProducts.get('/pag', async (req,res)=>{
    try {
        console.log('entro al get')
       
       // const productos = await productModel.paginate({}, {page :1}, function (err,result) {
        //    console.log("🚀 ~ file: productos.js:67 ~ productos ~ err:", err) })
        const productos =  await productManager.getAllProducts();

        return res.send(productos)
    } catch (error) {
        console.log("🚀 ~ file: productos.js:65 ~ routerProducts.get ~ error:", error)
        
    }
})


export default routerProducts;