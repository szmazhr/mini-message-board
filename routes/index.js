const express = require('express');
const router = express.Router();
const messages = require('../data');
const { DateTime } = require("luxon");
const { lookup } = require('geoip-lite');

function formatDate(array, ip){
  const ipLookup = lookup(ip);
  return array.map(item => ({...item, added: DateTime.fromJSDate(new Date(parseInt(item.added))).setLocale('in').locale('en-US').toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}))
}

function sortByDate(array){

  return array.filter(item => !!item.text).sort((a, b) => {
    return a.added <= b.added ? 1 : -1;
  } )
}

/* GET home page. */
router.get('/', function(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  res.render('index', { title: 'Mini Message Board', messages: formatDate(sortByDate(messages), ip) });
});

module.exports = router;
