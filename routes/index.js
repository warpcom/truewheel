var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', firstName: 'Sujith'})
});

router.get('/name', function(req, res) {
  res.render('layout', { });
});

module.exports = router;
