import { Router } from "express";
import messageModel from "../daos/models/message.models.js"

const routerMessage = Router();

routerMessage.get('/', async(req,res)=>{
    try {
        res.render('chat')
    } catch (error) {
        console.log("🚀 ~ file: chat.js:10 ~ routerMessage.get ~ error:", error)
        
    }
})

export default routerMessage;