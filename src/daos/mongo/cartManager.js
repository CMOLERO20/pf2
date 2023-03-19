import cartModel from "../models/cart.models.js";
import productModel from "../models/products.models.js";  



class CartManager {

    
     getCarts = async () => {
        try {
            const cartArr = await cartModel.find({});
            console.log("🚀 ~ file: cartManager.js:12 ~ CartManager ~ getCarts= ~ cartArr :", cartArr )
            return cartArr
        } catch (error) { 
            console.log("🚀 ~ file: cartManager.js:15 ~ CartManager ~ getCarts= ~ error:", error)
            
            
        }
     };

     createCart = async () => {
        try {
            let newCart = {productos:[]}
            return await cartModel.create(newCart);

        } catch (error) {
            console.log("🚀 ~ file: cartManager.js:18 ~ CartManager ~ createCart= ~ error:", error)
            
        }
     }
     getCartById = async (cip) => {
        try {
            const cartById = await cartModel.findById({_id:cip})
            if(!cartById) return 'carrito no encontrado'
            return cartById
        } catch (error) {
            console.log("🚀 ~ file: cartManager.js:28 ~ CartManager ~ getCartById= ~ error:", error)
            
        }
     }
    async addProduct(cid,pid){
        try {
            let newProduct = {product: pid, quantity: 1,}
            let cart = await cartModel.findById({_id:cid});
            if(cart == null) return 'carrito no encontrado'

            
                cart.products.push({product: pid})
             const resultado = await cartModel.updateOne({_id:cid},cart)
             return "Producto agregado al carrito"
           
           
        } catch (error) {
            console.log("🚀 ~ file: cartManager.js:41 ~ CartManager ~ addProduct ~ error:", error)
            
        }
     }
     async deleteProduct(cid,pid){
        try {       
            let cart = await cartModel.findById({_id:cid});
            const result = cart.products.find(prod => prod.id == pid)
            if(!result){
                return 'el producto no existe'
            } else if(result.quantity > 1) {result.quantity -= 1} 
            else {
                let indexId = cart.products.findIndex(product => product.id == pid)
                cart.products.splice(indexId,1)
            }
             const resultado = await cartModel.updateOne({_id:cid},cart)
             return resultado
           
           
        } catch (error) {
            console.log("🚀 ~ file: cartManager.js:41 ~ CartManager ~ addProduct ~ error:", error)
            
        }
     }

     async deleteAllProduct(cid){
        try {       
            let cart = await cartModel.findById({_id:cid});
            cart.products = []
             const resultado = await cartModel.updateOne({_id:cid},cart)
             return resultado
           
           
        } catch (error) {
            console.log("🚀 ~ file: cartManager.js:41 ~ CartManager ~ addProduct ~ error:", error)
            
        }
     }


}

export default CartManager;