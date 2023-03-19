import * as dotenv from 'dotenv'
dotenv.config()
import  express  from "express";     
import http from "http";
import { Server } from "socket.io";

import { mongoDBconnection } from "./db/mongo.config.js";
import handlebars from 'express-handlebars';
import __dirname from './utils.js'

import routerMessage from "./routes/chat.js";
import routerProducts from "./routes/productos.js"; 
import routerCarts from "./routes/carts.js"
import routerViews from './routes/views.js';

import messageModel from "./daos/models/message.models.js";


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const DB = await mongoDBconnection()

app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/api/chat', routerMessage);
app.use('/api/views', routerViews)
app.use(express.static(__dirname+'/public'));

io.on('connection', async (socket)=>{
    console.log('a user connected');

     let mensa = await messageModel.find().lean()
     socket.emit('mensajes', mensa)
    

     socket.on('nuevo msj' , async (newMsj)=>{
        try {
            let msj = {...newMsj}
        await messageModel.create(msj);
        let chats = await messageModel.find({}).lean();
        
        io.emit('mensajes', chats)
        } catch (error) {
            console.log("🚀 ~ file: app.js:43 ~ socket.on ~ error:", error)
            
        }
     })


})

server.listen(8080, ()=> {
    console.log('servidor corriendo')
})