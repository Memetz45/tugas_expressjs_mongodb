const mongoose = require ('mongoose');
const fs = require('fs');
const path = require('path');
const db = require('./model');

// fungsi read all
const index = (req, res) => {
    db.find()
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
        db.create({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` })
            .then(result => res.send(result))
            .catch(error => res.send(error));
    }
}
const brand = (req, res) => {
    const {name, price, stock, status} = req.body;
    db.create({ name, price, stock, status })
        .then(result => res.send(result))
        .catch(error => res.send(error));
}
// fungsi update by id
const update = (req, res) => {
    const { name, price, stock, status } = req.body;
    const image = req.file;
    const { id } = req.params;
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        db.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)},{ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` })
            .then(result => res.send(result))
            .catch(error => res.send(error));
    }else{
        db.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)},{ name, price, stock, status })
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }
}
// fungsi delete by id
const deleteProduct = (req, res) => {
    const {id} = req.params;
    db.deleteMany({_id: new mongoose.Types.ObjectId(id)})
        .then(result => res.send(result))
        .catch(error => res.send(error));
}


module.exports = {
    index,
    store,
    brand,
    update,
    deleteProduct
}