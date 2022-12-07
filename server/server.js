const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const {
  getProducts, getProduct, getStyles, getProductReviews, getProductQuestions, getReviewMetaData, voteForHelpfulness,report,
} = require('./controller');

app.use(express.json());
app.use(cors());
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


/* ALL Q&A related routes */

// get specific product questions
app.get('/questions/:product_id', getProductQuestions);

// mark a question or answer as helpful
app.put('/:voteName/:id/helpful', voteForHelpfulness);

// report a question or answer
app.put('/:reportName/:id/report', report);


app.listen(3000, () => {
  console.log('listening on port 3000');
});
