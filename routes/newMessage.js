const express = require('express');
const router = express.Router();

const messages = require('../data');
const { stringifier } = require('../data');




/* GET new listing. */
router.get('/', function(req, res, next) {
  res.render('form', {title: 'Add New Message'})
});

/* POST new listing */
router.post('/', function(req, res) {
  const added = new Date().getTime();
  messages.push({text: req.body.messageText, user: req.body.messageUser, added})
  stringifier.write([
    req.body.messageText,
    req.body.messageUser,
    added
  ]);
  res.redirect('/')
})

module.exports = router;
