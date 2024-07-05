import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://Conn:Mvzis4kA0Bf0dVHd@cluster0.08pcdmx.mongodb.net/api-zenn?retryWrites=true&w=majority&appName=Cluster0";
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
