import { mongoose } from "mongoose";

const connectingDB = async () => {
    try {
        const connection = await mongoose.connect (
            process.env.MONGO_CONNECTION_STRING
        );
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB Conectado en: ${url}`);
    } catch (error) {
        console.log(`erro: ${error.message}`);
        process.exit(1);
    }
}
export default connectingDB;