require ('./config/mongoose');
const express = require ('express');
const path = require ('path');
const app = express();
const productRouterV1 = require('./app/productv1/routes');
const productRouterV2 = require('./app/productv2/routes');
const logger = require ('morgan');

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/v1', productRouterV1)
app.use('/v2', productRouterV2)
app.use((req, res) => {
    res.status(404);
    res.send({
        status: 'failed',
        message: 'Resource ' + req.originalUrl + ' Not Found'
    })
})
app.listen(3002, ()=>console.log('Server run : http://localhost:3002'));