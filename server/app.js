const express = require('express');
const {static} = express;
const path = require('path');

//server routes/app
const app = express();

app.use(express.json());

app.use('/dist', static(path.join(__dirname, '../dist')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '../public/index.html')));


app.use('/api/students', require('./routes/students'))
app.use('/api/campuses', require('./routes/campuses'))



app.use((err, req, res, next) => {
  res.status(500).send(console.log({error:err}))
})

module.exports = app;







