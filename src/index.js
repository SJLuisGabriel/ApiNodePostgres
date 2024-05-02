const express = require('express')
const app = express()
const port = 3000

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use(require('./routes/index'));

app.get('/', (req, res) => res.send('Hello World!'))
console.log('server on port 3000')
app.listen(port, () => console.log(`Example app listening on port ${port}!`))