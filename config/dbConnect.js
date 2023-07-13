import mongoose from 'mongoose'

mongoose.set('strictQuery', true)
export const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`mongodb connected with server:${data.connection.host}`);
    })
}
