// **************** app.js 파일

//HTTP 서버(express)  생성 및 구동

//1.express 객체 생성
const express = require('express');
const app = express();



//2. "/" 경로 라우팅 처리
app.use("/", (req, res)=>{
  res.sendFile(--__dirname + '.index.html'); //index html 파일 응답
})


//3. 30001 port에서 서버 구동
const HTTPServer = app.listen(30001, ()=>{
  console.log("Server is opn at prot:30001");
});

//Web Socket 서버(ws) 생성 및 구동

//1. ws 모듈 취득
const wsModuel = require('ws');

//2.Web Socket 서버 생성/구동
const webSocketServer = new wsModuel.Server(
  {
    server:HTTPServer , //Web Socket 서버에 연결할 HTTP 서버를 지정한다
    //port:30002 
    //WebSocket연결에 사용할 port를 지정한다(생략시, http서버와 동일한 port 공유 사용)

  }
)

//connection (클라이언트 연결) 이벤트 처리
webSocketServer.on('connection', (ws, request)=>{
  // 1.연결 클라이언트 ip 취득
  const ip = request.headers['x-forward-for'] || request.connection.remoteAddress;

  console.log('새로운 클라이언트[${ip}] 접속');

  // 2.클라이언트에게 메세지 전송
  if(ws.readyState == ws.OPEN){// 연결 여부 체크
    ws.send('클라이언트[${ip}] 접속을 환영합니다 from 서버'); //데이터 전송
  }

  // 3.클라이언트로부터 메세지 수신 이벤트 처리
  ws.on('message', (msg)=>{
    console.log('클라이언트[${ip}]에게 수시한 메세지 :${msg}');
    ws.send('메세지 잘 받았습니다! from 서버')
  })
  
  // 4.에러처리
  ws.on('error', (error)=>{
    console.log('클라이언트[${ip}] 연결 에러 ㅂㄹ생 : ${error}');
  })


  // 5.연결 종료 이벤트 처리
  ws.on('close' , ()=>{
    console.log('클라이언트[${ip}] 웹 소켓 연결 종료')
  })
});

/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
*/
