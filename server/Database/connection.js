import mongoose from "mongoose";
import colors from "colors";

const mongoDBConnection = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        .then((res) => {
            console.log(`Database Name : ${res.connection.db.databaseName}`.bgGreen.black)
            console.log(`Database Port : ${res.connection.port}`.bgGreen.black)
        }).catch((err) =>  {
            console.log(err.message)
        })

        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB Cloud')
        })
        mongoose.connection.on('error', (err) => {
            console.log(err.message)
        })
        mongoose.connection.on('disconnected', () => {
            console.log('Disconnected from MongoDB Cloud')
        })
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        })
    } catch (error) {
        console.log(error.message)
    }
}

export default mongoDBConnection;