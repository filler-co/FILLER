const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const upload = multer({dest:'server/uploads/'})
require('dotenv').config();

const app = express();
const {
  getProducts, getProduct, getStyles, getProductReviews, getProductQuestions, getReviewMetaData, voteForHelpfulness,report,askQuestion, addAnswer
} = require('./controller');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(express.static(path.join(__dirname, '/uploads')));

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

// ask a question for a specific product
app.post('/questions', askQuestion)

// add an answer for a specific question
// app.post('/questions/:question_id/answers', upload.single('file'), addAnswer)
app.post('/questions/:question_id/answers', upload.array('files', 5), addAnswer)

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port ' + port);
});
