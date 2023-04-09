const {MongoClient} = require('mongodb');
const url =  process.env.MONGO_URI ||"mongodb://express_mongodb:123456@0.0.0.0:27017/admin2?authSource=admin";
const client = new MongoClient(url);

(async () => {
    try{
        await client.connect();
        console.log('Koneksi ke mongodb berhasil');
    }catch(e){
        console.log(e);
    }
})();

const db = client.db('admin1');
module.exports = db;