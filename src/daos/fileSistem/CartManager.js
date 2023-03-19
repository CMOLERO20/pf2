import fs from 'fs/promises';

class CartManager{

    constructor(path){
        this.path = path;
    }

    async getCarts(){

        try {
            const carts = await fs.readFile(this.path);
            return JSON.parse(carts);

        } catch (error) {
             console.log("🚀 ~ file: CartManager.js:16 ~ getCarts ~ error", error)
             
             
    }
}
    async generateId(){
        try {
            const dbCarritos = await this.getCarts(); 
            if (dbCarritos.length === 0) return 1
            return dbCarritos[dbCarritos.length - 1].id + 1   

        } catch (error) {
            
        }
    }

async createCart(){
   try {
        const dbCarritos = await this.getCarts();
        const newCart = {};
        const newId = await this.generateId();
        newCart.id = newId;
        newCart.products = []
        dbCarritos.push(newCart)

        await fs.writeFile(this.path, JSON.stringify(dbCarritos));
        return newCart
   } catch (error) {
    
   }
}
async getCartById(id){

    try {
        const dbCarritos = await this.getCarts();
        const resultado = dbCarritos.find(product => product.id == id)
        if(!resultado) return 'Carrito no encontrado'
        return resultado
    } catch (error) {
       console.log("🚀 ~ file: CartManager.js:55 ~ CartManager ~ getCartById ~ error", error)
       
        
    }

}

async addProduct(cid,pid) {
    try { 
        const dbCarritos = await this.getCarts();
        const carrito = dbCarritos.find(cart => cart.id == cid)
        const product = {"id":pid , "quantity" : 1  };
        
        const resultado = carrito.products.find(product => product.id == pid)
       
        if(!resultado) { 
            carrito.products.push(product);
            
        } else {resultado.quantity += 1 ;}
        
        
        await fs.writeFile(this.path, JSON.stringify(dbCarritos));

        return carrito.products
        
    } catch (error) {
        console.log("🚀 ~ file: CartManager.js:70 ~ CartManager ~ addProduct ~ error", error)
        
    }
}


}

export default CartManager;