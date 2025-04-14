import mongoose, { Mongoose } from "mongoose";



const MONGODB_URI = process.env.NODE_ENV === "development" ? process.env.MONGODB_URI_LOCAL! : process.env.MONGODB_URI;

console.log(MONGODB_URI);

if(!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI"
  );
} 

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}
declare global {
    var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) return cached.conn;  // যদি আগের কানেকশন থাকে, সেটাই রিটার্ন করবে।

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
export default dbConnect;
