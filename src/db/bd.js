import mongoose from "mongoose";

// Connect to MongoDB database 


const connectDB = async () => {
 try{
   const db= await mongoose.connect(process.env.BD_DATOS
   ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
   });
   const url=`${db.connection.host}:${db.connection.port}`;
   console.log(`MongoDB Connected: ${url}`);
 } catch(error){
 console.log(`Error :" ${error.message}}`);
 process.exit(1);
 }
}

export default connectDB;