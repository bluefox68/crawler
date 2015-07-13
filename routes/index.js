var express = require('express');
var router = express.Router();

var superagent = require('superagent-charset');
var cheerio = require('cheerio');

var getResult = function(url,num,items,res){
	superagent.get(url)
  	.charset('gb2312')
    .end(function (err, sres) {
		if (err) {
			return next(err);
		}

		var $ = cheerio.load(sres.text);
		var $item = $(".content .list .item");

		for(var i=0;i<$item.length;i++){
			var json = {};
			json.title = $("h4 a",$item.eq(i)).text();
			json.descUrl = $(".des p a",$item.eq(i)).attr("href");
			items.push(json);
		}

      	if(num == 99){
      		res.send(items);
      	}
    });
}
/* GET home page. */
router.get('/', function(req, res, next) {
  var items = [];

  var urlArr = [],
  	  num = 100,
  	  prefixUrl = "http://jbk.39.net/zq/manxingbing/zl?hsid=0&ybid=0&p=";

  for(var j = 2;j < num;j++){ 
  	var url = prefixUrl + j;
  	getResult(url,j,items,res);
  }
  
});

module.exports = router;