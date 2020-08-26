var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Schema
// mongoose.Schema에서 DB에 어떤 형식으로 지정할 지를 지정해주는 구역
var contactSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { tpye: String },
    phone: { type: String }
});

// contact라는 데이터 콜렉션을 Contact라는 변수에 연결
var Contact = mongoose.model('contact', contactSchema);

// "/"에 GET 요청이 올 경우 /contacts로 리다이렉트하는 구문
app.get('/', function (req, res) {
    res.redirect('/contacts');
});

// "/contacts"로 요청이 올 경우
app.get('/contacts', function (req, res) {

    // find([검색 조건], Callback_함수)
    // 검색 조건에 {}를 줄 경우 DB에 해당 모델의 모든 Data를 return 한다.
    Contact.find({}, function (err, contacts) {
        // 에러가 있다면 에러를 JSON 형식으로 웹페이지에 표시
        if (err) return res.json(err);
        res.render('contacts/index', { contacts: contacts });
    });
});

// "/contacts/new" GET 요청이 올 경우 View/contactsd/new.ejs를 Reander 한다.
app.get('/contacts/new', function (req, res) {
    res.render('contacts/new');
});

app.post('/contacts', function (req, res) {
    Contact.create(req.body, function (err, Contact) {
        if (err) return res.json(err);
        res.redirect('/contacts');
    });
});

// Port Setting
var port = 3000;
app.listen(port, function () {
    console.log('Server On! http://localhost:' + port);
});


