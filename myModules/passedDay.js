
function getDdayData(callback) {
  let now = new Date();
  let toNow = now.getTime();
  const firstDay = new Date("2019-09-07");
  const toFirst = firstDay.getTime();
  let passedTime = toNow - toFirst;
  let passedDay = Math.round(passedTime/(24*60*60*1000))+1;
  
  callback(passedDay);
}

module.exports = function(req, res) {
  console.log(req.body);

  let responseBody={};
  let passedDay;
  getDdayData(
    function(passedDay){
      responseBody = {
        version: "2.0",
        data: {
          day: passedDay
        }
      };
      res.status(200).send(responseBody);
    }
  );


};