const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors')

app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Using middleware isLoggedIn:
// const isLoggedIn = (req, res, next) =>{
//     const login = true;
//     if(login){
//         req.user = {id : 101};
//         next();
//     }else{
//         // console.log('You are unauthorized please login again');

//         return res.status(401).json({message: 'pleaase login first!'});
//     }
// };

// Using APIs

app.get('/test', (req, res) => {

    res.status(200).send({
        message: 'GET: API testing is working fine',
    });
});

app.get('/api/user', (req, res)=>{

    console.log(req.user.id);
    res.status(200).send({
        message: 'user profile is returned',
    });
});

//Using client error handling middleware

app.use((req, res, next) => {

    createError(404, 'route not found!')
        
    });

    next();

});

//Using server error handling middleware

app.use((err, req, res, next) => {

    console.error(err.stack)
    res.status(500).send('Something  broke')
})


// app.post('/test',(req, res)=> {

//     res.status(200).send({
//         message: 'POST: API testing is working fine',
//     });
// });
// app.put('/test',(req, res)=> {

//     res.status(200).send({
//         message: 'PUT: API testing is working fine',
//     });
// })
// app.delete('/test',(req, res)=> {

//     res.status(200).send({
//         message: 'DELETE: API testing is working fine',
//     });
// })

module.exports = app;

