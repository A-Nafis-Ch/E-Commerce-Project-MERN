const express = require('express');
const app = express();

const morgan = require('morgan')

app.listen(3001, ()=>{
    console.log('server is running at http://localhost:3001');
});

app.use(morgan("dev"))

app.get('/test', (req, res) => {

    res.status(200).send({
        message: 'GET: API testing is working fine',
    });
});

app.post('/test',(req, res)=> {

    res.status(200).send({
        message: 'POST: API testing is working fine',
    });
});
app.put('/test',(req, res)=> {

    res.status(200).send({
        message: 'PUT: API testing is working fine',
    });
})
app.delete('/test',(req, res)=> {

    res.status(200).send({
        message: 'DELETE: API testing is working fine',
    });
})