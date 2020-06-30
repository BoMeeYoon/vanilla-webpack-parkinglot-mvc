const log = console.log;
const tag = '[server-app.js]';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const CommonRouter = require('./1.Common/Routes/index.js');

const app = express();

app.listen(5000, ()=>log(`뿅! 5000 포트야`));

app.use(express.static(path.join(__dirname, '../Client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.set('views', path.join(__dirname, '../Client'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(CommonRouter);