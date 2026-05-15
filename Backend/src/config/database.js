import mongoose from "mongoose";

async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected To Database");
    } catch (error) {
        console.log("Something went wrong while connecting to database");
    }
}

export default connectToDB;