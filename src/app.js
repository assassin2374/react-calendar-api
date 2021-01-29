const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

//#region expressでサーバーの設定

// expressでポート4000にサーバーを起動
const server = app.listen(4000, ()=>{
  console.log('node.js port'+server.address().port);
});

// expressの設定
app.disable('x-powersd-by')
app.use(cors()).use(bodyParser.json());

//#endregion

//#region mysqlに接続

//mysqlに接続
const connection = mysql.createConnection({
  host: 'localhost',
  post: 3306,
  user: 'user',
  password: 'password',
  database: 'sample_database'
});

connection.connect((err) => {
  if(err) throw err;
  console.log('connected saccess');
});

//#endregion

//#region APIのエンドポイント（URL作成）
app.get('/',(req, res, next)=>{
  const sql = 'select * from schedule';
  connection.query(sql, (err, results)=>{
    if(err) throw err;
    res.json(results);
  });
});

app.get('/:id',(req, res, next)=>{
  const id= parseInt(req.params.id);
  const sql = 'select * from schedule where ?';
  connection.query(sql, {id:id},(err, results)=>{
    if(err) throw err;
    res.json(results[0]);
  });
});

app.post('/',(req, res, next)=>{
  const sql = 'insert into schedule set ?';
  const editData = req.body;
  delete editData.id;
  connection.query(sql, editData,(err, results)=>{
    if(err) throw err;
    res.json(results.insertId);
  });
});

app.put('/:id',(req, res, next)=>{
  const id= parseInt(req.params.id);
  const sql = 'update schedule set ? where ?';
  const putData = req.body;
  delete putData.id;
  connection.query(sql, [putData, {id: id}],(err, results)=>{
    if(err) throw err;
    res.json(results);
  });
});

app.delete('/:id',(req, res, next)=>{
  const id= parseInt(req.params.id);
  const sql = 'delete from schedule where ?';
  connection.query(sql, {id: id}, (err, results)=>{
    if(err) throw err;
    res.json(results);
  });
});