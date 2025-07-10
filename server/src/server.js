const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented: true}));

// Using middleware isLoggedIn:
const isLoggedIn = (req, res, next) =>{
    const login = true;
    if(login){
        req.user = {id : 101};
        next();
    }else{
        // console.log('You are unauthorized please login again');

        return res.status(401).json({message: 'pleaase login first!'});
    }
};

// Using APIs

app.get('/test', (req, res) => {

    res.status(200).send({
        message: 'GET: API testing is working fine',
    });
});

app.get('/api/user',isLoggedIn, (req, res)=>{

    console.log(req.user.id);
    res.status(200).send({
        message: 'user profile is returned',
    });
});

//Using client error handling middleware

app.use((req, res, next) => {

    res.status(404).json({
        message: 'route not found',
        
    });

    next();

});

//Using server error handling middleware


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


app.listen(3001, ()=>{
    console.log('server is running at http://localhost:3001');
});

