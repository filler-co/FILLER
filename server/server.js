const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const { getProducts, getProductReviews, getProductQuestions } = require('./controller');


app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));

// get all products
app.get('/products', getProducts);

// get specifc product reviews
app.get('/reviews/:product_id', getProductReviews)

// get specific product questions
app.get('/questions/:product_id', getProductQuestions)


app.listen(3000, function() {
  console.log(`listening on port 3000`);
});``