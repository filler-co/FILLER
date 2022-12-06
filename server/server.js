const express = require('express');
const path = require('path');

const app = express();
const {
  getProducts, getProduct, getStyles, getProductReviews, getProductQuestions, getReviewMetaData,
} = require('./controller');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));

// get all products
app.get('/products', getProducts);

// get specific product
app.get('/products/:product_id', getProduct);

// get styles of specific product
app.get('/products/:product_id/styles', getStyles);

// get specifc product reviews
app.get('/reviews/:product_id', getProductReviews);

// // get review meta data
// app.get('/reviews/meta/:product_id', getReviewMetaData);

// get specific product questions
app.get('/questions/:product_id', getProductQuestions);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
