const express = require('express')
const cors = require('cors')
const app = express()
const port = 80
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'svc.sel3.cloudtype.app',
  port     : '31218',
  user     : 'root',
  password : '1882qwsa!!',
  database : 'ezensheet'
});

connection.connect();
//connection.end();

//검증 안된 프론트엔드에서 API요청 오픈. 배포시 주석처리
app.use(cors())


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

 //html페이지로 페이지 이동 라우팅
// app.get('/view', (req, res) => {
//   res.render('view.html')
// })

//express는 브라우저 주소창에 '/'만 있거나 URL만 입력하여 req요청을 받으면 res.send로 'Main Page' 텍스트로 응답한다.
app.get('/', (req, res) => {
  //res.send('Main Page') //텍스트로 보내주는 형태
  res.render('view.html');
  //메인페이지 접속시 DB연결
  connection.query('SELECT * FROM test', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.send('Main Page ID2 : ' + results[0].id);
  });
})

app.get('/:menu', (req, res) => {
  const prm = req.params;
  console.log(prm.menu);
  res.send(`<a href="/">HOME</a><h1>${prm.menu} Sub Page</h1>`);
})

app.get('/1', (req, res) => {
  res.json({'json' : 'data'}) //json 데이터로 브라우저 화면에 보내주는 형태
})

//http://localhost:3000/user/anakin 끝에가 텍스트같은 형태의 URL 주소로 요청받았을때
app.get('/user/:id', (req, res) => {
  const id = req.params;  //파라미터로 변수저장
  console.log('당신의 아이디는 ' + id.id);
  res.json({'아이디' : id.id});
})

//http://localhost:3000/pass/anakin?ps=anakin&name=ckh&age=45 키와 값 같은 배열형태의 URL 주소로 요청받았을때
app.get('/pass/:txt', (req, res) => {
  const ps = req.query; //쿼리로 변수저장
  console.log(ps);
  res.json({
    '아이디' : ps.ps,
    '이름' : ps.name,
    '나이' : ps.age
  });
})

//http://localhost:3000/post/anakin 끝에가 텍스트같은 형태의 URL 주소로 요청받았을때 post 방식 라우팅
// app.post('/post/:id', (req, res) => {
//   const b = req.body;  //body로 변수저장
//   console.log(b);
// })

//파라미터 가변적으로 변수저장
app.get('/api/:txt', (req, res) => {
  const {txt} = req.params;  //파라미터로 변수저장
  console.log(txt);
  if(txt == "anakin"){
    res.json({'아이디': 'anakin'})
  }
  else if(txt == "anakin2"){
    res.json({'아이디': 'anakin2'})
  }
  else {
    res.json({'아이디': '알수없음'})
  }
})

//포트설정
app.listen(port, () => {
  console.log(`backend server listening on port ${port}`)
})