const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());
app.use('./api', productRoutes);


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`)
})