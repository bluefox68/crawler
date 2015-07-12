var express = require('express');
var router = express.Router();

var superagent = require('superagent-charset');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  var urlArr = [];

  superagent.get('http://jbk.39.net/zq/manxingbing/zl')
  	.charset('gb2312')
    .end(function (err, sres) {
		if (err) {
			return next(err);
		}
		var $ = cheerio.load(sres.text);
		var items = [];

		var $item = $(".content .list .item");

		for(var i=0;i<$item.length;i++){
			var json = {};
			json.title = $("h4 a",$item.eq(i)).text();
			json.descUrl = $(".des p a",$item.eq(i)).attr("href");
			items.push(json);
		}

      	res.send(items);
    });
});

module.exports = router;