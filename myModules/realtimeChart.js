let client = require('cheerio-httpcli'); 
let url = 'https://datalab.naver.com/keyword/realtimeList.naver?where=main'; 
let param = {}; 
let chart = new Array();


function getChartData(callback) {
  client.fetch(url, param, function(err, $, res)
  { 
	  chart=[];
      if(err){ 
          console.log(err); 
          return;
      } 
      $(".item_title").each(function(post) { 
          if (post>=2 && post<=11) {
            chart.push($(this).text());
          }
      });
      callback(chart); 
  });
}




module.exports = function(req, res) {
  //console.log(req.body);

  let responseBody = {};
  getChartData(
  function(chart) {
    responseBody = {
      version: "2.0",
      data: {
        rank1: chart[0],
        rank2: chart[1],
        rank3: chart[2],
        rank4: chart[3],
        rank5: chart[4],
        rank6: chart[5],
        rank7: chart[6],
        rank8: chart[7],
        rank9: chart[8],
        rank10: chart[9]
      }
    };
    res.status(200).send(responseBody);
  }
);
};