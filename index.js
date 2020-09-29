const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true})); //application//x-www-form-urlencoded
app.use(bodyParser.json()); //application/json

const { User } = require("./models/user") //DB

const config = require('./config/key');
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected.."))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/register', (req, res) => {
  //ȸ�� ���� �Ҷ� �ʿ��� �������� client���� ��������
  //�װ͵��� ������ ���̽��� �־��ش�.

  const user  = new User(req.body);
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({ success: true})
  }); //���� db ���� �Լ�
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))