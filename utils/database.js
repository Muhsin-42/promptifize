import mongoose from 'mongoose';

let isConnected = false;
console.log('333')
export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    console.log('777')
    
    if (isConnected) {
        console.log('mongodb already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || '', {
            dbName: 'promptifize',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('database connected');
    } catch (error) {
        console.log('mongodb connection error ', error);
        await connectToDB();
    }
}; 
