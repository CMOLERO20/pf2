import {connect} from 'mongoose';
import * as dotenv from 'dotenv'
dotenv.config()




const configConnection = {
    url : `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e2pbfnu.mongodb.net/${process.env.DB_COLLECTION}`
    ,options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
}   

const mongoDBconnection = async () => {
    try {
        await connect(configConnection.url, configConnection.options);
        console.log('conectado a la base de datos')
    } catch (error) {
        console.log("🚀 ~ file: mongo.config.js:16 ~ mongoDBconnection ~ error:", error)
        
    }
}

export { configConnection , mongoDBconnection} 