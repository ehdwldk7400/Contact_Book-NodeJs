var express = require("express");
var mongoose = require("mongoose");
var app = express();


// DB   Setting
// 글로벌 설정 
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// 환경변수로 등록한 MOBGODB 불러오기
mongoose.connect(process.env.MONGO_DB);

// mongoose의 DB Objext를 가져와 db라는 변수에 저장.
var db = mongoose.connection;

// DB 연결이 성공적일 경우 Log 출력
db.once('open', function () {
    console.log('DB Connected');
});

// DB 연결중 에러가 있을경우 Log 출력
db.on('error', function (err) {
    console.log('DB ERROR : ', err);
});

// OtherSettings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Port Setting
var port = 3000;
app.listen(port, function () {
    console.log('Server On! http://localhost:' + port);
});


