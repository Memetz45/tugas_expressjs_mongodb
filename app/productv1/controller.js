const { ObjectId } = require('mongodb');
const db = require('../../config/mongodb');
const fs = require('fs');
const path = require('path');

// fungsi read
const index = (req, res) => {
    db.collection('products').find()
        .toArray()
        .then(result => res.send(result))
        .catch(error => res.send(error));
}
// fungsi read by id
const view = (req, res) => {
    const {id} = req.params;
    db.collection('products').findOne({ _id: new ObjectId(id) })
        .then(result => res.send(result))
        .catch(error => res.send(error));
}
// fungsi create
const store = (req, res) => {
    const { name, price, stock, status } = req.body;
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        db.collection('products').insertOne({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` })
            .then(result => res.send(result))
            .catch(error => res.send(error));
    }else{
        db.collection('products').insertOne({ name, price, stock, status })
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }
}
// fungsi update by id
const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, stock, status } = req.body;
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        db.collection('products').updateOne({_id: new ObjectId(id)}, {$set:{ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`} })
            .then(result => res.send(result))
            .catch(error => res.send(error));
    }else{
        db.collection('products').updateOne({_id: new ObjectId(id)}, {$set:{ name, price, stock, status } })
            .then(result => res.send(result))
            .catch(error => res.send(error));
    }
}
// fungsi delete by id
const deleteProduct = (req, res) => {
    const {id} = req.params;
    db.collection('products').deleteMany({_id: new ObjectId(id)})
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

module.exports = {
    index,
    view,
    store,
    updateProduct,
    deleteProduct
}