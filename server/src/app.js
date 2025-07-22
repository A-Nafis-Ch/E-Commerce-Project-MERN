const express = require('express')
const app = express()
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const userRouter = require('./routers/userRouter')
const seedRouter = require('./routers/seedRouter')
const { errorResponse } = require('./controllers/responseController')
const createError = require('http-errors')

// ✅ Rate limiter compatible with Node v22
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
//   standardHeaders: true,
//   legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, try again later.',
  },
});


app.use(morgan("dev"));
app.use(limiter);
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use('/api/seed', seedRouter);





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



//Using client error handling middleware

app.use((req, res, next) => {


    next(createError(404, 'route not found!'));

});





//Using server error handling middleware
// All the error will be handled here from all routes.

app.use((err, req, res, next) => {

    console.error('🔥 ERROR STACK:\n', err.stack); // ⬅️ Print full error
    console.error('🔥 ERROR NAME:', err.name);
    console.error('🔥 ERROR MESSAGE:', err.message);
    return errorResponse(res, {
      statusCode: err.staus,
      message: err.message,
    })
});


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

