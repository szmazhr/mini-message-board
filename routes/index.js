const express = require('express');
const router = express.Router();
const messages = require('../data');

function sortByDate(array){

  return array.filter(item => !!item.text).sort((a, b) => {
    return a.added <= b.added ? 1 : -1;
  } ) 
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Mini Message Board', messages: sortByDate(messages) });
});

module.exports = router;
