const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');

const passedDay = require('./myModules/passedDay.js');
const realtimeChart = require('./myModules/realtimeChart.js');
const daelimMenu = require('./myModules/daelimMenu.js');

const apiRouter = express.Router();

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', apiRouter);

apiRouter.post('/passedDay', passedDay); // d-day 모듈
apiRouter.post('/realtimeChart', realtimeChart);  // 실시간 검색어 모듈
apiRouter.post('/daelimMenu', daelimMenu);  // 대림대 식단표 모듈


app.listen(3000, function() {
  console.log('서버가 3000번 포트로 열렸어요!!');
});