const mongoose = require ('mongoose');
mongoose.connect('mongodb://express_mongodb:123456@0.0.0.0:27017/admin2?authSource=admin');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.off('open',() => console.log('Server database terhubung'));