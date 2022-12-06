const axios = require('axios');
const path = require('path');
const token = require('../config');

axios.defaults.headers.common.Authorization = token.TOKEN;

const options = {
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/',
  headers: {
    Authorization: token.TOKEN,
  },

};

// 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products'
module.exports.getProducts = (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/', { headers: { Authorization: token.TOKEN } })
    .then((data) => {
      console.log('data from get products', data.data);
      res.status(200).json(data.data);
    }).catch((err) => {
      console.log('error here', err);
      res.sendStatus(404);
    });
};

module.exports.getProduct = (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.product_id}`, { headers: { Authorization: token.TOKEN } })
    .then((data) => {
      console.log('data from get product', data.data);
      res.status(200).json(data.data);
    }).catch((err) => {
      console.log('error here', err);
      res.sendStatus(404);
    });
};

module.exports.getStyles = (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.product_id}/styles`, { headers: { Authorization: token.TOKEN } })
    .then((data) => {
      console.log('data from get product styles', data.data);
      res.status(200).json(data.data);
    }).catch((err) => {
      console.log('error here', err);
      res.sendStatus(404);
    });
};

module.exports.getProductReviews = (req, res) => {
  axios.get(path.join(options.url, `reviews/${req.params.product_id}`), options.headers)
    .catch((err) => {
      console.error(err);
      res.status(404);
    }).then((data) => {
      res.status(200).send(data);
    });
};

// module.exports.getReviewMetaData = (req, res) => {
//   axios.get(path.join(options.url, `reviews/meta/${req.params.product_id}`), options.headers)
//     .catch((err) => {
//       console.error(err);
//       res.status(404);
//     }).then((data) => {
//       res.status(200).send(data);
//     });
// };

module.exports.getProductQuestions = (req, res) => {
  axios.get(path.join(options.url, `qa/questions/${req.params.product_id}`), options.headers)
    .catch((err) => {
      res.status(404);
      console.error(err);
    })
    .then((data) => {
      console.log('result from get request : ', data);
      res.status(200).send(data);
    });
};

module.exports.voteForHelpfulness = (req, res) => {
  console.log('params is : ',req.params.id, req.params.voteName);
  let flag_qa = (req.params.voteName === 'questions' || req.params.voteName === 'answers')
  let url_qa = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/${req.params.voteName}/${req.params.id}/helpful`;

  let flag_rev = req.params.voteName === 'reviews';
  let url_rev = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/${req.params.voteName}/${req.params.id}/helpful`;

  let url = flag_qa ?  url_qa : url_rev;

  axios.put(url, { headers: { Authorization: token.TOKEN } })
    .then((response) => {
      console.log('response from voting', response);
      res.send('voted');
    }).catch((err) => {
      console.log('error here', err);
      res.sendStatus(404);
    });
}


