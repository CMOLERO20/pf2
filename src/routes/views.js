import { Router } from "express"
import productModel from "../daos/models/products.models.js"
const routerViews = Router();


routerViews.get('/products', async (req,res) => {
    try {
        
        const {limit = 5 , page = 1 , query = "" , sort = "asc"} = req.query
        const options = {
            limit:limit ,
            page : page ,
            sort: {price:sort},
            lean: true
          }
         const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productModel.paginate({}, options)
         
           
          
         res.render("home", {
            producto: docs,
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

export default routerViews;