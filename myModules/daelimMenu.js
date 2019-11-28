let client = require('cheerio-httpcli'); 
let url = 'https://www.daelim.ac.kr/hme/stu_service/prg/stu_cafeteria.do'; 
let param = {}; 
let dayTable = new Array();

function checkDay(key) {
  const cirWeek = [2, 3, 4, 0, 1, null, null]; // 원래는 일월화.. 순이 맞는데 월화수 순인거 같음, 이유 모르겠음
  let dayOfWeek = cirWeek[(new Date().getDay() + key)%7];
  console.log(dayOfWeek);  
  return dayOfWeek;
}


function getMenuData(callback, setDate) {
	console.log(setDate);
	let weekNum;
	switch(setDate){
		case '월요일':
			weekNum=2;
			break;
		case '화요일':
			weekNum=3;
			break;
		case '수요일':
			weekNum=4;
			break;
		case '목요일':
			weekNum=0;
			break;
		case '금요일':
			weekNum=1;
			break;
		case '토요일':
		case '일요일':
			break;
		case '오늘':
			weekNum=checkDay(0);
			break;
		case '내일':
			weekNum=checkDay(1);
			break;
		case '모레':
			weekNum=checkDay(2);
			break;
		case '글피':
			weekNum=checkDay(3);
			break;
	}
	
    client.fetch(url, param, function(err, $, res)
    { 
        dayTable=[];
        if(err){ 
            console.log(err); 
            return;
        } 
        $(".nobor_r").each(function(post) {
            if(post>=2 && post<=46 && post%5===weekNum){ // 나머지가 2월 3화 4수 0목 1금
                dayTable.push($(this).text().trim());
            }
        });
        callback(dayTable);
    });
}

module.exports = function(req, res) {
  console.log(req.body);
  let setDate=req.body.action.detailParams.sys_date.origin;
  console.log(req.body.action.detailParams.sys_date);
  
  let responseBody = {};
  getMenuData(
  function(dayTable) {
    responseBody = {
      version: "2.0",
      data: {
        corner1: dayTable[0],
        corner2: dayTable[1],
        corner3: dayTable[2],
        corner4: dayTable[3],
        corner5: dayTable[4],
        corner6: dayTable[5],
        daelimCook: dayTable[6],
        deliBus: dayTable[7],
        plus: dayTable[8]
      }
    };
    res.status(200).send(responseBody);
  }
,setDate);
};