const express = require('express');
const app = express();
const router = express.Router(); // Define the router instance
const cors = require('cors');
const dbConnect = require('./dbConnect');

const productRoute = require('./routes/productRoute');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8282;

app.use(express.json());
app.use(cors());
app.use('/api/products', productRoute);

// Define a route to get all products
// router.get('/api/products', (req, res) => {
//     // Your logic to get products goes here
//     res.json(products);
// });



app.get('/',(req,res)=>{
    res.send({message:'welcome to ecommerce-app'});

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log('server to started on port 8282');
})
