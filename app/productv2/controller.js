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
const store = async (req, res, next) => {
    try{
        const { name, price, stock, status } = req.body;
        const image = req.file;
        if(image){
            let tmp_path = image.path;
            let originalExt = image.originalname.split('.')[image.originalname.split('.').length - 1];
            let filename = image.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `uploads/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on('end', async () => {
                try{
                    let product = new Product({name, price, stock, status, image_url: filename})
                    await product.save()
                    return res.json(product);
                }catch{

                }
            })
        }
    }catch{

    }
    // const { name, price, stock, status } = req.body;
    // const image = req.file;
    // if (image) {
    //     const target = path.join(__dirname, '../../uploads', image.originalname);
    //     fs.renameSync(image.path, target);
    //     db.create({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` })
    //         .then(result => res.send(result))
    //         .catch(error => res.send(error));
    // }
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