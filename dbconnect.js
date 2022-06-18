const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017';
const url = "mongodb+srv://mohitk30:mohitk30@cluster0.q1khe.mongodb.net/test";
const client = new MongoClient(url);
const dbName = 'projectplace';

async function dbConnect() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // console.log(db)
     const collection = db.collection('projects');

    // the following code examples can be pasted here...
    // const data = await collection.find({}).toArray();
    //return 'done.';
      return collection;
    // return db;
}


module.exports = dbConnect;


// main()
//     .then(console.log)
//     .catch(console.error)


// one way of handling promise
// dbConnect()
//     .then((res) => {
//         res.find().toArray().then((data) => {
//             console.log(data)
//         })

//     }).catch((err) => { 
//         console.log(err)
//     })

// second way of promise handling

// const main = async() => {
//     let data = await dbConnect();
//     data = await data.find({}).toArray();

//     console.log(data)


// }
// main();